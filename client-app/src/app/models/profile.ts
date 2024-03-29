import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo [];
}

export class Profile implements Profile {
    constructor( user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }

    username: string;
    displayName: string;
    image?: string | undefined;
    bio?: string | undefined;
    photos?: Photo[] ;
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}