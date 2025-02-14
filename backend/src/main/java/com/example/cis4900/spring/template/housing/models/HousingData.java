package com.example.cis4900.spring.template.housing.models;

import jakarta.persistence.*;

@Entity
@Table(name = "housing_data")
public class HousingData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String city;
    private String housingType;
    private Integer starts;
    private Integer completions;
    private Integer year;

    public HousingData() {
    }

    public HousingData(Integer id, String city, String housingType, Integer starts, Integer completions, Integer year) {
        this.id = id;
        this.city = city;
        this.housingType = housingType;
        this.starts = starts;
        this.completions = completions;
        this.year = year;
    }

    // Getters and setters
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

    public Integer getStarts() {
        return starts;
    }

    public void setStarts(Integer starts) {
        this.starts = starts;
    }

    public Integer getCompletions() {
        return completions;
    }

    public void setCompletions(Integer completions) {
        this.completions = completions;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
