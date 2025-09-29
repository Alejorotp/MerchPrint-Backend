// create-requirements.dto.ts

type CreateRequirementsDTO = {
    eventId: string;
    description: string;
    quantity: string;
    specs_json: JSON;
};

export type { CreateRequirementsDTO };