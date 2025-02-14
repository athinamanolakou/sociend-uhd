package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.models.HousingData;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousingServiceImpl implements HousingService {

    private final List<HousingData> mockData = Arrays.asList(
            // Toronto Data
            new HousingData(1, "Toronto", "Condos", 500, 450, 2023),
            new HousingData(2, "Toronto", "Single Family", 300, 250, 2023),
            new HousingData(3, "Toronto", "Apartments", 700, 650, 2023),
            new HousingData(4, "Toronto", "Townhouses", 350, 300, 2023),
            new HousingData(5, "Toronto", "Condos", 520, 460, 2024),
            new HousingData(6, "Toronto", "Single Family", 320, 270, 2024),
            new HousingData(7, "Toronto", "Apartments", 720, 680, 2024),
            new HousingData(8, "Toronto", "Townhouses", 370, 320, 2024),
            new HousingData(9, "Toronto", "Condos", 540, 490, 2025),
            new HousingData(10, "Toronto", "Single Family", 340, 280, 2025),
            new HousingData(11, "Toronto", "Apartments", 740, 700, 2025),
            new HousingData(12, "Toronto", "Townhouses", 390, 350, 2025),

            // Hamilton Data
            new HousingData(13, "Hamilton", "Condos", 200, 180, 2023),
            new HousingData(14, "Hamilton", "Single Family", 150, 120, 2023),
            new HousingData(15, "Hamilton", "Apartments", 400, 360, 2023),
            new HousingData(16, "Hamilton", "Townhouses", 250, 200, 2023),
            new HousingData(17, "Hamilton", "Condos", 220, 190, 2024),
            new HousingData(18, "Hamilton", "Single Family", 170, 140, 2024),
            new HousingData(19, "Hamilton", "Apartments", 420, 380, 2024),
            new HousingData(20, "Hamilton", "Townhouses", 270, 230, 2024),
            new HousingData(21, "Hamilton", "Condos", 240, 210, 2025),
            new HousingData(22, "Hamilton", "Single Family", 190, 160, 2025),
            new HousingData(23, "Hamilton", "Apartments", 440, 400, 2025),
            new HousingData(24, "Hamilton", "Townhouses", 290, 260, 2025));

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