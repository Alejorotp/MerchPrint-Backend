// auction.mapper.ts


import { Auction } from "../../../domain/auctions/auction.entity";
import { AuctionDTO } from "../dto/auction.dto";


export const toAuctionDTO = (auction: Auction): AuctionDTO => ({
    id: auction.id ?? '',
    event_id: auction.event_id,
    status: auction.status,
    start_at: auction.start_at,
    end_at: auction.end_at,
    suggested_price: auction.suggested_price,
});
    