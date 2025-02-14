package com.example.cis4900.spring.template.controllers;

import com.example.cis4900.spring.template.housing.HousingService;
import com.example.cis4900.spring.template.housing.models.HousingData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/housing")
public class HousingController {
    private HousingService housingService;

    @Autowired
    HousingController(HousingService housingService) {
        this.housingService = housingService;
    }

    @GetMapping("/all")
    private @ResponseBody List<HousingData> getAllHousingData() {
        return housingService.getAllHousingData();
    }

    @GetMapping("/city/{city}")
    private @ResponseBody List<HousingData> getHousingDataByCity(@PathVariable String city) {
        return housingService.getHousingDataByCity(city);
    }

    @GetMapping("/type/{housingType}")
    private @ResponseBody List<HousingData> getHousingDataByType(@PathVariable String housingType) {
        System.out.println("Received API request: /api/housing/type/" + housingType);
        List<HousingData> result = housingService.getHousingDataByType(housingType);
        System.out.println("Returning data: " + result);
        return result;
    }

    @GetMapping("/city/{city}/type/{housingType}")
    private @ResponseBody List<HousingData> getHousingDataByCityAndType(
            @PathVariable String city, @PathVariable String housingType) {
        return housingService.getHousingDataByCityAndType(city, housingType);
    }

    @GetMapping("/trends")
    private @ResponseBody List<HousingData> getHousingTrends(
            @RequestParam int startYear, @RequestParam int endYear) {
        return housingService.getHousingTrends(startYear, endYear);
    }
}
