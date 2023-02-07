import { Answer } from '.';

export interface Entry {
    id: string,
    userId: string,
    userName?: string
    sheetId: string,
    sheetName: string,
    sheetOwner: string,
    eventTime: string,
    score: number,
    updatedAt: string,
    rank: number
}