// auctions.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { GetAuctionUseCase } from '../../../application/auctions/usecases/get-auction.usecase';
import { CancelAuctionUseCase } from '../../../application/auctions/usecases/cancel-auction.usecase';
import { EndAuctionUseCase } from '../../../application/auctions/usecases/end-auction.usecase';
import { CreateAuctionUseCase } from '../../../application/auctions/usecases/create-auction.usecase';
import { AuctionDTO } from '../../../application/auctions/dto/auction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAuctionDTO } from 'apps/events-service/src/application/auctions/dto/create-auction.dto';

@ApiTags('auctions')
@Controller('auctions')
export class AuctionsController {
  constructor(
    private readonly getAuctionUseCase: GetAuctionUseCase,
    private readonly cancelAuctionUseCase: CancelAuctionUseCase,
    private readonly endAuctionUseCase: EndAuctionUseCase,
    private readonly createAuctionUseCase: CreateAuctionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiResponse({
    status: 201,
    description: 'The auction has been successfully created.',
    type: AuctionDTO,
  })
  async create(
    @Body() body: CreateAuctionDTO,
  ) {
    try {
      if (!body.event_id) {
        throw new HttpException('event_id is required', HttpStatus.BAD_REQUEST);
      }
      if (!body.start_at) {
        throw new HttpException('start_at is required', HttpStatus.BAD_REQUEST);
      }
      if (!body.end_at) {
        throw new HttpException('end_at is required', HttpStatus.BAD_REQUEST);
      }
      if (!body.suggested_price) {
        throw new HttpException('suggested_price is required', HttpStatus.BAD_REQUEST);
      }

      const auction = await this.createAuctionUseCase.execute(body);
      if (!auction) {
        throw new HttpException('Auction could not be created', HttpStatus.BAD_REQUEST);
      }
      return auction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('event/:event_id')
  @ApiOperation({ summary: 'Get auction by event ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully retrieved.',
    type: AuctionDTO,
  })
  async getAuctionByEventId(
    @Param('event_id') event_id: string,
  ): Promise<AuctionDTO> {
    try {
      const auction = await this.getAuctionUseCase.execute(event_id);
      if (!auction) {
        throw new HttpException('Auction not found', HttpStatus.NOT_FOUND);
      }
      return auction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('company/:company_id')
  @ApiOperation({ summary: 'Get auctions by company ID' })
  @ApiResponse({
    status: 200,
    description: 'The auctions have been successfully retrieved.',
    type: [AuctionDTO],
  })
  async getAuctionsByCompanyId(
    @Param('company_id') company_id: string,
  ): Promise<AuctionDTO[]> {
    try {
      return await this.getAuctionUseCase.executeByCompanyId(company_id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active auctions' })
  @ApiResponse({
    status: 200,
    description: 'The active auctions have been successfully retrieved.',
    type: [AuctionDTO],
  })
  async getActiveAuctions(): Promise<AuctionDTO[]> {
    try {
      return await this.getAuctionUseCase.executeActiveAuctions();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully retrieved.',
    type: AuctionDTO,
  })
  async getAuctionById(@Param('id') id: string): Promise<AuctionDTO> {
    try {
      const auction = await this.getAuctionUseCase.executeById(id);
      if (!auction) {
        throw new HttpException('Auction not found', HttpStatus.NOT_FOUND);
      }
      return auction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all auctions' })
  @ApiResponse({
    status: 200,
    description: 'The auctions have been successfully retrieved.',
    type: [AuctionDTO],
  })
  async getAllAuctions(): Promise<AuctionDTO[]> {
    try {
      return await this.getAuctionUseCase.executeAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('count/total')
  @ApiOperation({ summary: 'Get total count of auctions' })
  @ApiResponse({
    status: 200,
    description: 'The total count of auctions has been successfully retrieved.',
    type: Number,
  })
  async getTotalAuctionsCount(): Promise<number> {
    try {
      return await this.getAuctionUseCase.executeCount();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('cancel/:event_id')
  @ApiOperation({ summary: 'Cancel auction by event ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully cancelled.',
    type: AuctionDTO,
  })
  async cancelAuction(
    @Param('event_id') event_id: string,
  ): Promise<AuctionDTO | null> {
    try {
      const cancelledAuction = await this.cancelAuctionUseCase.execute(event_id);
      return cancelledAuction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('end/:event_id')
  @ApiOperation({ summary: 'End auction by event ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully ended.',
    type: AuctionDTO,
  })
  async endAuction(
    @Param('event_id') event_id: string,
  ): Promise<AuctionDTO | null> {
    try {
      return await this.endAuctionUseCase.execute(event_id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:event_id')
  @ApiOperation({ summary: 'Delete auction by event ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully deleted.',
  })
  async deleteAuctionByEventId(
    @Param('event_id') event_id: string,
  ): Promise<void> {
    try {
      const existingAuction = await this.getAuctionUseCase.execute(event_id);
      if (!existingAuction) {
        throw new HttpException('Auction not found', HttpStatus.NOT_FOUND);
      }
      await this.getAuctionUseCase['auctionRepo'].deleteByEventId(event_id);
      return;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete auction by ID' })
  @ApiResponse({
    status: 200,
    description: 'The auction has been successfully deleted.',
  })
  async deleteAuctionById(@Param('id') id: string): Promise<void> {
    try {
      const existingAuction = await this.getAuctionUseCase.executeById(id);
      if (!existingAuction) {
        throw new HttpException('Auction not found', HttpStatus.NOT_FOUND);
      }
      await this.getAuctionUseCase['auctionRepo'].deleteById(id);
      return;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
