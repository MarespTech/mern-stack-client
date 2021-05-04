import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    
    // Obtener el state de las tareas
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, agregarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Definir state de Formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    });

    // Effect que detecta si una tarea esta seleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea({nombre: ''});
        }
    }, [tareaSeleccionada]);

    // Definir state de error
    const [errorForm, guardarError] = useState(false);
    // Extraer nombre del proyecto
    const { nombre } = tarea;

    if(!proyecto) return null; 

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if(nombre.trim() === '') return guardarError(true);

        // Pasar valdiacion
        guardarError(false);

        // Revisar si es edicion o si es nueva tarea
        if(tareaSeleccionada === null) {
            // Tarea nueva
            // Agregar nueva tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }

        obtenerTareas(proyectoActual._id);

        // Reiniciar Form
        guardarTarea({
            nombre: '',
        });
    }

    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errorForm ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}
        </div>
    );
}
 
export default FormTarea;