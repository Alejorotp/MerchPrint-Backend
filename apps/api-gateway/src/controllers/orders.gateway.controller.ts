import { Controller, Get, Post, Put, Delete, Param, Body, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

function isObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

@ApiTags('Orders & Offers')
@Controller()
export class OrdersGatewayController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}

  // Orders Endpoints
  @Post('orders')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  async createOrder(@Body() body: any) {
    return firstValueFrom(this.ordersClient.send('orders.create', body));
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async getOrderById(@Param('id') id: string) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid order id');
    return firstValueFrom(this.ordersClient.send('orders.getById', id));
  }

  @Get('clients/:clientId/orders')
  @ApiOperation({ summary: 'Get all orders for a client' })
  @ApiResponse({ status: 200, description: 'List of orders for the client.' })
  async getOrdersByClient(@Param('clientId') clientId: string) {
    if (!isObjectId(clientId)) throw new BadRequestException('Invalid client id');
    return firstValueFrom(this.ordersClient.send('orders.getByClientId', clientId));
  }

  @Put('orders/:id/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async updateOrderStatus(@Param('id') id: string, @Body() body: any) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid order id');
    return firstValueFrom(this.ordersClient.send('orders.updateStatus', { id, body }));
  }

  @Put('orders/:id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async cancelOrder(@Param('id') id: string) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid order id');
    return firstValueFrom(this.ordersClient.send('orders.cancel', id));
  }

  @Delete('orders/:id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async deleteOrder(@Param('id') id: string) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid order id');
    return firstValueFrom(this.ordersClient.send('orders.delete', id));
  }

  // Offers Endpoints
  @Post('offers')
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully.' })
  async createOffer(@Body() body: any) {
    return firstValueFrom(this.ordersClient.send('offers.create', body));
  }

  @Get('offers/:id')
  @ApiOperation({ summary: 'Get an offer by ID' })
  @ApiResponse({ status: 200, description: 'Offer found.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async getOfferById(@Param('id') id: string) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid offer id');
    return firstValueFrom(this.ordersClient.send('offers.getById', id));
  }

  @Get('auctions/:auctionId/offers')
  @ApiOperation({ summary: 'Get all offers for an auction' })
  @ApiResponse({ status: 200, description: 'List of offers for the auction.' })
  async getOffersByAuction(@Param('auctionId') auctionId: string) {
    if (!isObjectId(auctionId)) throw new BadRequestException('Invalid auction id');
    return firstValueFrom(this.ordersClient.send('offers.getByAuctionId', auctionId));
  }

  @Get('companies/:companyId/offers')
  @ApiOperation({ summary: 'Get all offers by a company' })
  @ApiResponse({ status: 200, description: 'List of offers by the company.' })
  async getOffersByCompany(@Param('companyId') companyId: string) {
    if (!isObjectId(companyId)) throw new BadRequestException('Invalid company id');
    return firstValueFrom(this.ordersClient.send('offers.getByCompanyId', companyId));
  }

  @Put('offers/:id')
  @ApiOperation({ summary: 'Update an offer' })
  @ApiResponse({ status: 200, description: 'Offer updated successfully.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async updateOffer(@Param('id') id: string, @Body() body: any) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid offer id');
    return firstValueFrom(this.ordersClient.send('offers.update', { id, body }));
  }

  @Delete('offers/:id')
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiResponse({ status: 200, description: 'Offer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async deleteOffer(@Param('id') id: string) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid offer id');
    return firstValueFrom(this.ordersClient.send('offers.delete', id));
  }

  @Post('offers/accept')
  @ApiOperation({ summary: 'Accept an offer' })
  @ApiResponse({ status: 201, description: 'Offer accepted and order created.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async acceptOffer(@Body() body: any) {
    if (!isObjectId(body.offerId)) throw new BadRequestException('Invalid offer id');
    return firstValueFrom(this.ordersClient.send('offers.accept', { clientID: body.clientId, offerId: body.offerId }));
  }

  @Post('offers/:id/reject')
  @ApiOperation({ summary: 'Reject an offer' })
  @ApiResponse({ status: 200, description: 'Offer rejected successfully.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async rejectOffer(@Param('id') id: string, @Body() body: any) {
    if (!isObjectId(id)) throw new BadRequestException('Invalid offer id');
    return firstValueFrom(this.ordersClient.send('offers.reject', { id, body }));
  }
}
