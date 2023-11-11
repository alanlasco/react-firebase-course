import React, { useState } from 'react';
import uniqid from "uniqid";

export const NameList = () => {
    type tnombre ={ 
        id:string;
        n:string;
    }


    const [nombre, setNombre] = useState<string>('');
    const [lista, setLista] = useState<tnombre[]>([]);
    const [edicion, setEdicion] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    const editar = (item:tnombre) =>{
        setEdicion(true);
        setNombre(item.n);
        setId(item.id);
    }

    const addNombre = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const nuevoNombre = {
            id:uniqid(),
            n: nombre
        }
        setLista([...lista, nuevoNombre]);
        setNombre('');
    }
    const deleteNombre = (id: string) =>{
        const nArray = lista.filter( item => item.id !==id)
        setLista(nArray);
    }
    const editNombre = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newArray = lista.map(item => item.id === id ?{id:id, n:nombre} : item)
        setLista(newArray);
        setEdicion(false);
        setNombre('');

    }

  return (
    <>
        <div className="row">
            <div className="col ms-5">
                <h2>Listado de nombres</h2>
                <ul className="list-group">
                    {
                        lista.map (item =>
                            <li key={item.id} className='list-group-item'>{item.n}
                            <button
                            onClick={()=> {deleteNombre(item.id)}} 
                            className='btn btn-danger float-end ms-3'>
                            borrar
                            </button>
                            <button
                            onClick={()=> {editar(item)}} 
                            className='btn btn-info float-end ms-3'>
                            editar
                            </button>                            
                            </li>
                            )
        
                    }
                </ul>
            </div>
            <div className="col">
                <h2>Formulario</h2>
                  <form onSubmit={edicion ? (e) =>{editNombre(e)} : (e) => addNombre(e)} className='form-group col' action="">
                <input onChange={(e)=>{setNombre(e.target.value)}} className='form-control mb-3' type="text" name="" id="" placeholder='introduce el nombre' value={nombre} />
                <div className="d-grid gap-2">
                <input className='btn btn-info' type="submit" 
                value={edicion ? 'EDITAR NOMBRE' : 'Registrar Nombre'} />
                </div>
            </form>            
            </div>
        </div>
    
    </>
  )
}
