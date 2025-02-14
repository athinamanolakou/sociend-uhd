package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.models.HousingData;
import org.springframework.stereotype.Service;
import java.time.Year;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousingServiceImpl implements HousingService {

    private final List<HousingData> mockData = Arrays.asList(
            // Toronto Data (Multiple Years)
            new HousingData.Builder().id(1).year(Year.of(2023)).month(1).city("Toronto")
                    .singlesStarts(500).singlesComplete(450).build(),
            new HousingData.Builder().id(2).year(Year.of(2023)).month(2).city("Toronto")
                    .singlesStarts(520).singlesComplete(460).build(),
            new HousingData.Builder().id(3).year(Year.of(2023)).month(3).city("Toronto")
                    .singlesStarts(530).singlesComplete(480).build(),

            new HousingData.Builder().id(4).year(Year.of(2024)).month(1).city("Toronto")
                    .singlesStarts(510).singlesComplete(470).build(),
            new HousingData.Builder().id(5).year(Year.of(2024)).month(2).city("Toronto")
                    .singlesStarts(525).singlesComplete(485).build(),
            new HousingData.Builder().id(6).year(Year.of(2024)).month(3).city("Toronto")
                    .singlesStarts(540).singlesComplete(500).build(),

            // Hamilton Data
            new HousingData.Builder().id(7).year(Year.of(2023)).month(1).city("Hamilton")
                    .singlesStarts(200).singlesComplete(180).build(),
            new HousingData.Builder().id(8).year(Year.of(2023)).month(2).city("Hamilton")
                    .singlesStarts(220).singlesComplete(190).build(),
            new HousingData.Builder().id(9).year(Year.of(2023)).month(3).city("Hamilton")
                    .singlesStarts(240).singlesComplete(210).build(),

            new HousingData.Builder().id(10).year(Year.of(2024)).month(1).city("Hamilton")
                    .singlesStarts(230).singlesComplete(200).build(),
            new HousingData.Builder().id(11).year(Year.of(2024)).month(2).city("Hamilton")
                    .singlesStarts(250).singlesComplete(220).build(),
            new HousingData.Builder().id(12).year(Year.of(2024)).month(3).city("Hamilton")
                    .singlesStarts(270).singlesComplete(240).build());

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
                .filter(data -> housingType.equalsIgnoreCase("Single Family")
                        && data.getSinglesStarts() > 0
                        || housingType.equalsIgnoreCase("Semis")
                                && data.getSemisStarts() > 0
                        || housingType.equalsIgnoreCase("Row")
                                && data.getRowStarts() > 0
                        || housingType.equalsIgnoreCase("Apartments/Other")
                                && data.getAptOtherStarts() > 0)
                .collect(Collectors.toList());
    }

    @Override
    public List<HousingData> getHousingDataByCityAndType(String city, String housingType) {
        return mockData.stream()
                .filter(data -> data.getCity().equalsIgnoreCase(city)
                        && (housingType.equalsIgnoreCase("Single Family")
                                && data.getSinglesStarts() > 0
                                || housingType.equalsIgnoreCase("Semis")
                                        && data.getSemisStarts() > 0
                                || housingType.equalsIgnoreCase("Row")
                                        && data.getRowStarts() > 0
                                || housingType.equalsIgnoreCase("Apartments/Other")
                                        && data.getAptOtherStarts() > 0))
                .collect(Collectors.toList());
    }

    @Override
    public List<HousingData> getHousingTrends(int startYear, int endYear) {
        return mockData.stream()
                .filter(data -> data.getYear().getValue() >= startYear
                        && data.getYear().getValue() <= endYear)
                .collect(Collectors.toList());
    }
}
