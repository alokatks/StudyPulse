package com.studypuls.backend.controller;

import com.studypuls.backend.entity.Question;
import com.studypuls.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5174") // Allow frontend access
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;



   //  ✅ NEW METHOD — supports optional subject filter
   // ✅ RECOMMENDED: Get all or filtered by subject via query parameter
   @GetMapping
   public List<Question> getQuestions(@RequestParam(required = false) String subject) {
       if (subject != null && !subject.isEmpty()) {
           return questionRepository.findBySubjectIgnoreCase(subject);
       } else {
           return questionRepository.findAll();
       }
   }

    //@GetMapping
  //  public List<Question> getQuestions() {
     //   return questionRepository.findAll();
   // }



    // ✅ Add a new question
    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }
    @PostMapping("/batch")
    public List<Question> addMultipleQuestions(@RequestBody List<Question> questions) {
        return questionRepository.saveAll(questions);
    }


    // ✅ Update a question
    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question updated) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        question.setQuestionText(updated.getQuestionText());
        question.setOptionA(updated.getOptionA());
        question.setOptionB(updated.getOptionB());
        question.setOptionC(updated.getOptionC());
        question.setOptionD(updated.getOptionD());
        question.setCorrectAnswer(updated.getCorrectAnswer());

        return questionRepository.save(question);
    }

    // ✅ Delete a question
    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    // ✅ Optional: Get questions by subject (only if you add subject field in entity)
    // @GetMapping("/subject/{subject}")
    // public List<Question> getQuestionsBySubject(@PathVariable String subject) {
    //     return questionRepository.findBySubjectIgnoreCase(subject);
    // }
}


