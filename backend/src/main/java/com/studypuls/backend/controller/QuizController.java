package com.studypuls.backend.controller;

import com.studypuls.backend.dto.QuizSubmission;
import com.studypuls.backend.dto.SubmitResponse;
import com.studypuls.backend.dto.UserAnswer;
import com.studypuls.backend.entity.Question;
import com.studypuls.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/submit")
    public SubmitResponse submitQuiz(@RequestBody QuizSubmission submission) {
        List<UserAnswer> answers = submission.getAnswers();

        int score = 0;

        for (UserAnswer userAnswer : answers) {
            Question question = questionRepository.findById(userAnswer.getQuestionId()).orElse(null);
            if (question != null) {
                if (question.getCorrectAnswer().equalsIgnoreCase(userAnswer.getAnswer())) {
                    score++;
                }
            }
        }

        return new SubmitResponse(score, answers.size());
    }
}

