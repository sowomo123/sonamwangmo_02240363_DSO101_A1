const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const router = express.Router();

const handleError = (res, error) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: Object.values(error.errors)
                .map((item) => item.message)
                .join(', ')
        });
    }

    return res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};

router.get('/', async (_req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findById(req.params.id);

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
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description || '',
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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description || '',
                status: req.body.status || 'pending'
            },
            {
                new: true,
                runValidators: true
            }
        );

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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        task.status = task.status === 'pending' ? 'completed' : 'pending';
        await task.save();

        res.json({
            success: true,
            data: task,
            message: 'Task status updated successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid task id'
            });
        }

        const task = await Task.findByIdAndDelete(req.params.id);

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