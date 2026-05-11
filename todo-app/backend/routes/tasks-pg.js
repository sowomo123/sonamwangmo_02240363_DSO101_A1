const express = require('express');
const Task = require('../models/TaskPG');

const router = express.Router();

const handleError = (res, error) => {
    if (error.message.includes('required') || error.message.includes('at least') || error.message.includes('at most')) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    return res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};

// Validation helper
const validateTaskData = (data) => {
    const errors = [];
    
    if (!data.title || data.title.trim().length === 0) {
        errors.push('Title is required');
    } else {
        const title = data.title.trim();
        if (title.length < 2) {
            errors.push('Title must be at least 2 characters');
        }
        if (title.length > 100) {
            errors.push('Title must be at most 100 characters');
        }
    }
    
    if (data.description && data.description.length > 500) {
        errors.push('Description must be at most 500 characters');
    }
    
    if (data.status && !['pending', 'completed'].includes(data.status)) {
        errors.push('Status must be either pending or completed');
    }
    
    return errors;
};

router.get('/', async (_req, res) => {
    try {
        const tasks = await Task.findAll();

        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/', async (req, res) => {
    try {
        const validationErrors = validateTaskData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: validationErrors.join(', ')
            });
        }

        const task = await Task.create({
            title: req.body.title.trim(),
            description: req.body.description ? req.body.description.trim() : '',
            status: req.body.status || 'pending'
        });

        res.status(201).json({
            success: true,
            data: task,
            message: 'Task created successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const validationErrors = validateTaskData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: validationErrors.join(', ')
            });
        }

        const task = await Task.update(id, {
            title: req.body.title.trim(),
            description: req.body.description ? req.body.description.trim() : '',
            status: req.body.status || 'pending'
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            data: task,
            message: 'Task updated successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.patch('/:id/toggle', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        const updatedTask = await Task.update(id, {
            title: task.title,
            description: task.description,
            status: newStatus
        });

        res.json({
            success: true,
            data: updatedTask,
            message: 'Task status updated successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.delete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        res.json({
            success: true,
            data: task,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
