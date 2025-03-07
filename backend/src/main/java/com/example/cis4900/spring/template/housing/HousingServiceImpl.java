package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.dao.*;
import com.example.cis4900.spring.template.housing.models.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HousingServiceImpl implements HousingService {

        @Autowired
        private HousingStartsCompletionsDao housingDao;

        @Autowired
        private HousingLabourMarketDao labourDao;

        @Override
        public List<Map<String, Object>> getHousingTotals() {
                // Fetch all data
                List<HousingStartsCompletions> allData = housingDao.findAllData();

                // Process the data and return starts and completions directly
                return allData.stream().map(h -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", h.getCity());
                        result.put("year", h.getYear());
                        result.put("month", h.getMonth());
                        result.put("totalStarts", h.getTotalStarts());
                        result.put("totalCompletions", h.getTotalComplete());

                        return result;
                }).collect(Collectors.toList());
        }

        @Override
        public List<Map<String, Object>> getHousingRatios() {
                // Fetch all data
                List<HousingStartsCompletions> allData = housingDao.findAllData();

                // Process the data and calculate the ratios, returning the result as a
                // List<Map<String, Object>>
                return allData.stream().map(h -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", h.getCity());
                        result.put("year", h.getYear());
                        result.put("month", h.getMonth());

                        // Calculate the ratio
                        double ratio = (h.getTotalComplete() == 0) ? 0
                                        : (double) h.getTotalComplete() / h.getTotalStarts();
                        result.put("ratio", ratio);

                        return result;
                }).collect(Collectors.toList());
        }

        @Override
        public List<Map<String, Object>> getLabourMarketOccupations() {
                // Fetch all data from labour_market table
                List<LabourMarket> allData = labourDao.findAllData();

                // Process the data to map NOC_43 values to occupation names
                return allData.stream().map(l -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", l.getCity()); // Store the city
                        result.put("occupation", getOccupationName(l.getNoc43())); // Convert to string
                        result.put("count", l.getNoc43()); // Store the numeric value

                        return result;
                }).collect(Collectors.toList());
        }

        // Helper method to convert NOC_43 numeric values to occupation names
        private String getOccupationName(Integer noc43) {
                if (noc43 == null)
                        return "Unknown";

                return switch (noc43) {
                        case 1 -> "Legislative and senior management occupations";
                        case 2 -> "Specialized middle management occupations";
                        case 3 -> "Middle management occupations in retail and wholesale trade and customer services";
                        case 4 -> "Middle management occupations in trades, transportation, production and utilities";
                        case 5 -> "Professional occupations in finance";
                        case 6 -> "Professional occupations in business";
                        case 7 -> "Administrative and financial supervisors and specialized administrative occupations";
                        case 8 -> "Administrative occupations and transportation logistics occupations";
                        case 9 -> "Administrative and financial support and supply chain logistics occupations";
                        case 10 -> "Professional occupations in natural sciences";
                        case 11 -> "Professional occupations in applied sciences (except engineering)";
                        case 12 -> "Professional occupations in engineering";
                        case 13 -> "Technical occupations related to natural and applied sciences";
                        case 14 -> "Health treating and consultation services professionals";
                        case 15 -> "Therapy and assessment professionals";
                        case 16 -> "Nursing and allied health professionals";
                        case 17 -> "Technical occupations in health";
                        case 18 -> "Assisting occupations in support of health services";
                        case 19 -> "Professional occupations in law";
                        case 20 -> "Professional occupations in education services";
                        case 21 -> "Professional occupations in social and community services";
                        case 22 -> "Professional occupations in government services";
                        case 23 -> "Occupations in front-line public protection services";
                        case 24 -> "Paraprofessional occupations in legal, social, community and education services";
                        case 25 -> "Assisting occupations in education and in legal and public protection";
                        case 26 ->
                                "Care providers and public protection support occupations and student monitors, crossing guards and related occupations";
                        case 27 -> "Professional occupations in art and culture";
                        case 28 -> "Technical occupations in art, culture and sport";
                        case 29 -> "Occupations in art, culture and sport";
                        case 30 -> "Support occupations in art, culture and sport";
                        default -> "Unknown Occupation";
                };
        }
}
