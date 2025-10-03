// cancel-auction.usecase.ts


import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { AuctionRepositoryPort } from "../../../domain/auctions/auction.repository.port";  
import type { EventRepositoryPort } from "../../../domain/events/event.repository.port";
import { AuctionDTO } from "../dto/auction.dto";
import { toAuctionDTO } from "../mappers/auction.mapper";
import { Auction } from "../../../domain/auctions/auction.entity";

@Injectable()
export class CancelAuctionUseCase {
    constructor(
        @Inject('AuctionRepositoryPort') private readonly auctionRepo: AuctionRepositoryPort,
        @Inject('EventRepositoryPort') private readonly eventRepo: EventRepositoryPort
    ) {}

    async execute(event_id: string): Promise<AuctionDTO | null> {
        const existingAuction = await this.auctionRepo.findByEventId(event_id);
        if (!existingAuction) {
            throw new NotFoundException('Auction not found for the given event_id');
        }

        if (existingAuction.status === 'cancelled') {
            throw new Error('Auction is already cancelled');
        }

        if (existingAuction.status === 'completed') {
            throw new Error('Cannot cancel a completed auction');
        }
        existingAuction.status = 'cancelled';
        await this.auctionRepo.update(existingAuction);
        return toAuctionDTO(existingAuction);
    }
    }