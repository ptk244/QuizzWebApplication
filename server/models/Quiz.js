

const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswers: [{ type: Number, required: true }],
            timeLimit: { type: Number, required: true }, 
            image: { type: String } 
        }
    ]
});

module.exports = mongoose.model('Quiz', QuizSchema);
