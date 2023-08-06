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
            packagesIds: ["ce6b1ee4-4a5c-41f8-a45d-db9e61899d2e"]
        },
        {
            id: '2',
            name: 'Senior',
            description: 'Pack disponibles pour personnes âgée de 65+ ans',
            age: 65,
            operator: '>=',
            packagesIds: ["5911e127-65d3-4405-ac31-1a2cd60f9660"]
        }
    ]
}

export default extraConfiguration;
