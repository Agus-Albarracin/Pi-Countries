import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes.helper';

// Styles
import styles from './Landing.module.css';

const LogInComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  window.addEventListener('popstate', (event) => {
   window.alert("Por motivos de seguridad bloqueamos la página \nCierre la pestaña y vuelva a abrirla")
   window.location.reload()
   navigate("/")
    
    // Puedes realizar acciones específicas según el nuevo estado del historial
    // Por ejemplo, podrías redirigir o actualizar la página según tus necesidades
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    // ... (tu código de validación actual)
    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          email: value.includes('@') && value.includes('.com') ? '' : 'Email no válido',
        });
        break;
      case 'password':
        setErrors({
          ...errors,
          password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value)
            ? ''
            : 'La contraseña debe contener al menos una letra, un número y un carácter especial',
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const response = await axios.post('http://localhost:3001/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log('Inicio de sesión exitoso:');

        // Redirigir al usuario a la página principal después de iniciar sesión
        navigate('/home');
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    // ... (tu código de validación actual)
    return Object.values(errors).every((error) => error === '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>MAIL:  </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <br></br>
          <label>PASS:  </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Mostrar{""}contraseña</label>
          </div>
          <br></br>
          <button type="submit" disabled={isSubmitting}>
            Iniciar Sesión
          </button>
        </form>
      <p>
        No tienes una cuenta aún? <Link to={PATHROUTES.SINGUP}>Crear cuenta</Link>
      </p>
      </div>
    </div>
  );
};

export default LogInComponent;