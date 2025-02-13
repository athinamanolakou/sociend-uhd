package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.models.HousingData;

import java.util.List;

public interface HousingService {
    List<HousingData> getAllHousingData();

    List<HousingData> getHousingDataByCity(String city);

    List<HousingData> getHousingDataByType(String housingType);

    List<HousingData> getHousingDataByCityAndType(String city, String housingType);

    List<HousingData> getHousingTrends(int startYear, int endYear);
}
