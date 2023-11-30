package com.supWRLD.ems.controllers;


import com.supWRLD.ems.entity.Department;
import com.supWRLD.ems.services.DepartmentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    @Autowired
    DepartmentDAO departmentDAO;

    @GetMapping("/")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentDAO.getAllDepartments());
    }

    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartment(@PathVariable("id") long id) {
        return ResponseEntity.ok(departmentDAO.getDepartmentById(id));
    }

    @PostMapping("/")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return new ResponseEntity<>(departmentDAO.createDepartment(department), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") long id,
                                                       @RequestBody Department department) {
        Department updatedDepartment = departmentDAO.updateDepartmentById(id, department);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") long id) {
        departmentDAO.deleteDepartmentById(id);
        return ResponseEntity.ok(String.format("Department with id=%s has been deleted", id));
    }
}
