package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.models.HousingData;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousingServiceImpl implements HousingService {

    private final List<HousingData> mockData = Arrays.asList(
            new HousingData(1, "Toronto", "Condos", 500, 450, 2023),
            new HousingData(2, "Toronto", "Single Family", 300, 250, 2023),
            new HousingData(3, "Hamilton", "Condos", 200, 180, 2023),
            new HousingData(4, "Hamilton", "Single Family", 150, 120, 2023),
            new HousingData(5, "Toronto", "Condos", 520, 460, 2024),
            new HousingData(6, "Hamilton", "Townhouses", 180, 160, 2024));

    @Override
    public List<HousingData> getAllHousingData() {
        return mockData;
    }

    @Override
    public List<HousingData> getHousingDataByCity(String city) {
        return mockData.stream()
                .filter(data -> data.getCity().equalsIgnoreCase(city))
                .collect(Collectors.toList());
    }

    @Override
    public List<HousingData> getHousingDataByType(String housingType) {
        return mockData.stream()
                .filter(data -> data.getHousingType().equalsIgnoreCase(housingType))
                .collect(Collectors.toList());
    }

    @Override
    public List<HousingData> getHousingDataByCityAndType(String city, String housingType) {
        return mockData.stream()
                .filter(data -> data.getCity().equalsIgnoreCase(city)
                        && data.getHousingType().equalsIgnoreCase(housingType))
                .collect(Collectors.toList());
    }

    @Override
    public List<HousingData> getHousingTrends(int startYear, int endYear) {
        return mockData.stream()
                .filter(data -> data.getYear() >= startYear && data.getYear() <= endYear)
                .collect(Collectors.toList());
    }
}