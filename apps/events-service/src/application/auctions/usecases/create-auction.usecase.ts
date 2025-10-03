// create-auction.usecase.ts

import { randomUUID } from 'crypto';
import { Auction } from '../../../domain/auctions/auction.entity';
import { AuctionRepositoryPort } from '../../../domain/auctions/auction.repository.port';
import { CreateAuctionDTO } from '../dto/create-auction.dto';
import { toAuctionDTO } from '../mappers/auction.mapper';
import { AuctionDTO as auctionDTO} from '../dto/auction.dto';
import { EventRepositoryPort } from '../../../domain/events/event.repository.port';

export class CreateAuctionUseCase {
    constructor(
        private readonly auctionRepo: AuctionRepositoryPort,
        private readonly eventRepo: EventRepositoryPort
    ) {}
    async execute(input: CreateAuctionDTO): Promise<auctionDTO> {
        const eventExists = await this.eventRepo.findById(input.event_id);
        if (!eventExists) throw new Error('Event does not exist');
        const auction = new Auction(
            randomUUID(),
            input.event_id,
            'pending',
            new Date(input.start_at),
            new Date(input.end_at),
            input.suggested_price,
            input.company_id ? input.company_id : ''
        );
        const savedAuction = await this.auctionRepo.save(auction);
        return toAuctionDTO(savedAuction);
    }

}



