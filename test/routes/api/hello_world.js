import { exceptions } from 'evaengine';
import { describe, it, before } from 'mocha/lib/mocha';
import authController from '../../../src/routes/api/hello_world';
import { assert, mochaAsync, mockRequest, runController } from '../../bootstrap';

describe('Demo API', () => {
  it('Could login success', mochaAsync(async() => {
    const res = await runController(authController, mockRequest({
      method: 'POST', url: '/login', body: {
        username: 'evaengine',
        password: 'helloworld'
      }
    }));
    assert.isString(res.token);
  }));

  it.skip('Login fail when wrong password', mochaAsync(async() => {
    try {
      await runController(authController, mockRequest({
        method: 'POST', url: '/login', body: {
          username: 'evaengine',
          password: ''
        }
      }));
    } catch (err) {
      assert.instanceOf(err, exceptions.InvalidArgumentException);
    }
  }));
});
