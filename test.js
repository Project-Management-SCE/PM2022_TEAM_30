var request = require('supertest');
const assert = require('assert');
var app = require('./app.js');

describe('Home User', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Home_user');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(404);
    });
});
