// types/Housing.ts

export interface HousingData {
    id: number;
    city: 'Hamilton' | 'Toronto';
    housingType: 'Single Family' | 'Apartments' | 'Condos' | 'Townhouses' | 'Other';
    starts: number; // Number of housing starts
    completions: number; // Number of completed housing units
    year: number;
    month?: string; // Optional: If we want to include monthly trends
}

export interface HousingTrend {
    year: number;
    totalStarts: number;
    totalCompletions: number;
}
