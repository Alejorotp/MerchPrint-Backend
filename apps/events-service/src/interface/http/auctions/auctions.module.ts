// auctions.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from '../../../infrastructure/mongoose/auction.schema';
import { AuctionRepositoryPort } from '../../../domain/auctions/auction.repository.port';
import { MongooseAuctionRepository } from '../../../infrastructure/mongoose/mongoose-auction.repository';
import { GetAuctionUseCase } from '../../../application/auctions/usecases/get-auction.usecase';
import { CancelAuctionUseCase } from '../../../application/auctions/usecases/cancel-auction.usecase';
import { EndAuctionUseCase } from '../../../application/auctions/usecases/end-auction.usecase';
import { AUCTION_REPOSITORY, EVENT_REPOSITORY } from '../../../application/tokens';
import { InMemoryAuctionRepository } from '../../../infrastructure/in-memory/in-memory-auction.repository';
import { InMemoryEventRepository } from '../../../infrastructure/in-memory/in-memory-event.repository';
import { MongooseEventRepository } from 'apps/events-service/src/infrastructure/mongoose/mongoose-event.repository';
import { Event, EventSchema } from '../../../infrastructure/mongoose/event.schema';
import { AuctionsController } from './auctions.controller';
import { CreateAuctionUseCase } from 'apps/events-service/src/application/auctions/usecases/create-auction.usecase';
import { EventRepositoryPort } from 'apps/events-service/src/domain/events/event.repository.port';

const useMongoose = !!process.env.DB_URI;

@Module({
  imports: [
    ...(useMongoose ? [MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }])] : []),
    ...(useMongoose ? [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])] : []),
  ],
  controllers: [AuctionsController],
  providers: [
    {
      provide: AUCTION_REPOSITORY,
      useClass: useMongoose ? MongooseAuctionRepository : InMemoryAuctionRepository,
    },
    {
      provide: EVENT_REPOSITORY,
      useClass: useMongoose ? MongooseEventRepository : InMemoryEventRepository,
    },
    { provide: GetAuctionUseCase, useFactory: (repo: AuctionRepositoryPort, repo1: EventRepositoryPort ) => new GetAuctionUseCase(repo, repo1), inject: [AUCTION_REPOSITORY, EVENT_REPOSITORY] },
    { provide: CancelAuctionUseCase, useFactory: (auctionRepo: AuctionRepositoryPort, eventRepo: EventRepositoryPort) => new CancelAuctionUseCase(auctionRepo, eventRepo), inject: [AUCTION_REPOSITORY, EVENT_REPOSITORY] },
    { provide: EndAuctionUseCase, useFactory: (auctionRepo: AuctionRepositoryPort, eventRepo: EventRepositoryPort) => new EndAuctionUseCase(auctionRepo, eventRepo), inject: [AUCTION_REPOSITORY, EVENT_REPOSITORY] },
    { provide: CreateAuctionUseCase, useFactory: (repo: AuctionRepositoryPort, repo1: EventRepositoryPort) => new CreateAuctionUseCase(repo, repo1), inject: [AUCTION_REPOSITORY, EVENT_REPOSITORY] },
  ],
  exports: [
    AUCTION_REPOSITORY,
  ],
})
export class AuctionsHttpModule {}