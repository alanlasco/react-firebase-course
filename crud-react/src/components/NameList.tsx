import React, { useState } from 'react';
import uniqid from "uniqid";

export const NameList = () => {
    type tnombre ={ 
        id:string;
        n:string;
    }


    const [nombre, setNombre] = useState<string>('');
    const [lista, setLista] = useState<tnombre[]>([]);

    const addNombre = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const nuevoNombre = {
            id:uniqid(),
            n: nombre
        }
        setLista([...lista, nuevoNombre]);
    }


  return (
    <>
        <div className="row">
            <div className="col ms-5">
                <h2>Listado de nombres</h2>
            </div>
            <div className="col">
                <h2>Formulario</h2>
            <form onSubmit={(e)=> addNombre(e)} className='form-group col' action="">
                <input onChange={(e)=>{setNombre(e.target.value)}} className='form-control mb-3' type="text" name="" id="" placeholder='introduce el nombre'/>
                <div className="d-grid gap-2">
                <input className='btn btn-info' type="submit" value="registrar nombre" />
                </div>
            </form>            
            </div>
        </div>
    
    </>
  )
}
