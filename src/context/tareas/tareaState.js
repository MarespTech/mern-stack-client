import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareasReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import { TAREAS_PROYECTO, 
         AGREGAR_TAREA,
         ELIMINAR_TAREA,
         TAREA_ACTUAL,
         ACTUALIZAR_TAREA,
         LIMPIAR_TAREA
        } from '../../types';

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(tareasReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tasks', { params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.data
            });
        } catch (error) {
            console.log(error.response)
        }
    }
    
    // Agregar una nueva tarea a proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tasks', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.task
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar tarea por su ID
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`api/tasks/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    // Editar tarea
    const actualizarTarea = async tarea => {
        try {
            console.log(tarea)
            const resultado = await clienteAxios.put(`/api/tasks/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.task
            });   
        } catch (error) {
            console.log(error);
        }
    }

    // Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }


    // Elimina la tarea Seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA, 
        });
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasProyecto,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;