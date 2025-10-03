// get-auction.usecase.ts

import { Injectable, Inject } from "@nestjs/common";
import type { AuctionRepositoryPort } from "../../../domain/auctions/auction.repository.port";  
import type { EventRepositoryPort } from "../../../domain/events/event.repository.port";
import { AuctionDTO } from "../dto/auction.dto";
import { toAuctionDTO } from "../mappers/auction.mapper";
import { Auction } from "../../../domain/auctions/auction.entity";

@Injectable()
export class GetAuctionUseCase {
    constructor(
        @Inject('AuctionRepositoryPort')
        private readonly auctionRepo: AuctionRepositoryPort,
        @Inject('EventRepositoryPort')
        private readonly eventRepo: EventRepositoryPort
    ) {}
    async execute(event_id: string): Promise<AuctionDTO | null> {
        const existingAuction = await this.auctionRepo.findByEventId(event_id);
        if (!existingAuction) {
            return null;
        }
        return toAuctionDTO(existingAuction);
    }

    async executeByCompanyId(company_id: string): Promise<AuctionDTO[]> {
        const found: Auction[] = await this.auctionRepo.findByCompanyId(company_id);
        return found.map(auction => toAuctionDTO(auction));
    }

    async executeActiveAuctions(): Promise<AuctionDTO[]> {
        const found: Auction[] = await this.auctionRepo.findActiveAuctions();
        return found.map(auction => toAuctionDTO(auction));
    }

    async executeById(id: string): Promise<AuctionDTO | null> {
        const existingAuction = await this.auctionRepo.findById(id);
        if (!existingAuction) {
            return null;
        }
        return toAuctionDTO(existingAuction);
    }

    async executeAll(): Promise<AuctionDTO[]> {
        const found: Auction[] = await this.auctionRepo.findAll();
        return found.map(auction => toAuctionDTO(auction));
    }
    
    async executeCount(): Promise<number> {
        return this.auctionRepo.count();
    }

    }

