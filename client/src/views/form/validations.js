export const validateName = (name) => {
    return !name || /[^a-zA-Z ]/.test(name)
      ? "El nombre de la actividad es obligatorio y no puede contener números."
      : null;
  };
  
  export const validateDificultad = (dificultad) => {
    return !dificultad || dificultad < 1 || dificultad > 5
      ? "La dificultad debe ser un número entre 1 y 5."
      : null;
  };
  
  export const validateDuracion = (duracion) => {
    return !duracion || duracion < 1 || duracion > 24
      ? "La duración debe tener de 1hs a 24hs."
      : "";
  };
  
  export const validateTemporada = (temporada) => {
    return !temporada
      ? "Selecciona una temporada."
      : "";
  };
  
  export const validateCountries = (countries) => {
    return !countries || countries.length === 0
      ? "Selecciona al menos un continente y un país."
      : "";
  };

  export const validateCountries2 = (countries) => {
    return !countries || countries.length === 0
      ? "Selecciona al menos un país."
      : "";
  };

  export const validateContinent = (countries) => {
    return !countries || countries.length === 0
      ? "Selecciona al menos un continente."
      : "";
  };