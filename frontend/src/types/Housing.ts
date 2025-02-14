// types/Housing.ts

export interface HousingData {
    id: number;
    year: number;
    month: number;
    city: string;
    singlesStarts: number;
    semisStarts: number;
    rowStarts: number;
    aptOtherStarts: number;
    totalStarts: number;
    singlesComplete: number;
    semisComplete: number;
    rowComplete: number;
    aptOtherComplete: number;
    totalComplete: number;
}


export interface HousingTrend {
    year: number;
    totalStarts: number;
    totalCompletions: number;
}
