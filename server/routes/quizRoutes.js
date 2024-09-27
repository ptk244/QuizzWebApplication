const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all quizzes
router.get('/quizzes', quizController.getAllQuizzes);

// Submit answer for a question
router.post('/quizzes/submit', quizController.submitAnswer);

// Finish the quiz
router.post('/quizzes/finish', quizController.finishQuiz);

// Start a quiz
router.get('/quizzes/:id/start', quizController.startQuiz);

// Create a new quiz
router.post('/quizzes', quizController.createQuiz);

router.delete('/quizzes/:id', quizController.deleteQuiz);

module.exports = router;
