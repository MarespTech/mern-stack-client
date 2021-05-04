import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import AlertaContext from '../../context/alertas/alertaContext';


const ListadoTareas = () => {
    // Extraer proyecto actual
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyecto, eliminarProyecto } = proyectosContext;

    // Obtener el state del formulario
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;




    if(!proyecto) return <h2>Seleccione un proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    const onClickEliminar = () => {

        eliminarProyecto(proyectoActual._id);
    }

    return (  
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                        <TransitionGroup>
                            {
                                tareasproyecto.map(tarea => (
                                    <CSSTransition
                                        key={tarea._id}
                                        timeout={200}
                                        classNames="tarea"
                                    >
                                        <Tarea 
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;