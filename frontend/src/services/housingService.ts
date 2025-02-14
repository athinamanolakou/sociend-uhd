import {HousingStartsCompletions} from '../types/Housing';

const API_URL = '/api/housing';

/**
 * Fetch all housing starts and completions data.
 */
export const getAllHousingStartsCompletions = async (): Promise<HousingStartsCompletions[]> => {
    console.log('Fetching all housing starts and completions from:', `${API_URL}/starts-completions/all`);
    try {
        const response = await fetch(`${API_URL}/starts-completions/all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: HousingStartsCompletions[] = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching housing data:', error);
        return [];
    }
};

// Future API endpoints for additional tables
export const getAllApartmentStarts = async (): Promise<void> => {
    console.log('Fetching apartment starts (future feature)...');
    return;
};

export const getAllHousingUnderConstruction = async (): Promise<void> => {
    console.log('Fetching housing under construction (future feature)...');
    return;
};
