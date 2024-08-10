import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
    const [student, setStudent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="container-fluid vw-60 vh-100 bg-primary">
            <h1>Usuario {id}</h1>
            <Link to="/" className="btn btn-success">Regresar</Link>
            <ul className="list-group">
                <li className="list-group-item">
                    <b>Id: </b>
                    {student.id}
                </li>
                <li className="list-group-item">
                    <b>Nombre: </b>
                    {student.name}
                </li>
                <li className="list-group-item">
                    <b>Correo: </b>
                    {student.email}
                </li>
                <li className="list-group-item">
                    <b>Edad: </b>
                    {student.age}
                </li>
                <li className="list-group-item">
                    <b>Género: </b>
                    {student.gender}
                </li>
            </ul>
        </div>
    );
}

export default Read;
