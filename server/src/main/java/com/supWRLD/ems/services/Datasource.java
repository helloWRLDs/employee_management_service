package com.supWRLD.ems.services;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class Datasource {
    private static Datasource instance;
    private static final String url = Dotenv.load().get("DB_URL");
    private static final String username = Dotenv.load().get("DB_USER");
    private static final String password = Dotenv.load().get("DB_PASSWORD");
    private static Connection connection;

    private Datasource() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(url, username, password);
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS EMS;");
            statement.close();
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public static Datasource getInstance() {
        if (instance == null) {
            instance = new Datasource();
        }
        return instance;
    }

    public Connection getConnection() {
        return connection;
    }

}
