package com.example.ajax.service;

import com.example.ajax.model.Student;
import com.example.ajax.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService{
    @Autowired
    private IStudentRepository iStudentRepository;

    @Override
    public Student save(Student student) {
        return iStudentRepository.save(student);
    }

    @Override
    public Optional<Student> findById(Long id) {
        return iStudentRepository.findById(id);
    }

    @Override
    public List<Student> findAll() {
        return iStudentRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        iStudentRepository.deleteById(id);
    }
}
