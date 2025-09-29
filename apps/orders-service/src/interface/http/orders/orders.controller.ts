import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../../application/usecases/create-order.usecase';
import { CreateOfferUseCase } from '../../../application/usecases/create-offer.usecase';
import { AcceptOfferUseCase } from '../../../application/usecases/accept-offer.usecase';
import type { CreateOrderDTO } from '../../../application/dto/create-order.dto';
import type { CreateOfferDTO } from '../../../application/dto/create-offer.dto';
import { OrderMapper } from '../../../application/mappers/order.mapper';
import { OfferMapper } from '../../../application/mappers/offer.mapper';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly createOfferUseCase: CreateOfferUseCase,
        private readonly acceptOfferUseCase: AcceptOfferUseCase,
    ) { }

    @Post()
    async createOrder(@Body() body: CreateOrderDTO) {
        if (!body?.client_id) {
            throw new Error('client_id is required');
        }
        const order = await this.createOrderUseCase.execute(body);
        return OrderMapper.toDTO(order);
    }

    @Post(':orderId/offers')
    async createOffer(
        @Param('orderId') orderId: string,
        @Body() body: CreateOfferDTO,
    ) {
        if (!body?.auction_id || !body?.company_id || !body?.price) {
            throw new Error('auction_id, company_id and price are required');
        }
        const offer = await this.createOfferUseCase.execute(body);
        return OfferMapper.toDTO(offer);
    }

    @Put(':orderId/accept-offer/:offerId')
    async acceptOffer(
        @Param('orderId') orderId: string,
        @Param('offerId') offerId: string,
    ) {
        const order = await this.acceptOfferUseCase.execute(orderId, offerId);
        return OrderMapper.toDTO(order);
    }
}