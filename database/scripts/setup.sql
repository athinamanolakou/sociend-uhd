-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS template_db;
USE template_db;

-- Table for Housing Starts and Completions
CREATE TABLE IF NOT EXISTS housing_starts_completions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year YEAR NOT NULL,
    month TINYINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    city VARCHAR(100) NOT NULL,
    
    -- Housing Starts
    singles_starts INT DEFAULT 0, 
    semis_starts INT DEFAULT 0,
    row_starts INT DEFAULT 0,
    apt_other_starts INT DEFAULT 0,
    total_starts INT DEFAULT 0,

    -- Housing Completions
    singles_complete INT DEFAULT 0, 
    semis_complete INT DEFAULT 0,
    row_complete INT DEFAULT 0,
    apt_other_complete INT DEFAULT 0,
    total_complete INT DEFAULT 0,

    last_updated DATE DEFAULT (CURRENT_DATE)
);

-- Table for Housing Under Construction
CREATE TABLE IF NOT EXISTS housing_under_construction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year YEAR NOT NULL,
    month TINYINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    city VARCHAR(100) NOT NULL,

    -- Housing Types Under Construction (Starts)
    singles_starts INT DEFAULT 0,
    semis_starts INT DEFAULT 0,
    row_starts INT DEFAULT 0,
    apt_other_starts INT DEFAULT 0,
    total_starts INT DEFAULT 0,

    last_updated DATE DEFAULT (CURRENT_DATE)
);
