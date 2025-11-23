export type NavLinkType = {
    id: string;
    href: string;
    label: string;
}

export const navLinks: NavLinkType[] = [
    {
        id: crypto.randomUUID(),
        href: 'about',
        label: 'О тесте'
    },
    {
        id: crypto.randomUUID(),
        href: 'result',
        label: 'Результат'
    },
    {
        id: crypto.randomUUID(),
        href: 'prof',
        label: 'Профориентация'
    },
    {
        id: crypto.randomUUID(),
        href: 'plans',
        label: 'Тарифы'
    },
]
