const app = require('../app');
const request = require('supertest');

const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connection.close();
  const url = 'mongodb://localhost:27017/test';
  mongoose.set('strictQuery', true);
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Home route', () => {
  it('should response 200', async () => {
    const response = await request(app).get('/api');
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).hasOwnProperty('status');
    expect(response.body.success).toBe(true);
  });
});
