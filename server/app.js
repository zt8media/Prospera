const request = require('supertest');
const app = require('../server/app.js'); // path to your app.js

describe('Registration Endpoint', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully.');
  });

  it('should fail if a field is missing', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'All fields are required.');
  });
});
