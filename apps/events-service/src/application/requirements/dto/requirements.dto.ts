// requirements.dto.ts

type RequirementsDTO = {
    id: string;
    eventId: string;
    description: string;
    quantity: number;
    specs_json: JSON;
};

export type { RequirementsDTO };