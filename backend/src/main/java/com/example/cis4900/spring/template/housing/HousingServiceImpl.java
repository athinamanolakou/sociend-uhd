package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.dao.HousingStartsCompletionsDao;
import com.example.cis4900.spring.template.housing.models.HousingStartsCompletions;
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

        // @Override
        // public List<HousingStartsCompletions> getAllHousingStartsCompletions() {
        // return housingDao.findAllData();
        // }

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
}
