import { useState, useEffect } from 'react';
import fire from './firestoreconfig.js';
import './App.css';
import { getFirestore, collection, addDoc, getDocs, deleteField, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [nombre, setNombre] = useState('');
  const [phone, setPhone] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [error, setError] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const[edicion, setEdicion] =useState(false);


  useEffect (()=>{
    const getUsuarios = async () =>{
      const store = getFirestore(fire);
      const data = await getDocs(collection(store, "agenda"));
      const array = data.docs.map(item => ({id:item.id, ...item.data()})); // item seria como un puntero
      // En este código, data.docs es una propiedad de QuerySnapshot que representa una matriz de documentos en la colección.Ahora deberías poder utilizar.map() en data.docs para crear el array que necesitas.
      setUsuario(array);
  }
getUsuarios();},[]);

  const setUsuarios = async (e) =>{
    const store = getFirestore(fire);
    e.preventDefault();// evita que al mandar el formulario vaya a otro sitio
    if(!nombre.trim()){
        setError('El nombre esta vacio')
      return;
    }
    if (!phone.trim()) {
      setError('El telefono esta vacio')
      return;
    }
    try{
      console.log('entra al catch')
      const data = await addDoc(collection(store, "agenda"), {
        name: nombre ,
        phone: phone
      });
      console.log('se añadio');
      const dataGet = await getDocs(collection(store, "agenda"));
      const array = dataGet.docs.map(item => ({ id: item.id, ...item.data() })); // item seria como un puntero
      // En este código, data.docs es una propiedad de QuerySnapshot que representa una matriz de documentos en la colección.Ahora deberías poder utilizar.map() en data.docs para crear el array que necesitas.
      setUsuario(array);

    }catch(e){
      console.log(e)
    }
    setNombre('');
    setPhone('');

  }
  const borrarUsuario =  async (id) =>{
    const store = getFirestore(fire);
    try {
     await deleteDoc(doc(store, "agenda", id));
      const dataGet = await getDocs(collection(store, "agenda"));
      const array = dataGet.docs.map(item => ({ id: item.id, ...item.data() })); // item seria como un puntero
      // En este código, data.docs es una propiedad de QuerySnapshot que representa una matriz de documentos en la colección.Ahora deberías poder utilizar.map() en data.docs para crear el array que necesitas.
      setUsuario(array);
      
    } catch (e) {
      console.log(e);
      
    }
  }
  const editarUsuario = async(id) =>{
    const store = getFirestore(fire);

    try {
      const dataGet = doc(store, "agenda", id);
      const docSnap = await getDoc(dataGet);
      const {name, phone} = docSnap.data()
      setNombre(name);
      setPhone(phone)
      setIdUsuario(id);
      setEdicion(true);
      console.log(docSnap.data());
      
    } catch (e) {
      console.log(e);
    }
   
  }
  const setUpdate = async (e) => {
    e.preventDefault();

    const store = getFirestore(fire);

    if (!nombre.trim()) {
      setError('El nombre está vacío');
      return;
    }

    if (!phone.trim()) {
      setError('El teléfono está vacío');
      return;
    }
    try {
      //obtengo el doc con el id seteado en editar, edito ese documento
      const docRef = doc(store, "agenda", idUsuario);
      await getDoc(docRef);
      await setDoc(doc(store, "agenda", idUsuario), {
        name: nombre,
        phone: phone
      });


      const data = await getDocs(collection(store, "agenda"));
      const array = data.docs.map(item => ({ id: item.id, ...item.data() }));
      setUsuario(array);
    } catch (error) {
      console.log(error);
    }
    setNombre('');
    setPhone('');
    setIdUsuario('')
    setEdicion(false);
  };

  return (
    <div className="container">
      <div className='row'>
        <div className="col">
          <h3>Formulario de usuarios : agenda</h3>
          <form onSubmit={
            edicion ? (setUpdate) : (setUsuarios)
            } action="" className='form-group'>
            <input
            value={nombre}
            onChange={(e)=>{setNombre(e.target.value)}}
             className='form-control mt-3' type="text" name="" id="" placeholder='introduce el nombre'/>
            <input 
            value={phone}
              onChange={(e) => { setPhone(e.target.value) }}
            className='form-control mt-3' type="text" name="" id="" placeholder='introduce el número' />
            
           { edicion ? (
            <div className='d-grid gap-2 mt-3'>

              <input

                type="submit" value="actualizar" className='btn btn-dark' />
            </div>

            ) :
            (
            <div className='d-grid gap-2 mt-3'>

              <input

                type="submit" value="Registrar" className='btn btn-dark' />
            </div>
            ) 
            }

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
          <ul className='list-group'>
            {
              usuario.length !== 0 ? (
                usuario.map(item => (
                  <li className='list-group-item' key={item.id}>{item.name} -- {item.phone}
                  <button
                  onClick={(id)=>{editarUsuario(item.id)}} 
                  className='btn btn-info  float-end'>
                    Actualizar
                  </button>
                  <button 
                  onClick={(id)=>{borrarUsuario(item.id)}}
                      className='btn btn-danger float-end me-1'>Borrar</button></li>
                ))
              )
                :
                (
                  <span>
                    No hay usuarios en la agenda
                  </span>
                )
            }
          </ul>
        </div>

      </div>
        

    </div>
  );
}

export default App;