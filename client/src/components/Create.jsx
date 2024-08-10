import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/add_user', values)
            .then((res) => {
                setMessage('Estudiante agregado con éxito');
                setIsError(false);
                setValues({
                    name: '',
                    email: '',
                    age: '',
                    gender: ''
                });
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.error || `Error al agregar el estudiante: ${err.message}`;
                console.error('Error al agregar el estudiante:', err);
                setMessage(errorMessage);
                setIsError(true);
              });
    };    

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100 bg-primary'>
            <div className='col-md-8 col-lg-6'>
                <div className='card'>
                    <div className='card-header bg-primary text-white'>
                        <h4 className='mb-0'>Añadir Estudiante</h4>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            {message && (
                                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role='alert'>
                                    {message}
                                </div>
                            )}
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='form-control'
                                    required
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email' className='form-label'>Correo Electrónico</label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='form-control'
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='age' className='form-label'>Edad</label>
                                <input
                                    type='number'
                                    name='age'
                                    id='age'
                                    className='form-control'
                                    required
                                    value={values.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='gender' className='form-label'>Género</label>
                                <select
                                    type='text'
                                    name='gender'
                                    id='gender'
                                    className='form-select'
                                    required
                                    value={values.gender}
                                    onChange={handleChange}
                                >
                                    <option value=''>Selecciona tu género</option>
                                    <option value='male'>Masculino</option>
                                    <option value='female'>Femenino</option>
                                    <option value='other'>Otro</option>
                                </select>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button type='submit' className='btn btn-success'>Guardar</button>
                                <Link to='/' className='btn btn-secondary'>Regresar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
