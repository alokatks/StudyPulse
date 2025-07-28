package com.studypuls.backend.dto;

public class SubmitResponse {
    private int score;
    private int total;

    public SubmitResponse(int score, int total) {
        this.score = score;
        this.total = total;
    }

    public int getScore() {
        return score;
    }

    public int getTotal() {
        return total;
    }
}
