import { useState, useEffect } from 'react';
import fire from './firestoreconfig.js';
import './App.css';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [nombre, setNombre] = useState('');
  const [phone, setPhone] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [error, setError] = useState('');
  const store = getFirestore(fire);

  const setUsuarios = async (e) =>{
    const store = getFirestore(fire);
    e.preventDefault();// evita que al mandar el formulario vaya a otro sitio
    if(!nombre.trim()){
        setError('El nombre esta vacio')

    }
    if (!phone.trim()) {
      setError('El telefono esta vacio')
    }
    try{
      console.log('entra al catch')
      const data = await addDoc(collection(store, "agenda"), {
        name: nombre ,
        phone: phone
      });
      console.log('se añadio');

    }catch(e){
      console.log(e)
    }
    setNombre('');
    setPhone('');

  }

  return (
    <div className="container">
      <div className='row'>
        <div className="col">
          <h3>Formulario de usuarios : agenda</h3>
          <form onSubmit={setUsuarios} action="" className='form-group'>
            <input
            value={nombre}
            onChange={(e)=>{setNombre(e.target.value)}}
             className='form-control mt-3' type="text" name="" id="" placeholder='introduce el nombre'/>
            <input 
            value={phone}
              onChange={(e) => { setPhone(e.target.value) }}
            className='form-control mt-3' type="text" name="" id="" placeholder='introduce el número' />
            <div className='d-grid gap-2 mt-3'>
            <input 

            type="submit" value="Registrar" className='btn btn-dark' />
            </div>
          </form>
          {
            error ? (<div>
              {error}
            </div>)
            :
            (
              <span></span>
            )
          }
        </div>
        <div className="col">
          <h2>Agenda</h2>

        </div>

      </div>
        

    </div>
  );
}

export default App;