const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [2, 'Title must be at least 2 characters'],
            maxlength: [100, 'Title must be at most 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description must be at most 500 characters'],
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model('Task', taskSchema);