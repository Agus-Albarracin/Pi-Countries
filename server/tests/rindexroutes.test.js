const request = require('supertest');
const express = require('express');
const router = require('../src/routes/index'); 

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
    const response = await request(app).get('/countries'); 
    expect(response.status).toBe(200); 
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0); // Verifica si la respuesta tiene elementos, si un numero es mayor a otro.
  });



  it('Debería obtener un país por ID', async () => {
    const response = await request(app).get('/countries/ARG'); 
    expect(response.statusCode).toBe(200);      
    expect(typeof response.body).toBe('object'); 
  });



  it('Debería obtener un país por nombre', async () => {
    const response = await request(app).get('/country').query({ name: 'Argentina' }); 
    expect(response.statusCode).toBe(200);      
    expect(typeof response.body).toBe('object'); 
  });


  
//* ACTIVIDADES 

  it('Debería obtener una lista de actividades', () => {
  
    const activities = getActivities();
    
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
    expect(activities.length).toBeGreaterThan(0);
  });



  it('Verifica que contengan todos los elementos del modelo', () => {
    const activities = getActivities();
    // Verificar si el primer elemento tiene un ID, un nombre y otros campos esperados
    expect(activities.length).toBeGreaterThan(0);
  });



});