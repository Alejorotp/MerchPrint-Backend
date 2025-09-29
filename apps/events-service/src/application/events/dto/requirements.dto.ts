// requirements.dto.ts

type RequirementsDTO = {
    id: string;
    eventId: string;
    description: string;
    quantity: string;
    specs_json: JSON;
};

export type { RequirementsDTO };