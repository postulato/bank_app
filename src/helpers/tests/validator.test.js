import * as funcs from '../validator.js';
import {expect} from 'chai';

  describe('Test isNotEmpty', function () {
    it('should be no error', function () {
      const result = {value:'Hello', error:null};
      funcs.isNotEmpty(result);
      expect(result.error).to.equal(null);
    });
    it('should be an error', function () {
       const result = {value:'', error:null};
      funcs.isNotEmpty(result);
      expect(result.error).not.to.equal(null);
    })
  })
  
