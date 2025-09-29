// event.module.ts

import {Delete, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CreateEventUseCase} from '../../../application/events/usecases/create-event.usecase';
import {EVENT_REPOSITORY} from '../../../application/tokens';
import {MongooseEventRepository} from '../../../infrastructure/mongoose/mongoose-event.repository';
import {InMemoryEventRepository} from '../../../infrastructure/in-memory/in-memory-event.repository';
import {Event, EventSchema} from '../../../infrastructure/mongoose/event.schema';
import {EventsController} from './events.controller'; 
import {GetEventsUseCase} from '../../../application/events/usecases/get-events.usecase';
import {UpdateEventUseCase} from 'apps/events-service/src/application/events/usecases/update-event.usecase';
import {DeleteEventUseCase} from 'apps/events-service/src/application/events/usecases/delete-event.usecase';

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
        {provide: GetEventsUseCase, useFactory: (repo: any) => new GetEventsUseCase(repo), inject: [EVENT_REPOSITORY]},
        {provide: UpdateEventUseCase, useFactory: (repo: any) => new UpdateEventUseCase(repo), inject: [EVENT_REPOSITORY]},
        {provide: DeleteEventUseCase, useFactory: (repo: any) => new DeleteEventUseCase(repo), inject: [EVENT_REPOSITORY]}, 
    ],
})
export class EventsHttpModule {}

