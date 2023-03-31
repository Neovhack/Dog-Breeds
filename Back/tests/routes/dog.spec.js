/* eslint-disable import/no-extraneous-dependencies */
//const { expect } = require('chai').expect;
var expect = require('chai').expect
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Test',
  weight: "2",
  height: "3",
  life_span: "3",
  temperament: "Active,Stubborn, Curious, Playful, Adventurous, Active, Fun-loving, Aloof"
};

const fistObject = {
  id: 1,
  name: "Affenpinscher",
  temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
  weight: "3 - 6",
  height: "23 - 29"
}

xdescribe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
/*     it('should corresponding error text if', async () => {
      const res = await agent.get('/dogs');
      console.log(res.body[0]);
      expect(res.body[0]).to.be([fistObject])

    });  */
     xit('should get the searched breed from de API', async () => {
      const res = await agent.get('/dogs?name=Affenpinscher');
       expect(res.body).to.equal([
        {
            id: 1,
            name: "Affenpinscher",
            temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
            weight: "3 - 6",
            height: "23 - 29"
        }
    ])
    }); 

    xit('should get the searched breed from the bd', async () => {
      const res = await agent.get('/dogs?name=Test');
      const resTest = {
        name: res.body[0].name,
        weight: res.body[0].weight,
        height: res.body[0].height,
        life_span: res.body[0].life_span,
      }
       expect(resTest).to.equal({
        name: 'Test',
        weight: "2",
        height: "3",
        life_span: "3"
      })
    });

    xit('should get an error if the breed doesnt exists', async () => {
      const res = await agent.get('/dogs?name=Noexisto');
       expect(res.text).to.equal("No hay ninguna raza con la palabra ingresada")
    });

    xit('should get dog with the searched temperaments from the API', async () => {
      const res = await agent.get('/dogs?array=Active,Trainable,Alert');
       expect(res.body).to.equal([
        {
            "id": 221,
            "name": "Shetland Sheepdog",
            "temperament": "Affectionate, Lively, Responsive, Alert, Loyal, Reserved, Playful, Gentle, Intelligent, Active, Trainable, Strong",
            "image": "https://cdn2.thedogapi.com/images/rJa29l9E7.jpg",
            "weight": "14",
            "height": "33 - 41"
        }
      ])
    }); 

    xit('should get dog with the searched temperaments from the bd', async () => {
      const res = await agent.get('/dogs?array=Active,Stubborn, Curious, Playful, Adventurous, Active, Fun-loving,Aloof');
   
      const resTest = {
        name: res.body[0].name,
        weight: res.body[0].weight,
        height: res.body[0].height,
        life_span: res.body[0].life_span,
        temperament : res.body[0].temperament
      }
       expect(resTest).to.equal(dog)
    }); 

    xit('should get an Error with not results', async () => {
      const res = await agent.get('/dogs?array=Nada');
       expect("No hay resultados").to.equal(res.text)
    }); 

    xit('should get the searched dog id', async () => {
      const res = await agent.get('/dogs/1');
       expect(res.body).to.equal({
        id: 1,
        name: "Affenpinscher",
        temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
        weight: "3 - 6",
        height: "23 - 29"
    })
    }); 

    xit('should throw an error for incomplete data', async () => {
      const dog = {
        weight: "4 - 5",
        height: "5 - 7",
        life_span: "6 - 6 years",
        temperament: "Active"
      };
      const res = await agent.post('/dogs', dog);

       expect(res.text).to.equal("Faltan datos obligatorios por llenar")
    }); 

    xit('should create the dog', async () => {
      const dog = {
        name: "Dogo",
        weight: "4 - 5",
        height: "5 - 7",
        life_span: "6 - 6 years",
        temperament: "Active"
      };
      const res = await agent.post('/dogs').send(dog)
       expect(res.text).to.equal("Perro Creado Exitosamente")
    }); 

    xit('should throw an error for duplicate name', async () => {
      const dog = {
        name: "Dogo",
        weight: "4 - 5",
        height: "5 - 7",
        life_span: "6 - 6 years",
        temperament: "Active"
      };
      const dog2 = {
        name: "Dogo",
        weight: "4 - 5",
        height: "5 - 7",
        life_span: "6 - 6 years",
        temperament: "Active"
      };
      const res = await agent.post('/dogs').send(dog)
      const res2 = await agent.post('/dogs').send(dog2)
       expect(res2.text).to.equal("Ya existe el nombre ingresado")
    }); 

  });
});
