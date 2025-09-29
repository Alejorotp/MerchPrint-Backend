// event.module.ts

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CreateEventUseCase} from '../../../application/events/usecases/create-event.usecase';
import {EVENT_REPOSITORY} from '../../../application/tokens';
import {MongooseEventRepository} from '../../../infrastructure/mongoose/mongoose-event.repository';
import {InMemoryEventRepository} from '../../../infrastructure/in-memory/in-memory-event.repository';
import {Event, EventSchema} from '../../../infrastructure/mongoose/event.schema';
import {EventsController} from './events.controller'; 

const useMongoose = !!process.env.DB_URI;

@Module({
    imports: [
        ...(useMongoose ? [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])] : []),
    ],
    controllers: [EventsController],
    providers: [
        {
            provide: EVENT_REPOSITORY,
            useClass: useMongoose ? MongooseEventRepository : InMemoryEventRepository,
        },
        {provide: CreateEventUseCase, useFactory: (repo: any) => new CreateEventUseCase(repo), inject: [EVENT_REPOSITORY]},
    ],
})
export class EventsHttpModule {}

