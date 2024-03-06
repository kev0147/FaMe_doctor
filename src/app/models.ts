export interface Profile {
    id?: number;
    name: string;
    firstname: string;
    email?: string; // Optional field
    phone_number: number;
}

export interface Patient {
    id?: string;
    gender: string;
    birth_date: string;
    profile: Profile;
}

export interface Doctor {
    id?: string;
    profile: Profile;
    doctors_order_number? : string;
    speciality? : string;
}

export interface Token {
    access: string;
    refresh: string;
}

export interface User {
    username: string;
    password: string;
}

export interface Balance {
    balance: number;
}



export interface Prestation {
    prestation: string;
    price: number;
}

export interface Report {
    prescription: string;
    comments: number;
}

export interface Service {
    date: Date;
    patient: number;
    prestation: number;
    report: number;
}

export interface Agent {
    profil: string;
    speciality: string;
}

export interface Message {
    key: string;
    sender: string;
    receiver: string;
    message: string;
}

export interface Notif {
    id?: string;
    type: string;
    patient: string;
    date: string;
    dismissed: Boolean;
}
