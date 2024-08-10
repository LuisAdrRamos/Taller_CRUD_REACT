import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
    const [student, setStudent] = useState({ name: '', email: '', age: '', gender: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .put(`/edit_user/${id}`, student)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid vw-100 vh-100 bg-primary'>
    <div className='col-md-8 col-lg-6 mx-auto'>
        <div className='card'>
            <div className='card-header bg-primary text-white'>
                <h4 className='mb-0'>Editar Estudiante {id}</h4>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>Nombre</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            className='form-control'
                            required
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
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
                            value={student.email}
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
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
                            value={student.age}
                            onChange={(e) => setStudent({ ...student, age: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='gender' className='form-label'>Género</label>
                        <select
                            name='gender'
                            id='gender'
                            className='form-select'
                            required
                            value={student.gender}
                            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
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

export default Edit;