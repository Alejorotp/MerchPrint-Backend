import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { OrdersServiceModule } from '../src/orders-service.module';

describe('Orders Service Integration Tests', () => {
  let app: INestApplication;
  let createdOfferId: string;
  let createdOrderId: string;

  beforeAll(async () => {
    process.env.DB_URI =
      'mongodb://orders_user:orders_pass@localhost:27019/orders_db_test?authSource=admin';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('Offers CRUD', () => {
    it('should create a new offer', async () => {
      const offerData = {
        auction_id: 'auction-test-123',
        company_id: 'company-test-456',
        price: 1500.0,
        lead_time_days: 10,
        specs_json: { material: 'cotton', color: 'blue', size: 'L' },
      };

      const response = await request(app.getHttpServer())
        .post('/orders/test-order-id/offers')
        .send(offerData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.auction_id).toBe(offerData.auction_id);
      expect(response.body.company_id).toBe(offerData.company_id);
      expect(response.body.price).toBe(offerData.price);
      expect(response.body.status).toBe('pending');

      createdOfferId = response.body.id;
    });

    it('should get offers by auction', async () => {
      const response = await request(app.getHttpServer())
        .get('/orders/auction/auction-test-123/offers')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('auction_id', 'auction-test-123');
    });

    it('should get offer by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/orders/offers/${createdOfferId}`)
        .expect(200);

      expect(response.body.id).toBe(createdOfferId);
      expect(response.body.status).toBe('pending');
    });
  });

  describe('Orders CRUD', () => {
    it('should accept offer and create order', async () => {
      const response = await request(app.getHttpServer())
        .put(`/orders/client/client-test-789/accept-offer/${createdOfferId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.client_id).toBe('client-test-789');
      expect(response.body.offer_id).toBe(createdOfferId);
      expect(response.body.status).toBe('in_progress');

      createdOrderId = response.body.id;
    });

    it('should get orders by client', async () => {
      const response = await request(app.getHttpServer())
        .get('/orders/client/client-test-789')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('client_id', 'client-test-789');
    });

    it('should get order by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/orders/${createdOrderId}`)
        .expect(200);

      expect(response.body.id).toBe(createdOrderId);
      expect(response.body.client_id).toBe('client-test-789');
    });

    it('should update order status', async () => {
      const response = await request(app.getHttpServer())
        .put(`/orders/${createdOrderId}/status`)
        .send({ status: 'completed' })
        .expect(200);

      expect(response.body.status).toBe('completed');
      expect(response.body.id).toBe(createdOrderId);
    });
  });

  describe('Business Logic', () => {
    it('should reject offer', async () => {
      // Crear otra oferta para rechazar
      const offerData = {
        auction_id: 'auction-test-456',
        company_id: 'company-test-789',
        price: 2000.0,
        lead_time_days: 15,
      };

      const createResponse = await request(app.getHttpServer())
        .post('/orders/test-order-id-2/offers')
        .send(offerData)
        .expect(201);

      const offerId = createResponse.body.id;

      // Rechazar la oferta
      const rejectResponse = await request(app.getHttpServer())
        .put(`/orders/offers/${offerId}/reject`)
        .expect(200);

      expect(rejectResponse.body.status).toBe('rejected');
    });

    it('should cancel order', async () => {
      // Crear nueva orden para cancelar
      const offerData = {
        auction_id: 'auction-test-789',
        company_id: 'company-test-123',
        price: 1200.0,
        lead_time_days: 8,
      };

      const offerResponse = await request(app.getHttpServer())
        .post('/orders/test-order-id-3/offers')
        .send(offerData)
        .expect(201);

      const acceptResponse = await request(app.getHttpServer())
        .put(
          `/orders/client/client-test-cancel/accept-offer/${offerResponse.body.id}`,
        )
        .expect(200);

      const orderId = acceptResponse.body.id;

      // Cancelar la orden
      const cancelResponse = await request(app.getHttpServer())
        .put(`/orders/${orderId}/cancel`)
        .expect(200);

      expect(cancelResponse.body.status).toBe('cancelled');
    });
  });
});
