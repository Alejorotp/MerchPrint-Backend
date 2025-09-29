import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrderUseCase } from '../../../application/usecases/create-order.usecase';
import { CreateOfferUseCase } from '../../../application/usecases/create-offer.usecase';
import { AcceptOfferUseCase } from '../../../application/usecases/accept-offer.usecase';
import { GetOrderByIdUseCase } from '../../../application/usecases/get-order-by-id.usecase';
import { GetOrdersByClientUseCase } from '../../../application/usecases/get-orders-by-client.usecase';
import { GetOffersByAuctionUseCase } from '../../../application/usecases/get-offers-by-auction.usecase';
import { UpdateOrderStatusUseCase } from '../../../application/usecases/update-order-status.usecase';
import { GetOfferByIdUseCase } from '../../../application/usecases/get-offer-by-id.usecase';
import { RejectOfferUseCase } from '../../../application/usecases/reject-offer.usecase';
import { CancelOrderUseCase } from '../../../application/usecases/cancel-order.usecase';
import { GetOffersByCompanyUseCase } from '../../../application/usecases/get-offers-by-company.usecase';
import { DeleteOrderUseCase } from '../../../application/usecases/delete-order.usecase';
import { UpdateOfferUseCase } from '../../../application/usecases/update-offer.usecase';
import { DeleteOfferUseCase } from '../../../application/usecases/delete-offer.usecase';
import {
  ORDER_REPOSITORY,
  OFFER_REPOSITORY,
} from '../../../application/tokens';
import { MongooseOrderRepository } from '../../../infrastructure/mongoose/mongoose-order.repository';
import { MongooseOfferRepository } from '../../../infrastructure/mongoose/mongoose-offer.repository';
import { InMemoryOrderRepository } from '../../../infrastructure/in-memory/in-memory-order.repository';
import { InMemoryOfferRepository } from '../../../infrastructure/in-memory/in-memory-offer.repository';
import {
  OrderDocument,
  OrderSchema,
} from '../../../infrastructure/mongoose/order.schema';
import {
  OfferDocument,
  OfferSchema,
} from '../../../infrastructure/mongoose/offer.schema';
import { OrdersController } from './orders.controller';

const useMongoose = !!process.env.DB_URI;

@Module({
  imports: [
    ...(useMongoose
      ? [
          MongooseModule.forFeature([
            { name: OrderDocument.name, schema: OrderSchema },
            { name: OfferDocument.name, schema: OfferSchema },
          ]),
        ]
      : []),
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
      useFactory: (orderRepo: any, offerRepo: any) =>
        new AcceptOfferUseCase(orderRepo, offerRepo),
      inject: [ORDER_REPOSITORY, OFFER_REPOSITORY],
    },
    {
      provide: GetOrderByIdUseCase,
      useFactory: (orderRepo: any) => new GetOrderByIdUseCase(orderRepo),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: GetOrdersByClientUseCase,
      useFactory: (orderRepo: any) => new GetOrdersByClientUseCase(orderRepo),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: GetOffersByAuctionUseCase,
      useFactory: (offerRepo: any) => new GetOffersByAuctionUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
    {
      provide: UpdateOrderStatusUseCase,
      useFactory: (orderRepo: any) => new UpdateOrderStatusUseCase(orderRepo),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: GetOfferByIdUseCase,
      useFactory: (offerRepo: any) => new GetOfferByIdUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
    {
      provide: RejectOfferUseCase,
      useFactory: (offerRepo: any) => new RejectOfferUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
    {
      provide: CancelOrderUseCase,
      useFactory: (orderRepo: any) => new CancelOrderUseCase(orderRepo),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: GetOffersByCompanyUseCase,
      useFactory: (offerRepo: any) => new GetOffersByCompanyUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
    {
      provide: DeleteOrderUseCase,
      useFactory: (orderRepo: any) => new DeleteOrderUseCase(orderRepo),
      inject: [ORDER_REPOSITORY],
    },
    {
      provide: UpdateOfferUseCase,
      useFactory: (offerRepo: any) => new UpdateOfferUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
    {
      provide: DeleteOfferUseCase,
      useFactory: (offerRepo: any) => new DeleteOfferUseCase(offerRepo),
      inject: [OFFER_REPOSITORY],
    },
  ],
})
export class OrdersHttpModule {}
