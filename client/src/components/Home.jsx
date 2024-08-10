import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get('/students_details')
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>console.log(err))
        
        }
    }, [deleted])

    function handleDelete(id) {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este estudiante?");
        if (confirmDelete) {
            axios.delete(`/delete/${id}`)
                .then((res) => {
                    setDeleted(true)
                })
                .catch((err) => console.log(err))
        }
    }

 return (
    <div className='container-fluid bg-primary vh-100 vw-100'>
        <h3>Información Estudiantes</h3>
        <div className='d-flex justify-content-end'>
            <Link className='btn btn-success' to='/create'>Añadir Estudiante</Link>
        </div>
            <div class="table-responsive" >
                <table class="table table-primary" >
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Género</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((student) => {
                                return (
                                    <tr className="">
                                        <td>{student.id}</td>
                                        <td><a href={`/read/${student.id}`}>{student.name}</a></td>
                                        <td>{student.email}</td>
                                        <td>{student.age}</td>
                                        <td>{student.gender}</td>
                                        <td>
                                            <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Leer</Link>
                                            <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Editar</Link>
                                            <button onClick={()=>handleDelete(student.id)} className='btn mx-2 btn-danger'>Eliminar</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Home