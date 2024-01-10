export const validateName = (name) => {
    return !name || /[^a-zA-Z ]/.test(name)
      ? "El nombre de la actividad es obligatorio y no puede contener números."
      : "";
  };
  
  export const validateDificultad = (dificultad) => {
    return !dificultad || dificultad < 1 || dificultad > 5
      ? "La dificultad debe ser un número entre 1 y 5."
      : "";
  };
  
  export const validateDuracion = (duracion) => {
    return !duracion || duracion < 0
      ? "La duración debe ser un número positivo."
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