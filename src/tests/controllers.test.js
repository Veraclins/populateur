import request from 'supertest';
import app from '../app';

let token = '';
describe('Authenticating users', () => {
  describe('POST /auth', () => {
    const username = 'Awesome';
    const password = 'passmeup';
    it('should signup a user', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .post('/auth')
        .send({ username, password });
      expect(status).toEqual(201);
      expect(data).toHaveProperty('token');
    });
    it('should login a user', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .post('/auth')
        .send({ username, password });
      ({ token } = data);
      expect(status).toEqual(200);
      expect(data).toHaveProperty('token');
    });
  });

  describe('Unauthenticated users', () => {
    it('should fail if no access token', async () => {
      const {
        status,
        body: { errors },
      } = await request(app)
        .post('/locations')
        .send({ name: 'Abuja', male: 243534555, female: 4534435 });
      expect(status).toEqual(400);
      expect(errors).toHaveProperty('token');
    });
    it('should fail if token is invalid', async () => {
      const { status } = await request(app)
        .get('/locations')
        .set('x-access-token', `${token}sd`);
      expect(status).toEqual(401);
    });
  });
});

describe('Creating a location', () => {
  describe('POST /locations', () => {
    it('should create a location', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .post('/locations')
        .set('x-access-token', token)
        .send({ name: 'Abuja', male: 243534555, female: 4534435 });
      expect(status).toEqual(201);
      expect(data).toHaveProperty('id');
    });
    it('should create a nested location', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .post('/locations')
        .set('x-access-token', token)
        .send({
          name: 'Makurdi',
          male: 243534555,
          female: 4534435,
          parentId: 1,
        });
      expect(status).toEqual(201);
      expect(data).toHaveProperty('id');
    });
    it('should fail if invalid input', async () => {
      const { status } = await request(app)
        .post('/locations')
        .set('x-access-token', token)
        .send({ name: 'Abuja', male: '2435dds34555', female: 4534435 });
      expect(status).toEqual(400);
    });
    it('should fail if missing input', async () => {
      const { status } = await request(app)
        .post('/locations')
        .set('x-access-token', token)
        .send({ name: 'Abuja', female: 4534435 });
      expect(status).toEqual(400);
    });
  });
  describe('GET /locations', () => {
    it('should fetch all available locations', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .get('/locations')
        .set('x-access-token', token);
      expect(status).toEqual(200);
      expect(data.length).toBeGreaterThan(0);
    });
  });
  describe('GET /location/:id', () => {
    it('should fetch a location with id', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .get('/locations/1')
        .set('x-access-token', token);
      expect(status).toEqual(200);
      expect(data).toHaveProperty('id');
      expect(data.id).toEqual(1);
    });
    it('should fail if location is not found', async () => {
      const { status } = await request(app)
        .get('/locations/10')
        .set('x-access-token', token);
      expect(status).toEqual(404);
    });
  });
  describe('PUT /location/:id', () => {
    it('should update a location with id', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .put('/locations/1')
        .set('x-access-token', token)
        .send({ name: 'Lagos', male: 243534555, female: 4534435 });
      expect(status).toEqual(200);
      expect(data.name).toEqual('Lagos');
    });
    it('should fail if location is not found', async () => {
      const { status } = await request(app)
        .put('/locations/20')
        .set('x-access-token', token)
        .send({ name: 'Lagos', male: 243534555, female: 4534435 });
      expect(status).toEqual(404);
    });
  });
  describe('DELETE /location/:id', () => {
    it('should delete a location with id', async () => {
      const {
        status,
        body: { data },
      } = await request(app)
        .delete('/locations/1')
        .set('x-access-token', token);
      expect(status).toEqual(200);
      expect(data).toEqual(1);
    });
    it('should fail if no available locations', async () => {
      const { status } = await request(app)
        .delete('/locations/20')
        .set('x-access-token', token);
      expect(status).toEqual(404);
    });
  });
});
