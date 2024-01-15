// Importa el componente Form y las bibliotecas necesarias para las pruebas
import React from 'react';
import configureStore from 'redux-mock-store';
import { validateName, validateDificultad, validateDuracion, validateTemporada, validateCountries} from "../src/views/form/validations"

// Crea un store ficticio utilizando redux-mock-store
const mockStore = configureStore([]);
const store = mockStore({
    name: "Correr",
    dificultad: "1",
    duracion: "1",
    temporada: "Otoño",
    countries: ["Iraq", "Tajikistan"],
  });


  describe('Validación del nombre de la actividad', () => {
    it('Debería retornar un mensaje de error si el nombre es vacío', () => {
      const emptyName = '';
      expect(validateName(emptyName)).toBe('El nombre de la actividad es obligatorio y no puede contener números.');
    });
  
    it('Debería retornar un mensaje de error si el nombre contiene números', () => {
      const invalidName = 'Actividad 123';
      expect(validateName(invalidName)).toBe('El nombre de la actividad es obligatorio y no puede contener números.');
    });
  
    it('Debería retornar una cadena vacía si el nombre es válido', () => {
      const validName = 'Actividad de prueba';
      expect(validateName(validName)).toBe('');
    });
  });
  
  describe('Validación de la dificultad', () => {
    it('Debería retornar un mensaje de error si la dificultad está fuera del rango permitido', () => {
      const invalidDificultad = 6;
      expect(validateDificultad(invalidDificultad)).toBe('La dificultad debe ser un número entre 1 y 5.');
    });
  
    it('Debería retornar una cadena vacía si la dificultad es válida', () => {
      const validDificultad = 3;
      expect(validateDificultad(validDificultad)).toBe('');
    });
  });
  
  describe('Validación de la duración', () => {
    it('Debería retornar un mensaje de error si la duración es negativa', () => {
      const invalidDuracion = -1;
      expect(validateDuracion(invalidDuracion)).toBe('La duración debe ser un número positivo.');
    });
  
    it('Debería retornar una cadena vacía si la duración es válida', () => {
      const validDuracion = 4;
      expect(validateDuracion(validDuracion)).toBe('');
    });
  });
  
  describe('Validación de la temporada', () => {
    it('Debería retornar un mensaje de error si la temporada está vacía', () => {
      const emptyTemporada = '';
      expect(validateTemporada(emptyTemporada)).toBe('Selecciona una temporada.');
    });
  
    it('Debería retornar una cadena vacía si la temporada es válida', () => {
      const validTemporada = 'Verano';
      expect(validateTemporada(validTemporada)).toBe('');
    });
  });
  
  describe('Validación de los países', () => {
    it('Debería retornar un mensaje de error si no se seleccionan países', () => {
      const emptyCountries = [];
      expect(validateCountries(emptyCountries)).toBe('Selecciona al menos un continente y un país.');
    });
  
    it('Debería retornar una cadena vacía si se seleccionan países', () => {
      const validCountries = ['Argentina', 'Brasil'];
      expect(validateCountries(validCountries)).toBe('');
    });
  });


        // //* COUNTRIES 
        
        // it('Debería devolver un mensaje si no se selecciona ningún país', () => {
        //     const countries = [];
        //     const validationResult = validateCountries(countries);
        //     expect(validationResult).toBe('Selecciona al menos un continente y un país.');
        //     });
            
        // it('Debería devolver un string vacío si se selecciona al menos un país', () => {
        //     const countries = ['Iraq'];
        //     const validationResult = validateCountries(countries);
        //     expect(validationResult).toBe('');
        //     });