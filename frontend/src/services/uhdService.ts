import {HousingData, HousingTrend} from '../types/Housing';

const API_URL = '/api/housing';

console.log('API_URL:', API_URL); // Debugging log

/**
 * Fetch all housing starts and completions for Hamilton and Toronto.
 */
export const getAllHousingData = async (): Promise<HousingData[]> => {
    console.log('Fetching all housing data from:', `${API_URL}/all`);
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: HousingData[] = await response.json();
        console.log('API response:', data); // Log the response data
        return data;
    } catch (error) {
        console.error('Error fetching housing data:', error);
        return [];
    }
};

/**
 * Fetch housing starts and completions for a specific city.
 * @param city - "Hamilton" or "Toronto"
 */
export const getHousingDataByCity = async (city: string): Promise<HousingData[]> => {
    console.log(`Fetching housing data for city: ${city} from:`, `${API_URL}/city/${city}`);
    try {
        const response = await fetch(`${API_URL}/city/${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<HousingData[]>;
    } catch (error) {
        console.error(`Error fetching housing data for ${city}:`, error);
        throw error;
    }
};

/**
 * Fetch housing starts and completions by housing type.
 * @param housingType - e.g., "Single Family", "Apartments", "Condos"
 */
export const getHousingDataByType = async (housingType: string): Promise<HousingData[]> => {
    console.log(`Fetching housing data for type: ${housingType} from:`, `${API_URL}/type/${housingType}`);
    try {
        const response = await fetch(`${API_URL}/type/${housingType}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<HousingData[]>;
    } catch (error) {
        console.error(`Error fetching housing data for ${housingType}:`, error);
        throw error;
    }
};

/**
 * Fetch historical trends in housing starts and completions over time.
 * @param startYear - The starting year for the data
 * @param endYear - The ending year for the data
 */
export const getHousingTrends = async (startYear: number, endYear: number): Promise<HousingTrend[]> => {
    console.log(`Fetching housing trends from ${startYear} to ${endYear}:`, `${API_URL}/trends?start=${startYear}&end=${endYear}`);
    try {
        const response = await fetch(`${API_URL}/trends?start=${startYear}&end=${endYear}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<HousingTrend[]>;
    } catch (error) {
        console.error(`Error fetching housing trends:`, error);
        throw error;
    }
};

/**
 * Fetch housing starts and completions for a specific city and housing type.
 * @param city - "Hamilton" or "Toronto"
 * @param housingType - "Single Family", "Apartments", "Condos", etc.
 */
export const getHousingDataByCityAndType = async (city: string, housingType: string): Promise<HousingData[]> => {
    console.log(`Fetching housing data for city: ${city} and type: ${housingType} from:`, `${API_URL}/city/${city}/type/${housingType}`);
    try {
        const response = await fetch(`${API_URL}/city/${city}/type/${housingType}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<HousingData[]>;
    } catch (error) {
        console.error(`Error fetching housing data for ${city} and ${housingType}:`, error);
        throw error;
    }
};
