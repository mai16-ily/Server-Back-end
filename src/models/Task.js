import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [100, 'Máximo 100 caracteres']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model('Task', TaskSchema);
