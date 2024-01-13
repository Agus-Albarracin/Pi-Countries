import React, { useState } from 'react';
import axios from 'axios';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SingUp.module.css';

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Realizar validaciones en tiempo real mientras el usuario escribe
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
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

    // Realizar las validaciones finales antes de enviar la solicitud
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/singup', {
          email: formData.email,
          password: formData.password,
        });

        console.log('Usuario registrado con éxito:');
        alert("Se ha registrado con éxito")
        // Redirigir al usuario después del registro exitoso
        navigate(PATHROUTES.LANDING);
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        // Mostrar un mensaje al usuario sobre el error
        alert("Error al registrar usuario. Verifica tus datos e intenta nuevamente.");
      }
    }
  };

  const validateForm = () => {
    return Object.values(errors).every((error) => error === '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label>Password:</label>
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
          <button type="submit">Registrarse</button>
        <p>¿Ya tienes una cuenta? <Link to={PATHROUTES.LANDING}>Ingresa</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;