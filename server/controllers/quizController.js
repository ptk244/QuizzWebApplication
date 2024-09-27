const Quiz = require('../models/Quiz');

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Start a quiz
exports.startQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json({
            message: "Quiz started",
            quizId: quiz._id,
            questions: quiz.questions.map(({ question, options, timeLimit, _id }) => ({
                question,
                options,
                timeLimit,
                questionId: _id,
            })),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit answer for a question
exports.submitAnswer = async (req, res) => {
    try {
        const { quizId, questionId, selectedOption } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const question = quiz.questions.id(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const correctAnswers = question.correctAnswers;
        const isCorrect = correctAnswers.includes(selectedOption);

        res.json({
            message: isCorrect ? "Correct answer" : "Incorrect answer",
            correct: isCorrect,
            correctAnswers,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Finish the quiz
exports.finishQuiz = async (req, res) => {
    try {
        const { quizId, score } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json({ message: 'Quiz finished', score });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

