import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersHttpModule } from './interface/http/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_URI ||
      'mongodb://orders_user:orders_pass@localhost:27019/orders_db?authSource=admin',
    ),
    OrdersHttpModule,
  ],
  controllers: [],
  providers: [],
})
export class OrdersServiceModule { }
