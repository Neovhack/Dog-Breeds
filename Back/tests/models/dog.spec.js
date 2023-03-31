const { Dog, conn } = require('../../src/db.js');
//const { expect } = require('chai');
var expect = require('chai').expect

describe('Dog model', () => {
   before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })); 
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', async () => {
          let testee = {
            name: "okkkkk",
            weight: "4 - 5",
            height: "5 - 7",
            life_span: "6 - 6 years",
            temperament: "asd"
        }
        try {
          const dogo = await Dog.create(testee) 
        } catch (error) {
          expect(error).to.equal(error)
        }
        //expect(err).to.equal(err)
      });
      xit('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
      xit("should not create dog with name already taken", () => {
        Dog.create({ name: 'Pug' });
        Dog.create({ name: 'Pug' })
        .then(() => done(new Error('Name is already taken')))
        .catch(() => done());
      });
    });
    
    xdescribe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its a valid weight', () => {
        Dog.create({ weight: 3 });
      });
    });


  });
});
