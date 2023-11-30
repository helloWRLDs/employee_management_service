package com.supWRLD.ems.services;

import com.supWRLD.ems.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeDAO {
    Datasource datasource;

    public EmployeeDAO() {
        this.datasource = Datasource.getInstance();
        try {
            Connection connection = datasource.getConnection();
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE TABLE IF NOT EXISTS EMS.employees (id INT AUTO_INCREMENT PRIMARY KEY, firstName TEXT NOT NULL , lastName TEXT NOT NULL , email TEXT NOT NULL);");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Employee> getAllEmployees() {
        List<Employee> employeeList = new ArrayList<>();
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement("SELECT * FROM EMS.employees");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                employeeList.add(new Employee(
                        rs.getInt("id"),
                        rs.getString("firstName"),
                        rs.getString("lastName"),
                        rs.getString("email")
                    )
                );
            }
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return employeeList;
    }

    public Employee createEmployee(Employee employee) {
        String query = "INSERT INTO EMS.employees(firstName, lastName, email) VALUE (?, ?, ?)";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, employee.getFirstName());
            statement.setString(2, employee.getLastName());
            statement.setString(3, employee.getEmail());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return getEmployeeId(employee);
    }

    public Employee getEmployeeId(Employee employee) {
        String query = "SELECT id FROM EMS.employees WHERE firstName=? AND lastName=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, employee.getFirstName());
            statement.setString(2, employee.getLastName());
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                employee.setId(rs.getInt("id"));
            }
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return employee;
    }

    public Employee getEmployeeById(long id) {
        String query = "SELECT * FROM EMS.employees WHERE id=?";
        Employee employee = null;
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setLong(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                employee = new Employee(
                        rs.getInt("id"),
                        rs.getString("firstName"),
                        rs.getString("lastName"),
                        rs.getString("email")
                );
            }
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return employee;
    }

    public Employee updateEmployeeById(long id, Employee updatedEmployee) {
        String query = "UPDATE EMS.employees SET firstName=?, lastName=?, email=? WHERE id=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, updatedEmployee.getFirstName());
            statement.setString(2, updatedEmployee.getLastName());
            statement.setString(3, updatedEmployee.getEmail());
            statement.setLong(4, id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return getEmployeeById(id);
    }

    public void deleteEmployeeById(long id) {
        String query = "DELETE FROM EMS.employees WHERE id=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setLong(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
