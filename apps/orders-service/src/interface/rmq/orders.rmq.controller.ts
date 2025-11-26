import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, ClientProxy } from '@nestjs/microservices';
import { AcceptOfferUseCase } from '../../application/usecases/accept-offer.usecase';
import { CancelOrderUseCase } from '../../application/usecases/cancel-order.usecase';
import { CreateOfferUseCase } from '../../application/usecases/create-offer.usecase';
import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { DeleteOfferUseCase } from '../../application/usecases/delete-offer.usecase';
import { DeleteOrderUseCase } from '../../application/usecases/delete-order.usecase';
import { GetOfferByIdUseCase } from '../../application/usecases/get-offer-by-id.usecase';
import { GetOffersByAuctionUseCase } from '../../application/usecases/get-offers-by-auction.usecase';
import { GetOffersByCompanyUseCase } from '../../application/usecases/get-offers-by-company.usecase';
import { GetOrderByIdUseCase } from '../../application/usecases/get-order-by-id.usecase';
import { GetOrdersByClientUseCase } from '../../application/usecases/get-orders-by-client.usecase';
import { RejectOfferUseCase } from '../../application/usecases/reject-offer.usecase';
import { UpdateOfferUseCase } from '../../application/usecases/update-offer.usecase';
import { UpdateOrderStatusUseCase } from '../../application/usecases/update-order-status.usecase';
import { GenerateAIImageUseCase } from '../../application/usecases/generate-ai-image.usecase';
import { GetOrderByOfferIdUseCase } from '../../application/usecases/get-order-by-offer-id.usecase';
import { OrderMapper } from '../../application/mappers/order.mapper';
import { OfferMapper } from '../../application/mappers/offer.mapper';
import { CreateOrderDTO } from '../../application/dto/create-order.dto';
import { CreateOfferDTO } from '../../application/dto/create-offer.dto';
import { UpdateOrderStatusDTO } from '../../application/dto/update-order-status.dto';
import { UpdateOfferDTO } from '../../application/dto/update-offer.dto';
import { RejectOfferDTO } from '../../application/dto/reject-offer.dto';

@Controller()
export class OrdersRmqController {
  constructor(
    // Order Use Cases
    private readonly createOrder: CreateOrderUseCase,
    private readonly getOrderById: GetOrderByIdUseCase,
    private readonly getOrdersByClient: GetOrdersByClientUseCase,
    private readonly updateOrderStatus: UpdateOrderStatusUseCase,
    private readonly cancelOrder: CancelOrderUseCase,
    private readonly deleteOrder: DeleteOrderUseCase,
    // Offer Use Cases
    private readonly createOffer: CreateOfferUseCase,
    private readonly getOfferById: GetOfferByIdUseCase,
    private readonly getOffersByAuction: GetOffersByAuctionUseCase,
    private readonly getOffersByCompany: GetOffersByCompanyUseCase,
    private readonly updateOffer: UpdateOfferUseCase,
    private readonly deleteOffer: DeleteOfferUseCase,
    private readonly acceptOffer: AcceptOfferUseCase,
    private readonly rejectOffer: RejectOfferUseCase,
    private readonly generateAIImage: GenerateAIImageUseCase,
    private readonly getOrderByOfferId: GetOrderByOfferIdUseCase,
    @Inject('EVENTS_SERVICE') private readonly eventsClient: ClientProxy,
  ) { }

  // Order Patterns
  @MessagePattern('orders.create')
  async handleCreateOrder(@Payload() data: CreateOrderDTO) {
    const order = await this.createOrder.execute(data);
    return OrderMapper.toDTO(order);
  }

  @MessagePattern('orders.getById')
  async handleGetOrderById(@Payload() id: string) {
    const order = await this.getOrderById.execute(id);
    return order ? OrderMapper.toDTO(order) : null;
  }

  @MessagePattern('orders.getByClientId')
  async handleGetOrdersByClient(@Payload() clientId: string) {
    const orders = await this.getOrdersByClient.execute(clientId);
    return orders.map(OrderMapper.toDTO);
  }

  @MessagePattern('orders.updateStatus')
  async handleUpdateOrderStatus(@Payload() data: { id: string; body: UpdateOrderStatusDTO }) {
    const order = await this.updateOrderStatus.execute(data.id, data.body);
    return OrderMapper.toDTO(order);
  }

  @MessagePattern('orders.cancel')
  async handleCancelOrder(@Payload() id: string) {
    const order = await this.cancelOrder.execute(id);
    return OrderMapper.toDTO(order);
  }

  @MessagePattern('orders.delete')
  async handleDeleteOrder(@Payload() id: string) {
    await this.deleteOrder.execute(id);
    return { message: 'Order deleted successfully' };
  }

  @MessagePattern('orders.generateAIImage')
  async handleGenerateAIImage(@Payload() prompt: string) {
    const { mime, data } = await this.generateAIImage.execute(prompt);
    return { mime, data: data.toString('base64') };
  }

  @MessagePattern('orders.getByOfferId')
  async handleGetOrderByOfferId(@Payload() offerId: string) {
    const order = await this.getOrderByOfferId.execute(offerId);
    return order ? OrderMapper.toDTO(order) : null;
  }

  // Offer Patterns
  @MessagePattern('offers.create')
  async handleCreateOffer(@Payload() data: CreateOfferDTO) {
    const offer = await this.createOffer.execute(data);
    return OfferMapper.toDTO(offer);
  }

  @MessagePattern('offers.getById')
  async handleGetOfferById(@Payload() id: string) {
    const offer = await this.getOfferById.execute(id);
    return offer ? OfferMapper.toDTO(offer) : null;
  }

  @MessagePattern('offers.getByAuctionId')
  async handleGetOffersByAuction(@Payload() auctionId: string) {
    const offers = await this.getOffersByAuction.execute(auctionId);
    return offers.map(OfferMapper.toDTO);
  }

  @MessagePattern('offers.getByCompanyId')
  async handleGetOffersByCompany(@Payload() companyId: string) {
    const offers = await this.getOffersByCompany.execute(companyId);
    return offers.map(OfferMapper.toDTO);
  }

  @MessagePattern('offers.update')
  async handleUpdateOffer(@Payload() data: { id: string; body: UpdateOfferDTO }) {
    const offer = await this.updateOffer.execute(data.id, data.body);
    return OfferMapper.toDTO(offer);
  }

  @MessagePattern('offers.delete')
  async handleDeleteOffer(@Payload() id: string) {
    await this.deleteOffer.execute(id);
    return { message: 'Offer deleted successfully' };
  }

  @MessagePattern('offers.accept')
  async handleAcceptOffer(@Payload() data: { clientID: string; offerId: string }) {
    if (!data.clientID || !data.offerId) {
      throw new Error('clientID and offerId must be provided');
    }

    // Get offer to find auctionId
    const offer = await this.getOfferById.execute(data.offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    const order = await this.acceptOffer.execute(data.clientID, data.offerId);

    // End the auction
    this.eventsClient.emit('auctions.end', offer.auction_id);

    return OrderMapper.toDTO(order);
  }

  @MessagePattern('offers.reject')
  async handleRejectOffer(@Payload() data: { id: string; body: RejectOfferDTO }) {
    const offer = await this.rejectOffer.execute(data.id);
    return OfferMapper.toDTO(offer);
  }
}
