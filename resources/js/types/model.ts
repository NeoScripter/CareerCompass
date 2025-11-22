export type Plan = {
    id: number;
    title: string;
    duration: number;
    price: number;
    prevPrice?: number;
    limit: number;
    description: string;
    perks: string[];
    created_at?: string;
    updated_at?: string;
    users?: User[];
};
export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    plans?: Plan[];
};
