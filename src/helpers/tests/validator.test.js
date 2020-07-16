import * as funcs from '../validator.js';
import validator from '../validator.js';
import {assert, expect} from 'chai';

  describe('Test isNotEmpty', function () {
    it('When passing an obj with filled value, error should be null', function () {
      const result = {value:'Hello', error:null};
      funcs.isNotEmpty(result);
      expect(result.error).to.equal(null);
    });
    it('When passing an obj with empty value, error should be filled', function () {
       const result = {value:'', error:null};
      funcs.isNotEmpty(result);
      expect(result.error).not.to.equal(null);
    })
    it('When passing an obj with empty value, error should be a string', function () {
      const result = {value:'', error:null};
      funcs.isNotEmpty(result);
      assert.isString(result.error )
    })
  })

  describe('Test isValid mail', function (){
    const mails = ['test@', 'test@test', '@t.com']
    mails.forEach((mail)=>{
      let result = null;
      beforeEach(()=>{
        result = {value: mail, error: null};
      })
      it(`When passing ${mail} should have an error`, function () {
        funcs.isValidMail(result);
        expect(result.error).not.to.equal(null);
      })
      it('When passing ${mail} error should be a string', function () {
        funcs.isValidMail(result);
        assert.isString(result.error);
      })
    })
  })

  describe('Test isValidCard', function () {
    const values = ['01321', '0130 13123', '2132 1233 2323 2313 2134'];
    values.forEach((value)=>{
      let result = null;

      beforeEach(()=>{
        result = {value, error: null};
      })

      it(`When passing ${value} should be an error`, function () {
        funcs.isValidCard(result);
        assert.isOk(result.error);
      })

      it(`When passing ${value} error should be a string`, function () {
        funcs.isValidCard(result);
        assert.isString(result.error);
      })
    });
    
    describe('Test isValidCard with correct data', function () {
      const val = '2313 9543 4053 6593';
      const result = {value: val, error: null};
      it(`When passing ${val} should be no error`, function () {
        funcs.isValidCard(result);
        assert.isNotOk(result.error);
      })
    })
  });

  describe('Test main validator func', function () {
    const correctVal = '+375 44 123-45-46';
    const incorrectVal = '123123';
    const emptyVal = '';

    const testObj = { 
      isValid: false,
    }

    it(`When passing obj without data should be TypeError`, ()=>{
      assert.throws(()=>{
        validator(testObj)
      }, TypeError);
    })

    const testObj2 = {
      data: {
        bfTel: {
          label: "Номер телефона твоего парня:",
          value: correctVal,
          name: "bfTel",
          tip: {
            text: "Международный",
            type: "default",
          },
          type: "tel",
          isValid: false,
        }
      }
    };


    it(`When passing ${correctVal} should have no errors`, ()=>{
      validator(testObj2);
      expect(testObj2.data.bfTel.error).to.be.equal(null);
    })

   const testObj3 =  {
    data: {
      bfTel: {
        label: "Номер телефона твоего парня:",
        value: incorrectVal,
        name: "bfTel",
        tip: {
          text: "Международный",
          type: "default",
        },
        type: "tel",
        isValid: false,
      }
    }
  };
    it(`When passing ${incorrectVal} should have an error "Введите правильный номер"`, ()=>{
      validator(testObj3);
      expect(testObj3.data.bfTel.error).to.be.equal('Введите правильный номер')
    })

    const testObj4 =  {
      data: {
        bfTel: {
          label: "Номер телефона твоего парня:",
          value: emptyVal,
          name: "bfTel",
          tip: {
            text: "Международный",
            type: "default",
          },
          type: "tel",
          isValid: false,
        }
      }
    };
    it(`When passing ${emptyVal} should have an error "Заполните это поле"`, ()=>{
      validator(testObj4);
      expect(testObj4.data.bfTel.error).to.be.equal('Заполните это поле')
    })
  })
  
