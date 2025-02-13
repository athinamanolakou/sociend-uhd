package com.example.cis4900.spring.template.housing.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class HousingData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String city;
    private String housingType;
    private int starts;
    private int completions;
    private int year;

    public HousingData() {
    }

    public HousingData(Integer id, String city, String housingType, int starts, int completions, int year) {
        this.id = id;
        this.city = city;
        this.housingType = housingType;
        this.starts = starts;
        this.completions = completions;
        this.year = year;
    }

    // --- Getters/Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getHousingType() {
        return housingType;
    }

    public void setHousingType(String housingType) {
        this.housingType = housingType;
    }

    public int getStarts() {
        return starts;
    }

    public void setStarts(int starts) {
        this.starts = starts;
    }

    public int getCompletions() {
        return completions;
    }

    public void setCompletions(int completions) {
        this.completions = completions;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
