export interface Account {
    id: string,
    account: string,
    bank: string,
    name: string,
    qr?: string;
    amount?: number
    bankInfo?: Bank
}

export interface Bank {
    "id": number,
    "name": string,
    "code": string,
    "bin": string,
    "logo": string,
    "shortName": string,
    "short_name": string,
}

export interface DropdownItem {
    id: string,
    text: string,
    [key : string] : any
}