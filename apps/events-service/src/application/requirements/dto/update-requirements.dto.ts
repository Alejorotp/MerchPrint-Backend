// update-requirements.dto.ts

type UpdateRequirementsDTO = {
    id?: string;
    eventId?: string;
    description?: string;
    quantity?: number;
    specs_json?: JSON;
};
export type { UpdateRequirementsDTO };
