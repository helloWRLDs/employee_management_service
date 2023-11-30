package com.supWRLD.ems.services;

import com.supWRLD.ems.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentDAO {
    Datasource datasource;

    public DepartmentDAO() {
        this.datasource = Datasource.getInstance();
        try {
            Connection connection = datasource.getConnection();
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE TABLE IF NOT EXISTS EMS.departments (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, description TEXT, manager_id int, FOREIGN KEY (manager_id) REFERENCES EMS.employees (id));");
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Department> getAllDepartments() {
        List<Department> departments = new ArrayList<>();
        try {
            Connection connection = datasource.getConnection();
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM EMS.departments");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Department department = new Department(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getLong("manager_id")
                );
                departments.add(department);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return departments;
    }

    public Department createDepartment(Department department) {
        String query = "INSERT INTO EMS.departments(name, description, manager_id) VALUE (?,?,?)";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, department.getDepartmentName());
            statement.setString(2, department.getDepartmentDescription());
            statement.setLong(3, department.getManagerId());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return getDepartmentId(department);
    }

    private Department getDepartmentId(Department department) {
        String query = "SELECT * FROM EMS.departments WHERE name=? AND description=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, department.getDepartmentName());
            statement.setString(2, department.getDepartmentDescription());
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                department.setId(rs.getLong("id"));
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return department;
    }

    public Department getDepartmentById(long id) {
        String query = "SELECT * FROM EMS.departments WHERE id=?";
        Department department = null;
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setLong(1, id);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                department = new Department(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getLong("manager_id")
                );
            }
            rs.close();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return department;
    }

    public Department updateDepartmentById(long id, Department department) {
        String query = "UPDATE EMS.departments SET name=?, description=?, manager_id=? WHERE id=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(query);
            statement.setString(1, department.getDepartmentName());
            statement.setString(2, department.getDepartmentDescription());
            statement.setLong(3, department.getManagerId());
            statement.setLong(4, id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return getDepartmentById(id);
    }

    public void deleteDepartmentById(long id) {
        String qury = "DELETE FROM EMS.departments WHERE id=?";
        try {
            PreparedStatement statement = datasource.getConnection().prepareStatement(qury);
            statement.setLong(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
