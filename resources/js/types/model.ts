export type LegalInfo = {
    id: number;
    key: string;
    title: string;
    body: string;
    html: string;
    created_at?: string;
    updated_at?: string;
};
export type Plan = {
    id: number;
    title: string;
    duration: number;
    price: number;
    prevPrice?: number;
    description: string;
    perks: string;
    tier: string;
    created_at?: string;
    updated_at?: string;
    taken: any;
    users?: User[];
};
export type Question = {
    id: number;
    question: string;
    test_id: number;
    number: number;
    answer?: string;
    created_at?: string;
    updated_at?: string;
    test?: Test;
};
export type Test = {
    id: number;
    tier: TestTiers;
    user_id: number;
    result?: string;
    created_at?: string;
    updated_at?: string;
    user?: User;
    questions?: Question[];
};
export type User = {
    id: number;
    name: string;
    plan_id?: number;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    tests?: Test[];
    plans?: Plan[];
};
export enum Answers {
    YES = "\u0434\u0430",
    NO = "\u043D\u0435\u0442",
    UNKNOWN = "\u043D\u0435 \u0437\u043D\u0430\u044E"
}
export enum LegalInfoKeys {
    POLICY = "policy",
    CONSENT = "consent"
}
export enum TestTiers {
    FREE = "free",
    TOP = "top",
    PREMIUM = "premium"
}
