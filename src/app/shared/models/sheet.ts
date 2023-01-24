import { Prop, UserAnswer } from '.';

export interface Sheet {
    id?: string,
    name?: string,
    eventTime?: string,
    password?: string,
    ownerId?: string,
    ownerName?: string
    props?: Array<Prop>
    joinedUserIds?: Array<UserAnswer>
    isPublic?: boolean
};
