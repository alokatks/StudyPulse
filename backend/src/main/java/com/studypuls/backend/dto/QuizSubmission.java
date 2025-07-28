package com.studypuls.backend.dto;

import java.util.List;

public class QuizSubmission {
    private List<UserAnswer> answers;

    public QuizSubmission() {}

    public List<UserAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<UserAnswer> answers) {
        this.answers = answers;
    }
}
