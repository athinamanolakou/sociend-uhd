package com.example.cis4900.spring.template.housing;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.cis4900.spring.template.housing.dao.HousingStartsCompletionsDao;
import com.example.cis4900.spring.template.housing.dao.LabourMarketDao;
import com.example.cis4900.spring.template.housing.models.HousingStartsCompletions;
import com.example.cis4900.spring.template.housing.models.LabourMarket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Timestamp;
import java.time.Year;
import java.util.List;
import java.util.Map;
import java.util.Collections;

class HousingServiceImplTest {

    @Mock
    private HousingStartsCompletionsDao housingDao;

    @Mock
    private LabourMarketDao labourDao;


    @InjectMocks
    private HousingServiceImpl housingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetHousingTotals_ReturnsData() {
        List<HousingStartsCompletions> mockData = List.of(
                new HousingStartsCompletions.Builder()
                        .id(1)
                        .year(Year.of(2024))
                        .month(3)
                        .city("City1")
                        .totalStarts(100)
                        .totalComplete(80)
                        .lastUpdated(new Timestamp(System.currentTimeMillis()))
                        .build(),
                new HousingStartsCompletions.Builder()
                        .id(2)
                        .year(Year.of(2023))
                        .month(2)
                        .city("City2")
                        .totalStarts(150)
                        .totalComplete(120)
                        .lastUpdated(new Timestamp(System.currentTimeMillis()))
                        .build());
        when(housingDao.findAllData()).thenReturn(mockData);

        List<Map<String, Object>> result = housingService.getHousingTotals();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("City1", result.get(0).get("city"));
        assertEquals(100, result.get(0).get("totalStarts"));
        assertEquals(80, result.get(0).get("totalCompletions"));
    }

    @Test
    void testGetHousingTotals_EmptyResponse() {
        when(housingDao.findAllData()).thenReturn(Collections.emptyList());

        List<Map<String, Object>> result = housingService.getHousingTotals();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetHousingRatios_ReturnsData() {
        List<HousingStartsCompletions> mockData = List.of(
                new HousingStartsCompletions.Builder()
                        .id(1)
                        .year(Year.of(2024))
                        .month(3)
                        .city("City1")
                        .totalStarts(100)
                        .totalComplete(80)
                        .lastUpdated(new Timestamp(System.currentTimeMillis()))
                        .build(),
                new HousingStartsCompletions.Builder()
                        .id(2)
                        .year(Year.of(2023))
                        .month(2)
                        .city("City2")
                        .totalStarts(150)
                        .totalComplete(120)
                        .lastUpdated(new Timestamp(System.currentTimeMillis()))
                        .build());
        when(housingDao.findAllData()).thenReturn(mockData);

        List<Map<String, Object>> result = housingService.getHousingRatios();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("City1", result.get(0).get("city"));
        assertEquals(0.8, (double) result.get(0).get("ratio"), 0.01);
    }

    @Test
    void testGetHousingRatios_EmptyResponse() {
        when(housingDao.findAllData()).thenReturn(Collections.emptyList());

        List<Map<String, Object>> result = housingService.getHousingRatios();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetLabourMarketFamilyTypes_ReturnsData() {
        List<LabourMarket> mockData = List.of(
                new LabourMarket.Builder().cma(1).eFamType(2).build(),
                new LabourMarket.Builder().cma(3).eFamType(4).build()
        );
        when(labourDao.findAllData()).thenReturn(mockData);

        List<Map<String, Object>> result = housingService.getLabourMarketFamilyTypes();

        
        System.out.println("Test Output: " + result);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(1, result.get(0).get("city"));
    }

    @Test
    void testGetLabourMarketFamilyTypes_EmptyResponse() {

        when(labourDao.findAllData()).thenReturn(List.of());

        List<Map<String, Object>> result = housingService.getLabourMarketFamilyTypes();

        assertNotNull(result);
        assertTrue(result.isEmpty());  
    }
    
}
