//import {HousingStartsCompletions} from '../types/Housing';

const API_URL = '/api/housing';

///**
// * Fetch all housing starts and completions data.
// */
//export const getAllHousingStartsCompletions = async (): Promise<HousingStartsCompletions[]> => {
//    console.log('Fetching all housing starts and completions from:', `${API_URL}/starts-completions/all`);
//    try {
//        const response = await fetch(`${API_URL}/starts-completions/all`);
//        if (!response.ok) {
//            throw new Error(`HTTP error! Status: ${response.status}`);
//        }
//        const data: HousingStartsCompletions[] = await response.json();
//        console.log('API response:', data);
//        return data;
//    } catch (error) {
//        console.error('Error fetching housing data:', error);
//        return [];
//    }
//};

/**
 * Fetch housing completion ratios from the backend.
 */
export const getHousingCompletionRatios = async (): Promise<{city: string; year: number; month: number; ratio: number}[]> => {
    console.log('Fetching housing completion ratios from:', `${API_URL}/starts-completions/ratio`);
    try {
        const response = await fetch(`${API_URL}/starts-completions/ratio`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching housing ratios:', error);
        return [];
    }
};

/**
 * Fetch housing completion ratios from the backend.
 */
export const getHousingTotalStartsCompletions = async (): Promise<{city: string; year: number; month: number; totalStarts: number; totalCompletions: number}[]> => {
    console.log('Fetching housing total starts and completions from:', `${API_URL}/starts-completions/total`);
    try {
        const response = await fetch(`${API_URL}/starts-completions/total`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching housing total starts and completions:', error);
        return [];
    }
}

/**
 * Fetch labour market occupations data from the backend.
 */
export const getLabourMarketOccupations = async (): Promise<{city: string; occupation: string; count: number}[]> => {
    console.log('Fetching labour market occupations from:', `${API_URL}/labour-market/occupation`);
    try {
        const response = await fetch(`${API_URL}/labour-market/occupation`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching labour market occupations:', error);
        return [];
    }
}

/**
 * Fetch labour market family type data from the backend.
 */
export const getLabourMarketFamilyTypes = async (): Promise<{city: string; familyType: string; count: number}[]> => {
    console.log('Fetching labour market family types from:', `${API_URL}/labour-market/family-type`);
    try {
        const response = await fetch(`${API_URL}/labour-market/family-type`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching labour market family types:', error);
        return [];
    }
}
