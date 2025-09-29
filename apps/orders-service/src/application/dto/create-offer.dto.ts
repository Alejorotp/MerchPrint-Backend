type CreateOfferDTO = {
  auction_id: string;
  company_id: string;
  price: number;
  lead_time_days: number;
  specs_json?: JSON;
};

type OfferDTO = {
  id: string;
  auction_id: string;
  company_id: string;
  price: number;
  lead_time_days: number;
  status: string;
  created_at: Date;
  specs_json?: JSON;
};

export type { CreateOfferDTO, OfferDTO };
