package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.housing.HousingService;
import com.example.cis4900.spring.template.housing.models.HousingStartsCompletions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/housing")
public class HousingController {
    private final HousingService housingService;

    @Autowired
    public HousingController(HousingService housingService) {
        this.housingService = housingService;
    }

    /**
     * Retrieves all data from the `housing_starts_completions` table.
     */
    @GetMapping("/starts-completions/all")
    public List<HousingStartsCompletions> getAllHousingStartsCompletions() {
        return housingService.getAllHousingStartsCompletions();
    }

    /**
     * Future endpoints for additional tables (Example placeholders)
     */
    @GetMapping("/apartment-starts/all")
    public String getAllApartmentStarts() {
        return "This will return apartment start data in the future.";
    }

    @GetMapping("/housing-under-construction/all")
    public String getAllHousingUnderConstruction() {
        return "This will return housing under construction data in the future.";
    }
}
