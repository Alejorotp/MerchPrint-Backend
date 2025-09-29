type OrderDTO = {
  id: string;
  client_id: string;
  offer_id: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type { OrderDTO };
