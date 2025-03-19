package com.example.cis4900.spring.template.housing;

import java.util.List;
import java.util.Map;

public interface HousingService {

    List<Map<String, Object>> getHousingTotals();

    List<Map<String, Object>> getHousingRatios();

    List<Map<String, Object>> getLabourMarketOccupations();

    List<Map<String, Object>> getLabourMarketFamilyTypes();

    List<Map<String, Object>> getImmigrationData();
}
