import { Module } from '@nestjs/common';
import { EventsServiceController } from './events-service.controller';
import { EventsServiceService } from './events-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsHttpModule } from './interface/http/events/event.module';
import { RequirementsHttpModule } from './interface/http/requirements/requirements.module';
import { AuctionsHttpModule } from './interface/http/auctions/auctions.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI!),
    EventsHttpModule,
    RequirementsHttpModule,
    AuctionsHttpModule,
  ],
  controllers: [EventsServiceController],
  providers: [EventsServiceService],
})
export class EventsServiceModule {}
