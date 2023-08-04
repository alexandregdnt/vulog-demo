type ExtraConfig = {
    ageLimitations: AgeLimitation[];
};

export type AgeLimitation = {
    id: string;
    name: string;
    description?: string;
    age: number;
    operator: '==' | '>' | '<' | '<=' | '>=';
    packagesIds: string[];
};

export const extraConfiguration: ExtraConfig = {
    ageLimitations: [
        {
            id: '1',
            name: 'Student',
            description: 'Pack disponibles pour les moins de 26 ans',
            age: 26,
            operator: '<',
            packagesIds: ['04fbe3cc-22f6-461a-8e5e-985183fd6566']
        },
        {
            id: '2',
            name: 'Senior',
            description: 'Pack disponibles pour personnes âgée de 65+ ans',
            age: 65,
            operator: '<=',
            packagesIds: ['85889559-7c04-4c36-8b6f-4c9f825e86c8']
        }
    ]
}

export default extraConfiguration;
