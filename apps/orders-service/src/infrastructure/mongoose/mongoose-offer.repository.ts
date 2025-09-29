import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';
import { OfferDocument } from './offer.schema';

@Injectable()
export class MongooseOfferRepository implements OfferRepositoryPort {
  constructor(
    @InjectModel(OfferDocument.name)
    private readonly offerModel: Model<OfferDocument>,
  ) { }

  private toDomain(offerDoc: OfferDocument): Offer {
    return new Offer(
      offerDoc.id,
      offerDoc.auction_id,
      offerDoc.company_id,
      offerDoc.price,
      offerDoc.lead_time_days,
      offerDoc.status as OfferStatus,
      offerDoc.created_at,
      offerDoc.specs_json,
    );
  }

  async save(offer: Offer): Promise<Offer> {
    const newOffer = new this.offerModel({
      auction_id: offer.auction_id,
      company_id: offer.company_id,
      price: offer.price,
      lead_time_days: offer.lead_time_days,
      status: offer.status,
      created_at: offer.created_at,
      specs_json: offer.specs_json,
    });
    const savedOffer = await newOffer.save();
    return this.toDomain(savedOffer);
  }

  async findById(id: string): Promise<Offer | null> {
    const offerDoc = await this.offerModel.findById(id).exec();
    return offerDoc ? this.toDomain(offerDoc) : null;
  }

  async findAll(): Promise<Offer[]> {
    const offerDocs = await this.offerModel.find().exec();
    return offerDocs.map((doc) => this.toDomain(doc));
  }

  async findByAuctionId(auctionId: string): Promise<Offer[]> {
    const offerDocs = await this.offerModel
      .find({ auction_id: auctionId })
      .exec();
    return offerDocs.map((doc) => this.toDomain(doc));
  }

  async findByCompanyId(companyId: string): Promise<Offer[]> {
    const offerDocs = await this.offerModel
      .find({ company_id: companyId })
      .exec();
    return offerDocs.map((doc) => this.toDomain(doc));
  }

  async findByStatus(status: OfferStatus): Promise<Offer[]> {
    const offerDocs = await this.offerModel.find({ status }).exec();
    return offerDocs.map((doc) => this.toDomain(doc));
  }

  async update(id: string, offerData: Partial<Offer>): Promise<Offer | null> {
    const updatedOffer = await this.offerModel
      .findByIdAndUpdate(id, offerData, { new: true })
      .exec();
    return updatedOffer ? this.toDomain(updatedOffer) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.offerModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
