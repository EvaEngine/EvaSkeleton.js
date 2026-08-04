import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mockRequest, runController } from '../../bootstrap.js';
import authController from '../../../src/routes/api/hello_world.js';

describe('Hello World API', () => {
  it('Should login success', async () => {
    const res = await runController(authController, mockRequest({
      method: 'POST', url: '/login', body: {
        username: 'evaengine',
        password: 'helloworld'
      }
    }));
    assert.equal(typeof res.token, 'string');
  });
});
