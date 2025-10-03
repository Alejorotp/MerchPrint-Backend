// auction.repository.port.ts

import { Auction } from "./auction.entity";

export interface AuctionRepositoryPort {
  save(auction: Auction): Promise<Auction>;
  findById(id: string): Promise<Auction | null>;
  findAll(): Promise<Auction[]>;
  existsByEventId(event_id: string): Promise<boolean>;
  findByEventId(event_id: string): Promise<Auction | null>;
  deleteByEventId(event_id: string): Promise<void>;
  deleteById(id: string): Promise<void>;
  update(auction: Auction): Promise<Auction>;
  count(): Promise<number>;
  findByCompanyId(company_id: string): Promise<Auction[]>;
  findActiveAuctions(): Promise<Auction[]>;
}