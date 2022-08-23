package com.example.ajax.controller;

import com.example.ajax.model.Student;
import com.example.ajax.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/students")
public class StudentController {
    @Autowired
    private IStudentService iStudentService;

    @GetMapping
    private ResponseEntity<List<Student>> findAll() {
        return new ResponseEntity<>(iStudentService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<Student> create(@RequestBody Student student) {
        return new ResponseEntity<>(iStudentService.save(student), HttpStatus.CREATED);
    }

    @PutMapping
    private ResponseEntity<Student> update(@RequestBody Student student) {
        Optional<Student> studentOptional = iStudentService.findById(student.getId());
        if (studentOptional.isPresent()) {
            return new ResponseEntity<>(iStudentService.save(student), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        iStudentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Student> detail(@PathVariable("id") Long id) {
        Optional<Student> studentOptional = iStudentService.findById(id);
        if (studentOptional.isPresent()) {
            return new ResponseEntity<>(studentOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
