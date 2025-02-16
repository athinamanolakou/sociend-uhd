package com.example.cis4900.spring.template.housing;

import com.example.cis4900.spring.template.housing.models.HousingStartsCompletions;
import java.util.List;

public interface HousingService {
    List<HousingStartsCompletions> getAllHousingStartsCompletions();

    // Future methods for additional tables
    // List<ApartmentStarts> getAllApartmentStarts();
    // List<HousingUnderConstruction> getAllHousingUnderConstruction();
}
