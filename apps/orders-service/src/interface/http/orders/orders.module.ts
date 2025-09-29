import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrderUseCase } from '../../../application/usecases/create-order.usecase';
import { CreateOfferUseCase } from '../../../application/usecases/create-offer.usecase';
import { AcceptOfferUseCase } from '../../../application/usecases/accept-offer.usecase';
import { ORDER_REPOSITORY, OFFER_REPOSITORY } from '../../../application/tokens';
import { MongooseOrderRepository } from '../../../infrastructure/mongoose/mongoose-order.repository';
import { MongooseOfferRepository } from '../../../infrastructure/mongoose/mongoose-offer.repository';
import { InMemoryOrderRepository } from '../../../infrastructure/in-memory/in-memory-order.repository';
import { InMemoryOfferRepository } from '../../../infrastructure/in-memory/in-memory-offer.repository';
import { OrderDocument, OrderSchema } from '../../../infrastructure/mongoose/order.schema';
import { OfferDocument, OfferSchema } from '../../../infrastructure/mongoose/offer.schema';
import { OrdersController } from './orders.controller';

const useMongoose = !!process.env.DB_URI;

@Module({
    imports: [
        ...(useMongoose ? [
            MongooseModule.forFeature([
                { name: OrderDocument.name, schema: OrderSchema },
                { name: OfferDocument.name, schema: OfferSchema },
            ])
        ] : []),
    ],
    controllers: [OrdersController],
    providers: [
        {
            provide: ORDER_REPOSITORY,
            useClass: useMongoose ? MongooseOrderRepository : InMemoryOrderRepository,
        },
        {
            provide: OFFER_REPOSITORY,
            useClass: useMongoose ? MongooseOfferRepository : InMemoryOfferRepository,
        },
        {
            provide: CreateOrderUseCase,
            useFactory: (orderRepo: any) => new CreateOrderUseCase(orderRepo),
            inject: [ORDER_REPOSITORY],
        },
        {
            provide: CreateOfferUseCase,
            useFactory: (offerRepo: any) => new CreateOfferUseCase(offerRepo),
            inject: [OFFER_REPOSITORY],
        },
        {
            provide: AcceptOfferUseCase,
            useFactory: (orderRepo: any, offerRepo: any) => new AcceptOfferUseCase(orderRepo, offerRepo),
            inject: [ORDER_REPOSITORY, OFFER_REPOSITORY],
        },
    ],
})
export class OrdersHttpModule { }
