export interface CoordinatesI {
    lat: number;
    lng: number;
}

export interface AddressI {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: CoordinatesI;
    country: string;
}

export interface HairI {
    color: string;
    type: string;
}

export interface BankI {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface CompanyI {
    department: string;
    name: string;
    title: string;
    address: AddressI;
}

export interface CryptoI {
    coin: string;
    wallet: string;
    network: string;
}

export type UserRoleI = "admin" | "moderator" | "user";

export interface UserI {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: "male" | "female" | "other";
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: HairI;
    ip: string;
    address: AddressI;
    macAddress: string;
    university: string;
    bank: BankI;
    company: CompanyI;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: CryptoI;
    role: UserRoleI;
}

export interface UsersResponseI {
    users: UserI[];
    total: number;
    skip: number;
    limit: number;
}

export interface UserFilteredI {
    id: number;
    username: string;
    email: string;
    age: number;
    gender: "male" | "female" | "other";
}
