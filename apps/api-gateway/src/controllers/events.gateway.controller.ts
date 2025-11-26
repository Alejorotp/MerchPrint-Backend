import { Controller, Get, Post, Put, Delete, Param, Body, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

function isObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

@ApiTags('Events, Auctions & Requirements')
@Controller('events')
export class EventsGatewayController {
  constructor(
    @Inject('EVENTS_SERVICE') private readonly eventsClient: ClientProxy,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  async createEvent(@Body() body: any) {
    return firstValueFrom(this.eventsClient.send('events.create', body));
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of all events.' })
  async getAllEvents() {
    return firstValueFrom(this.eventsClient.send('events.getAll', {}));
  }

  // Auction Endpoints
  @Post('auctions')
  @ApiOperation({ summary: 'Create an auction for an event' })
  @ApiResponse({ status: 201, description: 'Auction created successfully.' })
  async createAuction(@Body() body: any) {
    return firstValueFrom(this.eventsClient.send('auctions.create', body));
  }

  @Get('auctions/:id')
  @ApiOperation({ summary: 'Get an auction by ID' })
  @ApiResponse({ status: 200, description: 'Auction found.' })
  @ApiResponse({ status: 404, description: 'Auction not found.' })
  async getAuctionById(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('3Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('auctions.getById', id));
  }

  @Put('auctions/:id/cancel')
  @ApiOperation({ summary: 'Cancel an auction' })
  @ApiResponse({ status: 200, description: 'Auction cancelled successfully.' })
  @ApiResponse({ status: 404, description: 'Auction not found.' })
  async cancelAuction(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('2Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('auctions.cancel', id));
  }

  @Put('auctions/:id/end')
  @ApiOperation({ summary: 'End an auction' })
  @ApiResponse({ status: 200, description: 'Auction ended successfully.' })
  @ApiResponse({ status: 404, description: 'Auction not found.' })
  async endAuction(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('1Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('auctions.end', id));
  }

  @Get('auctions/event/:eventId')
  @ApiOperation({ summary: 'Get an auction by event ID' })
  @ApiResponse({ status: 200, description: 'Auction found.' })
  @ApiResponse({ status: 404, description: 'Auction not found.' })
  async getAuctionByEventId(@Param('eventId') eventId: string) {
    if (!isObjectId(eventId)) {
      throw new BadRequestException('Invalid eventId');
    }
    return firstValueFrom(this.eventsClient.send('auctions.getByEventId', eventId));
  }

  // Requirements Endpoints
  @Post(':eventId/requirements')
  @ApiOperation({ summary: 'Create requirements for an event' })
  @ApiResponse({ status: 201, description: 'Requirements created successfully.' })
  async createRequirements(@Param('eventId') eventId: string, @Body() body: any) {
    if (!isObjectId(eventId)) {
      throw new BadRequestException('Invalid eventId');
    }
    body.eventId = eventId;
    return firstValueFrom(this.eventsClient.send('requirements.create', body));
  }

  @Get(':eventId/requirements')
  @ApiOperation({ summary: 'Get requirements for an event' })
  @ApiResponse({ status: 200, description: 'Requirements found.' })
  @ApiResponse({ status: 404, description: 'Requirements not found.' })
  async getRequirementsByEventId(@Param('eventId') eventId: string) {
    if (!isObjectId(eventId)) {
      throw new BadRequestException('Invalid eventId');
    }
    return firstValueFrom(this.eventsClient.send('requirements.getByEventId', eventId));
  }

  @Put('requirements/:id')
  @ApiOperation({ summary: 'Update requirements by ID' })
  @ApiResponse({ status: 200, description: 'Requirements updated successfully.' })
  @ApiResponse({ status: 404, description: 'Requirements not found.' })
  async updateRequirements(@Param('id') id: string, @Body() body: any) {
    if (!isObjectId(id)) {
      throw new BadRequestException('5Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('requirements.update', { id, body }));
  }

  @Delete('requirements/:id')
  @ApiOperation({ summary: 'Delete requirements by ID' })
  @ApiResponse({ status: 200, description: 'Requirements deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Requirements not found.' })
  async deleteRequirements(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('6Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('requirements.delete', id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Event found.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getById(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('7Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('events.getById', id));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get events by user ID' })
  @ApiResponse({ status: 200, description: 'List of events for the user.' })
  async getByUserId(@Param('userId') userId: string) {
    return firstValueFrom(this.eventsClient.send('events.getByUserId', userId));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiResponse({ status: 200, description: 'Event updated successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async updateEvent(@Param('id') id: string, @Body() body: any) {
    if (!isObjectId(id)) {
      throw new BadRequestException('8Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('events.update', { id, body }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async deleteEvent(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('9Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('events.delete', id));
  }
}
