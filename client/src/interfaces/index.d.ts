// the ___.d.ts stops this file from builing 

// CREATE INTERFACES TO DESCRIBE WHAT DATA LOOKS LIKE 

export interface Post {
    _id: string;
    title: string;
    body: string;
    pet?: Pet;
}

export interface Pet {
    _id: string;
    name: string;
    type: string;
    age: number;
    posts?: Post[];
}