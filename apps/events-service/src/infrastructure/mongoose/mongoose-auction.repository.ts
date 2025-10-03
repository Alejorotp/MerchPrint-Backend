// mongoose-auction.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction, AuctionDocument } from './auction.schema';
import { AuctionRepositoryPort } from '../../domain/auctions/auction.repository.port';
import { Auction as AuctionEntity } from '../../domain/auctions/auction.entity';

@Injectable()
export class MongooseAuctionRepository implements AuctionRepositoryPort {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>
  ) {}

  async save(auction: AuctionEntity): Promise<AuctionEntity> {
    const created = new this.auctionModel(auction);
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async findById(id: string): Promise<AuctionEntity | null> {
    const found = await this.auctionModel.findOne({ id }).exec();
    return found ? this.toEntity(found) : null;
  }

  async findAll(): Promise<AuctionEntity[]> {
    const auctions = await this.auctionModel.find().exec();
    return auctions.map(a => this.toEntity(a));
  }

  async existsByEventId(event_id: string): Promise<boolean> {
    const count = await this.auctionModel.countDocuments({ event_id }).exec();
    return count > 0;
  }

  async findByEventId(event_id: string): Promise<AuctionEntity | null> {
    const found = await this.auctionModel.findOne({ event_id }).exec();
    return found ? this.toEntity(found) : null;
  }

  async deleteByEventId(event_id: string): Promise<void> {
    await this.auctionModel.deleteOne({ event_id }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.auctionModel.deleteOne({ id }).exec();
  }

  async update(auction: AuctionEntity): Promise<AuctionEntity> {
    const updated = await this.auctionModel.findOneAndUpdate(
      { id: auction.id },
      {
        event_id: auction.event_id,
        status: auction.status,
        start_at: auction.start_at,
        end_at: auction.end_at,
        suggested_price: auction.suggested_price,
        company_id: auction.company_id,
      },
      { new: true }
    ).exec();
    if (!updated) throw new Error('Auction not found');
    return this.toEntity(updated);
  }

  async count(): Promise<number> {
    return this.auctionModel.countDocuments().exec();
  }

  async findByCompanyId(company_id: string): Promise<AuctionEntity[]> {
    const auctions = await this.auctionModel.find({ company_id }).exec();
    return auctions.map(a => this.toEntity(a));
  }

  async findActiveAuctions(): Promise<AuctionEntity[]> {
    const auctions = await this.auctionModel.find({ status: 'active' }).exec();
    return auctions.map(a => this.toEntity(a));
  }

  private toEntity(doc: Auction): AuctionEntity {
    return new AuctionEntity(
      doc.id,
      doc.event_id,
      doc.status,
      doc.start_at,
      doc.end_at,
      doc.suggested_price,
      doc.company_id
    );
  }
}