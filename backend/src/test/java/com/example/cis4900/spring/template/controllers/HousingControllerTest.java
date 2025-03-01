package com.example.cis4900.spring.template.controllers;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.cis4900.spring.template.housing.HousingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Map;
import java.util.Collections;

@WebMvcTest(HousingController.class)
class HousingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HousingService housingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetHousingTotals_ReturnsData() throws Exception {
        // Given: Mock service returns fake housing totals data
        List<Map<String, Object>> mockData = List.of(
                Map.of("city", "City1", "total_starts", 100, "total_completions", 80),
                Map.of("city", "City2", "total_starts", 200, "total_completions", 150));
        when(housingService.getHousingTotals()).thenReturn(mockData);

        // When & Then: Call the endpoint and verify response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/housing/starts-completions/total"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].city").value("City1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].city").value("City2"));
    }

    @Test
    void testGetHousingTotals_EmptyResponse() throws Exception {
        // Given: Mock service returns an empty list
        when(housingService.getHousingTotals()).thenReturn(Collections.emptyList());

        // When & Then: Call the endpoint and expect an empty array
        mockMvc.perform(MockMvcRequestBuilders.get("/api/housing/starts-completions/total"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
    }

    @Test
    void testGetHousingRatios_ReturnsData() throws Exception {
        // Given: Mock service returns fake housing ratios data
        List<Map<String, Object>> mockData = List.of(
                Map.of("city", "City1", "start_completion_ratio", 1.25),
                Map.of("city", "City2", "start_completion_ratio", 1.33));
        when(housingService.getHousingRatios()).thenReturn(mockData);

        // When & Then: Call the endpoint and verify response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/housing/starts-completions/ratio"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].city").value("City1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].city").value("City2"));
    }

    @Test
    void testGetHousingRatios_EmptyResponse() throws Exception {
        // Given: Mock service returns an empty list
        when(housingService.getHousingRatios()).thenReturn(Collections.emptyList());

        // When & Then: Call the endpoint and expect an empty array
        mockMvc.perform(MockMvcRequestBuilders.get("/api/housing/starts-completions/ratio"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
    }
}
