package com.supWRLD.ems.controllers;

import com.supWRLD.ems.entity.Employee;
import com.supWRLD.ems.services.EmployeeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeDAO employeeDAO;

    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") long id) {
        return ResponseEntity.ok(employeeDAO.getEmployeeById(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<Employee>> getEmployees() {
        return ResponseEntity.ok(employeeDAO.getAllEmployees());
    }

    @PostMapping("/")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeDAO.createEmployee(employee);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id,
                                                   @RequestBody Employee updatedEmployee) {
        Employee employee = employeeDAO.updateEmployeeById(id, updatedEmployee);
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id) {
        employeeDAO.deleteEmployeeById(id);
        return ResponseEntity.ok(String.format("Employee with id=%s has been deleted", id));
    }
}
