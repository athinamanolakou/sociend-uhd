package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.dao.HousingStartsCompletionsDao;
import com.example.cis4900.spring.template.housing.models.HousingStartsCompletions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HousingServiceImpl implements HousingService {

        @Autowired
        private HousingStartsCompletionsDao housingDao;

        @Override
        public List<HousingStartsCompletions> getAllHousingStartsCompletions() {
                return housingDao.findAllData();
        }
}
