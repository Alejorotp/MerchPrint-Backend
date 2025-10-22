import request from 'supertest';

// La URL base del API Gateway, obtenida de una variable de entorno.
// El valor por defecto es para ejecuciones locales fuera de Docker.
const BASE_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('Integration Flows (E2E)', () => {
  // IDs que se generarán y usarán a lo largo de la prueba
  let clientId: string;
  let companyId: string;
  let eventId: string;
  let auctionId: string;
  let offerId: string;

  // Se ejecuta una vez antes de todas las pruebas en este archivo
  beforeAll(async () => {
    // --- SETUP DINÁMICO ---
    // No dependemos de datos preexistentes. La prueba crea todo lo que necesita.

    // 1. Crear los Roles necesarios (desde auth-service)
    const clientRoleResponse = await request(BASE_URL)
      .post('/auth/roles')
      .send({ name: `CLIENT_ROLE_${Date.now()}`, description: 'Rol para clientes' });
    expect(clientRoleResponse.status).toBe(201);
    const clientRoleId = clientRoleResponse.body.id;

    // 2. Crear el Usuario Cliente (desde auth-service)
    // Usamos el roleId que acabamos de crear.
    const clientUserResponse = await request(BASE_URL)
      .post('/auth/users')
      .send({
        email: `client-${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test Client User',
        roleId: clientRoleId, // ID dinámico
      });
    expect(clientUserResponse.status).toBe(201);
    clientId = clientUserResponse.body.id; // Guardamos el ID del usuario cliente

    // 3. Crear la Empresa (desde companies-service)
    const companyResponse = await request(BASE_URL)
      .post('/companies')
      .send({
        userId: clientId, // Asociamos la empresa al usuario cliente creado
        name: `Test Company ${Date.now()}`,
        contactEmail: `company-${Date.now()}@example.com`,
      });
    expect(companyResponse.status).toBe(201);
    companyId = companyResponse.body.id; // Guardamos el ID de la empresa
  });

  it('should run the full flow: Event -> Auction -> Offer -> Order', async () => {
    // --- COMIENZO DEL FLUJO PRINCIPAL ---

    // 1. Crear un Evento (events-service)
    // El evento es creado por el usuario cliente.
    const eventResponse = await request(BASE_URL)
      .post('/events')
      .send({
        name: `Gran Concierto Anual ${Date.now()}`,
        date: "2024-12-31T20:00:00Z",
        userId: clientId, // Usamos el ID del cliente creado en el setup
        location: 'Barranquilla, Colombia',
      });
    expect(eventResponse.status).toBe(201);
    eventId = eventResponse.body.id;

    // 2. Crear una Subasta para el Evento (events-service)
    const auctionResponse = await request(BASE_URL)
      .post(`/events/auctions`)
      .send({
        event_id: eventId,
        start_at: "2025-10-22T21:00:35.783Z",
        end_at: "2025-10-22T21:00:35.783Z",
        company_id: companyId, // Usamos el ID de la empresa creada en el setup
        suggested_price: 3000,
      });
    expect(auctionResponse.status).toBe(201);
    auctionId = auctionResponse.body.id;

    // 3. La Empresa crea una Oferta para la Subasta (orders-service)
    const offerResponse = await request(BASE_URL)
      .post('/offers')
      .send({
        auctionId: auctionId,
        companyId: companyId, // Usamos el ID de la empresa creada en el setup
        amount: 5000,
        description: 'Oferta para la producción de merchandising.',
      });
    expect(offerResponse.status).toBe(201);
    offerId = offerResponse.body.id;

    // 4. El Cliente acepta la Oferta, lo que crea una Orden (orders-service)
    const acceptOfferResponse = await request(BASE_URL)
      .post(`/offers/${offerId}/accept`)
      .send();
    expect(acceptOfferResponse.status).toBe(201);
    const order = acceptOfferResponse.body;
    expect(order.id).toBeDefined();
    expect(order.status).toEqual('PENDING');

    // 5. VERIFICACIÓN FINAL: Obtener la orden creada y verificar sus datos
    const getOrderResponse = await request(BASE_URL).get(`/orders/${order.id}`);
    expect(getOrderResponse.status).toBe(200);
    expect(getOrderResponse.body.id).toEqual(order.id);
    expect(getOrderResponse.body.clientId).toEqual(clientId);
    expect(getOrderResponse.body.offerId).toEqual(offerId);
  });
});