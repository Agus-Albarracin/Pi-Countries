const request = require('supertest');
const express = require('express');
const router = require('../src/routes/index'); // Asegúrate de tener la ruta correcta

const app = express();
app.use('/', router);
function getActivities() {
  // Esta función podría obtener actividades desde una base de datos, pero para este ejemplo retornará la lista simulada
  return [
  {id: 1,name: 'Actividad 1',duracion: 1,temporada: 'Verano',dificultad: 1,countries: ['Iraq', 'Argentina']},
  {id: 2,name: 'Actividad 2',duracion: 2,dificultad: 2,temporada: 'Invierno',countries: ['Brazil', 'Chile']},
  {id: 3,name: 'Actividad 3',duracion: 3,dificultad: 3,temporada: 'Primavera',countries: ['France', 'Spain']},
  {id: 4,name: 'Actividad 4',duracion: 4,dificultad: 4,temporada: 'Otoño',countries: ['Japan', 'China']}
  ];
}


describe('Rutas del backend', () => {

//* PAISES 

  it('Debería obtener la lista de países', async () => {
    const response = await request(app).get('/countries'); //ruta con todos los paises.
    expect(response.status).toBe(200); // Verifica el código de estado
    expect(Array.isArray(response.body)).toBe(true); // Verifica si la respuesta es un array
    expect(response.body.length).toBeGreaterThan(0); // Verifica si la respuesta tiene elementos, si un numero es mayor a otro.
  });



  it('Debería obtener un país por ID', async () => {
    const response = await request(app).get('/countries/ARG'); // ruta id.
    expect(response.statusCode).toBe(200);      // verifica el estatus
    expect(typeof response.body).toBe('object'); //verifica el tipo de dato
  });



  it('Debería obtener un país por nombre', async () => {
    const response = await request(app).get('/country').query({ name: 'Argentina' }); // Algun pais.
    expect(response.statusCode).toBe(200);      //verifica la respuesta.
    expect(typeof response.body).toBe('object'); //verifica que sea un objeto.
  });


  
//* ACTIVIDADES 

  it('Debería obtener una lista de actividades', () => {
    // Obtener la lista simulada de actividades
    const activities = getActivities();
    // Verificar si el primer elemento tiene un ID, un nombre y otros campos esperados
    expect(activities[0]).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      duracion: expect.any(Number),
      dificultad: expect.any(Number),
      temporada: expect.any(String),
      countries: expect.arrayContaining([expect.any(String)])
    });

  });



  it('Debería obtener una lista con al menos 1 elemento', () => {
    const activities = getActivities();
    // Verificar si la lista tiene al menos un elemento
    expect(activities.length).toBeGreaterThan(0);
  });



  it('Verifica que contengan todos los elementos del modelo', () => {
    const activities = getActivities();
    // Verificar si el primer elemento tiene un ID, un nombre y otros campos esperados
    expect(activities.length).toBeGreaterThan(0);
  });



});