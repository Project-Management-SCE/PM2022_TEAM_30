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
describe('check routes admin/login', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/admin/login');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
describe('check /', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});

describe('check /user', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/User');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});


describe('check /Helper', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Helper');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(500);
    });

});
describe('check /Helpers', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/helpers');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(500);
    });

});
describe('check /update Helpers', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/UpdateHelper');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
describe('check /update_User', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/UpdateUser');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
describe('check /update_Admin', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/UpdateAdmin');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
describe('check /update_Users', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/users');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(500);
    });

});
describe('check /helper_Form', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/helperForm');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(500);
    });

});
// describe('check /logged', function () {
//
//     test('responds to /', async () => {
//       const res = await request(app).get('/logged');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(200);
//     });
//
// });
describe('check /new_password', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/new-password');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
describe('check /forget', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/forget');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(404);
    });

});
describe('check /alpha', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/alpha');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(500);
    });

});
describe('check /login_Admin', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/admin/login');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});
