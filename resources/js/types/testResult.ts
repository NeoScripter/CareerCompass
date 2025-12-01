export type DemandLevel =
    | 'Очень высокая'
    | 'Высокая'
    | 'Средняя'
    | 'Низкая'
    | 'Очень низкая';

export interface Job {
    id: string;
    percent: number;
    title: string;
    description: string;
    avrSalary: number;
    demand: DemandLevel;
}

export interface PersonalityItem {
    id: string;
    title: string;
    description: string;
}

export interface PersonalityChart {
    id: string;
    title: string;
    percent: number;
}

export interface Strength {
    id: string;
    title: string;
    percent: number;
}

export interface Weakness {
    id: string;
    title: string;
    percent: number;
}

export interface Summary {
    id: string;
    description: string;
}

export interface Advice {
    id: string;
    description: string;
}

// Base structure shared by all tiers
interface BaseTestResult {
    personalityItems: null;
    personalityDescription: string;
    jobs: (Job | null)[];
    charts: (PersonalityChart | null)[];
    strengths: (Strength | null)[];
    weaknesses: (Weakness | null)[];
}

// Free tier specific structure
export interface FreeTestResult extends BaseTestResult {
    jobs: [Job, Job, Job, null, null, null, null, null, null, null];
    charts: [
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        null,
        null,
        null,
        null,
        null,
    ];
    strengths: [
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        null,
        null,
        null,
        null,
        null,
    ];
    weaknesses: [
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        null,
        null,
        null,
        null,
        null,
    ];
    summary: null;
    bestJob: null;
    jobAdvice: null;
    improvementAdvice: null;
}

// Top tier specific structure
export interface TopTestResult extends BaseTestResult {
    jobs: [Job, Job, Job, Job, Job, Job, Job, Job, null, null];
    charts: [
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        null,
        null,
    ];
    strengths: [
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        null,
        null,
        null,
        null,
        null,
    ];
    weaknesses: [
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        null,
        null,
        null,
        null,
        null,
    ];
    summary: null;
    bestJob: null;
    jobAdvice: null;
    improvementAdvice: Advice[];
}

// Premium tier specific structure
export interface PremiumTestResult extends BaseTestResult {
    jobs: [Job, Job, Job, Job, Job, Job, Job, Job, Job, Job];
    charts: [
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
        PersonalityChart,
    ];
    strengths: [
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
        Strength,
    ];
    weaknesses: [
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
        Weakness,
    ];
    summary: Summary;
    bestJob: Job;
    jobAdvice: Advice[];
    improvementAdvice: Advice[];
}

// Union type for all test results
export type TestResult = FreeTestResult | TopTestResult | PremiumTestResult;

// Type guard functions
export function isFreeTestResult(result: TestResult): result is FreeTestResult {
    return (
        result.summary === null &&
        result.bestJob === null &&
        result.improvementAdvice === null
    );
}

export function isTopTestResult(result: TestResult): result is TopTestResult {
    return (
        result.summary === null &&
        result.bestJob === null &&
        Array.isArray(result.improvementAdvice)
    );
}

export function isPremiumTestResult(
    result: TestResult,
): result is PremiumTestResult {
    return (
        Array.isArray(result.summary) &&
        result.bestJob !== null &&
        Array.isArray(result.jobAdvice)
    );
}
