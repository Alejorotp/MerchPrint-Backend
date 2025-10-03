// in-memory-auction.repository.ts

import { Injectable } from "@nestjs/common";
import { Auction } from "../../domain/auctions/auction.entity";
import { AuctionRepositoryPort } from "../../domain/auctions/auction.repository.port";
import { InMemoryEventRepository } from "../in-memory/in-memory-event.repository";

@Injectable()
export class InMemoryAuctionRepository implements AuctionRepositoryPort {
    private auctions: Auction[] = [];
    constructor(private readonly eventRepo: InMemoryEventRepository) {}

    async save(auction: Auction): Promise<Auction> {
        this.auctions.push(auction);
        return auction;
    }

    async findById(id: string): Promise<Auction | null> {
        const auction = this.auctions.find(a => a.id === id);
        return auction || null;
    }

    async findAll(): Promise<Auction[]> {
        return this.auctions;
    }

    async existsByEventId(event_id: string): Promise<boolean> {
        return this.auctions.some(a => a.event_id === event_id);
    }

    async findByEventId(event_id: string): Promise<Auction | null> {
        const auction = this.auctions.find(a => a.event_id === event_id);
        return auction || null;
    }

    async deleteByEventId(event_id: string): Promise<void> {
        this.auctions = this.auctions.filter(a => a.event_id !== event_id);
    }

    async deleteById(id: string): Promise<void> {
        this.auctions = this.auctions.filter(a => a.id !== id);
    }

    async update(auction: Auction): Promise<Auction> {
        const index = this.auctions.findIndex(a => a.id === auction.id);
        if (index === -1) {
            throw new Error('Auction not found');
        }
        this.auctions[index] = auction;
        return auction;
    }

    async count(): Promise<number> {
        return this.auctions.length;
    }

    async findByCompanyId(company_id: string): Promise<Auction[]> {
        //placeholder implementation, pending for API gateway integration
        return this.auctions
    }

    async findActiveAuctions(): Promise<Auction[]> {
        return this.auctions.filter(a => a.status === 'active');
    }
}