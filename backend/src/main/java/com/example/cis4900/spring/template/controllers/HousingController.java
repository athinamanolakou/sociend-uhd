package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.housing.HousingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/housing")
public class HousingController {
    private final HousingService housingService;

    @Autowired
    public HousingController(HousingService housingService) {
        this.housingService = housingService;
    }

    /**
     * Retrieves total starts and completions data from the
     * `housing_starts_completions` table for a specific city.
     */
    @GetMapping("/starts-completions/total")
    public List<Map<String, Object>> getHousingTotals() {
        return housingService.getHousingTotals();
    }

    /**
     * Retrieves all data from the `housing_starts_completions` table for a specific
     * city.
     */
    @GetMapping("/starts-completions/ratio")
    public List<Map<String, Object>> getHousingRatios() {
        return housingService.getHousingRatios();
    }

    /**
     * Retrieves all data from the 'labour_market' table for occupation data.
     */
    @GetMapping("/labour-market/occupation")
    public List<Map<String, Object>> getLabourMarketOccupations() {
        return housingService.getLabourMarketOccupations();
    }

    /**
     * Retrieves all data from the 'labour_market' table for family type data.
     */
    @GetMapping("/labour-market/family-type")
    public List<Map<String, Object>> getLabourMarketFamilyTypes() {
        return housingService.getLabourMarketFamilyTypes();
    }


    /**
    * Retrieves immigration data from the `labour_market` table.
    */
    @GetMapping("/labour-market/immigration-data")
    public List<Map<String, Object>> getImmigrationData() {
        return housingService.getImmigrationData();
    }

    
}
