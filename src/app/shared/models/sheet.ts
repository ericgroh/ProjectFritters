import { Prop, Status } from '.';

export interface Sheet {
    id: string,
    name: string,
    eventTime: string,
    password: string,
    ownerId: string,
    ownerName: string,
    props: Array<Prop>,
    participants: number
    status: Status,
    isPublic: boolean,
    tieBreaker: Prop
};
