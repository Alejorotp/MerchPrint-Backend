import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuctionUseCase } from '../../application/auctions/usecases/create-auction.usecase';
import { GetAuctionUseCase } from '../../application/auctions/usecases/get-auction.usecase';
import { CancelAuctionUseCase } from '../../application/auctions/usecases/cancel-auction.usecase';
import { EndAuctionUseCase } from '../../application/auctions/usecases/end-auction.usecase';
import { toAuctionDTO } from '../../application/auctions/mappers/auction.mapper';
import { CreateAuctionDTO } from '../../application/auctions/dto/create-auction.dto';

@Controller()
export class AuctionsRmqController {
  constructor(
    private readonly createAuction: CreateAuctionUseCase,
    private readonly getAuction: GetAuctionUseCase,
    private readonly cancelAuction: CancelAuctionUseCase,
    private readonly endAuction: EndAuctionUseCase,
  ) {}

  @MessagePattern('auctions.create')
  async create(@Payload() data: CreateAuctionDTO) {
    const auction = await this.createAuction.execute(data);
    return toAuctionDTO(auction);
  }

  @MessagePattern('auctions.getById')
  async getById(@Payload() id: string) {
    const auction = await this.getAuction.execute(id);
    if (!auction) return null;
    return toAuctionDTO(auction);
  }

  @MessagePattern('auctions.cancel')
  async cancel(@Payload() id: string) {
    const auction = await this.cancelAuction.execute(id);
    if (!auction) return null;
    return toAuctionDTO(auction);
  }
  @MessagePattern('auctions.end')
  async end(@Payload() id: string) {
    const auction = await this.endAuction.execute(id);
    if (!auction) return null;
    return toAuctionDTO(auction);
  }
}
