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
        private LabourMarketDao labourDao;

        private static final Map<Integer, String> OCCUPATION_MAP = Map.ofEntries(
                        Map.entry(1, "Legislative and senior management occupations"),
                        Map.entry(2, "Specialized middle management occupations"),
                        Map.entry(3, "Middle management occupations in retail and wholesale trade and customer services"),
                        Map.entry(4, "Middle management occupations in trades, transportation, production and utilities"),
                        Map.entry(5, "Professional occupations in finance"),
                        Map.entry(6, "Professional occupations in business"),
                        Map.entry(7, "Administrative and financial supervisors and specialized administrative occupations"),
                        Map.entry(8, "Administrative occupations and transportation logistics occupations"),
                        Map.entry(9, "Administrative and financial support and supply chain logistics occupations"),
                        Map.entry(10, "Professional occupations in natural sciences"),
                        Map.entry(11, "Professional occupations in applied sciences (except engineering)"),
                        Map.entry(12, "Professional occupations in engineering"),
                        Map.entry(13, "Technical occupations related to natural and applied sciences"),
                        Map.entry(14, "Health treating and consultation services professionals"),
                        Map.entry(15, "Therapy and assessment professionals"),
                        Map.entry(16, "Nursing and allied health professionals"),
                        Map.entry(17, "Technical occupations in health"),
                        Map.entry(18, "Assisting occupations in support of health services"),
                        Map.entry(19, "Professional occupations in law"),
                        Map.entry(20, "Professional occupations in education services"),
                        Map.entry(21, "Professional occupations in social and community services"),
                        Map.entry(22, "Professional occupations in government services"),
                        Map.entry(23, "Occupations in front-line public protection services"),
                        Map.entry(24, "Paraprofessional occupations in legal, social, community and education services"),
                        Map.entry(25, "Assisting occupations in education and in legal and public protection"),
                        Map.entry(26, "Care providers and public protection support occupations and "
                                        + "student monitors, crossing guards and related occupations"),
                        Map.entry(27, "Professional occupations in art and culture"),
                        Map.entry(28, "Technical occupations in art, culture and sport"),
                        Map.entry(29, "Occupations in art, culture and sport"),
                        Map.entry(30, "Support occupations in art, culture and sport"));

        private static final Map<Integer, String> FAMILY_TYPE_MAP = Map.ofEntries(
                        Map.entry(1, "Person not in an economic family"),
                        Map.entry(2, "Dual-earner couple, no children or none under 25"),
                        Map.entry(3, "Dual-earner couple, youngest child 0 to 17"),
                        Map.entry(4, "Dual-earner couple, youngest child 18 to 24"),
                        Map.entry(5, "Single-earner couple, male employed, no children or none under 25"),
                        Map.entry(6, "Single-earner couple, male employed, youngest child 0 to 17"),
                        Map.entry(7, "Single-earner couple, male employed, youngest child 18 to 24"),
                        Map.entry(8, "Single-earner couple, female employed, no children or none under 25"),
                        Map.entry(9, "Single-earner couple, female employed, youngest child 0 to 17"),
                        Map.entry(10, "Single-earner couple, female employed, youngest child 18 to 24"),
                        Map.entry(11, "Non-earner couple, no children or none under 25"),
                        Map.entry(12, "Non-earner couple, youngest child 0 to 17"),
                        Map.entry(13, "Non-earner couple, youngest child 18 to 24"),
                        Map.entry(14, "Lone-parent family, parent employed, youngest child 0 to 17"),
                        Map.entry(15, "Lone-parent family, parent employed, youngest child 18 to 24"),
                        Map.entry(16, "Lone-parent family, parent not employed, youngest child 0 to 17"),
                        Map.entry(17, "Lone-parent family, parent not employed, youngest child 18 to 24"),
                        Map.entry(18, "Other families"));

        @Override
        public List<Map<String, Object>> getHousingTotals() {
                List<HousingStartsCompletions> allData = housingDao.findAllData();

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
                List<HousingStartsCompletions> allData = housingDao.findAllData();

                return allData.stream().map(h -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", h.getCity());
                        result.put("year", h.getYear());
                        result.put("month", h.getMonth());

                        double ratio = (h.getTotalComplete() == 0) ? 0
                                        : (double) h.getTotalComplete() / h.getTotalStarts();
                        result.put("ratio", ratio);

                        return result;
                }).collect(Collectors.toList());
        }

        @Override
        public List<Map<String, Object>> getLabourMarketOccupations() {
                List<LabourMarket> allData = labourDao.findAllData();

                return allData.stream().map(l -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", l.getCity());
                        result.put("occupation", getOccupationName(l.getNoc43()));

                        return result;
                }).collect(Collectors.toList());
        }

        @Override
        public List<Map<String, Object>> getLabourMarketFamilyType() {
                List<LabourMarket> allData = labourDao.findAllData();

                return allData.stream().map(l -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("city", l.getCity());
                        result.put("familyType", getFamilyType(l.getEfamtype()));

                        return result;
                }).collect(Collectors.toList());
        }

        private String getOccupationName(Integer noc43) {
                return OCCUPATION_MAP.getOrDefault(noc43, "Unknown Occupation");
        }

        private String getFamilyType(Integer efamtype) {
                return FAMILY_TYPE_MAP.getOrDefault(efamtype, "Unknown Family Type");
        }
}
