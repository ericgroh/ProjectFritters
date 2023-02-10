export interface User {
    uid: string,
    email: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    photoURL?: string,
    isAdmin?: boolean,
    isNew: boolean
}
