// types/Housing.ts

/**
 * Represents a single row of data from the `housing_starts_completions` table.
 */
export interface HousingStartsCompletions {
    id: number;
    year: number;
    month: number;
    city: string;

    // Housing Starts
    singlesStarts: number;
    semisStarts: number;
    rowStarts: number;
    aptOtherStarts: number;
    totalStarts: number;

    // Housing Completions
    singlesComplete: number;
    semisComplete: number;
    rowComplete: number;
    aptOtherComplete: number;
    totalComplete: number;

    lastUpdated: string;  // ISO timestamp for record updates
}

