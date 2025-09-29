import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersHttpModule } from './interface/http/users/users.module';
import { RolesHttpModule } from './interface/http/roles/roles.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI!),
    UsersHttpModule,
    RolesHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
