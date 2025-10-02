import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
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
import { CreateOrderDTO } from '../../../application/dto/create-order.dto';
import {
  CreateOfferDTO,
  OfferDTO,
} from '../../../application/dto/create-offer.dto';
import { UpdateOrderStatusDTO } from '../../../application/dto/update-order-status.dto';
import { UpdateOfferDTO } from '../../../application/dto/update-offer.dto';
import { OrderDTO } from '../../../application/dto/order.dto';
import { OrderMapper } from '../../../application/mappers/order.mapper';
import { OfferMapper } from '../../../application/mappers/offer.mapper';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly createOfferUseCase: CreateOfferUseCase,
    private readonly acceptOfferUseCase: AcceptOfferUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly getOrdersByClientUseCase: GetOrdersByClientUseCase,
    private readonly getOffersByAuctionUseCase: GetOffersByAuctionUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private readonly getOfferByIdUseCase: GetOfferByIdUseCase,
    private readonly rejectOfferUseCase: RejectOfferUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly getOffersByCompanyUseCase: GetOffersByCompanyUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly updateOfferUseCase: UpdateOfferUseCase,
    private readonly deleteOfferUseCase: DeleteOfferUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({ type: CreateOrderDTO })
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente',
    type: OrderDTO,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async createOrder(@Body() body: CreateOrderDTO) {
    if (!body?.client_id) {
      throw new Error('client_id is required');
    }
    const order = await this.createOrderUseCase.execute(body);
    return OrderMapper.toDTO(order);
  }

  @Post(':orderId/offers')
  @ApiOperation({ summary: 'Crear una nueva oferta para una orden' })
  @ApiParam({
    name: 'orderId',
    description: 'ID de la orden',
  })
  @ApiBody({ type: CreateOfferDTO })
  @ApiResponse({
    status: 201,
    description: 'Oferta creada exitosamente',
    type: OfferDTO,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
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

  @Put('client/:clientId/accept-offer/:offerId')
  async acceptOffer(
    @Param('clientId') clientId: string,
    @Param('offerId') offerId: string,
  ) {
    const order = await this.acceptOfferUseCase.execute(clientId, offerId);
    return OrderMapper.toDTO(order);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiParam({
    name: 'orderId',
    description: 'ID de la orden',
  })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: OrderDTO })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async getOrderById(@Param('orderId') orderId: string) {
    const order = await this.getOrderByIdUseCase.execute(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return OrderMapper.toDTO(order);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Obtener todas las órdenes de un cliente' })
  @ApiParam({
    name: 'clientId',
    description: 'ID del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes del cliente',
    type: [OrderDTO],
  })
  async getOrdersByClient(@Param('clientId') clientId: string) {
    const orders = await this.getOrdersByClientUseCase.execute(clientId);
    return OrderMapper.toDTOList(orders);
  }

  @Get('auction/:auctionId/offers')
  @ApiOperation({ summary: 'Obtener todas las ofertas de una subasta' })
  @ApiParam({
    name: 'auctionId',
    description: 'ID de la subasta',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de ofertas de la subasta',
    type: [OfferDTO],
  })
  async getOffersByAuction(@Param('auctionId') auctionId: string) {
    const offers = await this.getOffersByAuctionUseCase.execute(auctionId);
    return OfferMapper.toDTOList(offers);
  }

  @Put(':orderId/status')
  @ApiOperation({ summary: 'Actualizar el estado de una orden' })
  @ApiParam({
    name: 'orderId',
    description: 'ID de la orden',
  })
  @ApiBody({ type: UpdateOrderStatusDTO })
  @ApiResponse({
    status: 200,
    description: 'Estado de la orden actualizado',
    type: OrderDTO,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderStatusDTO,
  ) {
    if (!body?.status) {
      throw new Error('status is required');
    }
    const order = await this.updateOrderStatusUseCase.execute(orderId, body);
    return OrderMapper.toDTO(order);
  }

  @Get('offers/:offerId')
  @ApiOperation({ summary: 'Obtener una oferta por ID' })
  @ApiParam({
    name: 'offerId',
    description: 'ID de la oferta',
  })
  @ApiResponse({
    status: 200,
    description: 'Oferta encontrada',
    type: OfferDTO,
  })
  @ApiResponse({ status: 404, description: 'Oferta no encontrada' })
  async getOfferById(@Param('offerId') offerId: string) {
    const offer = await this.getOfferByIdUseCase.execute(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }
    return OfferMapper.toDTO(offer);
  }

  @Put('offers/:offerId/reject')
  async rejectOffer(@Param('offerId') offerId: string) {
    const offer = await this.rejectOfferUseCase.execute(offerId);
    return OfferMapper.toDTO(offer);
  }

  @Put(':orderId/cancel')
  async cancelOrder(@Param('orderId') orderId: string) {
    const order = await this.cancelOrderUseCase.execute(orderId);
    return OrderMapper.toDTO(order);
  }

  @Get('company/:companyId/offers')
  async getOffersByCompany(@Param('companyId') companyId: string) {
    const offers = await this.getOffersByCompanyUseCase.execute(companyId);
    return OfferMapper.toDTOList(offers);
  }

  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: string) {
    await this.deleteOrderUseCase.execute(orderId);
    return { message: 'Order deleted successfully' };
  }

  @Put('offers/:offerId')
  async updateOffer(
    @Param('offerId') offerId: string,
    @Body() body: UpdateOfferDTO,
  ) {
    const offer = await this.updateOfferUseCase.execute(offerId, body);
    return OfferMapper.toDTO(offer);
  }

  @Delete('offers/:offerId')
  async deleteOffer(@Param('offerId') offerId: string) {
    await this.deleteOfferUseCase.execute(offerId);
    return { message: 'Offer deleted successfully' };
  }
}
