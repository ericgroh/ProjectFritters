import { Prop } from 'src/app/shared/models';
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
    updatedAt: number,
    rank: number
    tieBreaker: Prop,
    tieBreakerScore: number
}