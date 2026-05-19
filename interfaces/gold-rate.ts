export interface IGoldRate {
    _id?: string;

    date: string;

    gold18k: number;

    gold22k: number;

    gold24k: number;

    createdAt?: string | Date;

    updatedAt?: string | Date;
}