import request from 'supertest';
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('GET', () => {
    it('Receieves 200 status', async () => {
      return request(server)
        .get('/api')
        .then(response => {
          expect(response.status).toEqual(200);
        })
        .catch(e => console.log(e));
    });

    it('Receieves content type application/json', async () => {
      return request(server)
        .get('/api')
        .then(response => {
          expect(response.type).toEqual('application/json');
        })
        .catch(e => console.log(e));
    });
  });
    
  describe('POST', () => {
    it('returns response 201', async () => {
      return request(server)
        .post('/api/drill')
        .send('asdf')
        .then(response => {
          expect(response.status).toEqual(201);
        })
        .catch(e => console.log(e));
    });
  })
})