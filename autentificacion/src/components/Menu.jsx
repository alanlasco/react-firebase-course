import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import fire from '../firebaseconfig';

export const Menu = () => {
    const historial = useNavigate();
    const [usuario, setUsuario] = useState(null);

    //comprar si el usuario existe en la app, se seteara el usuario en el estado, y renderiza el boton
    useEffect( ()=>{
        const auth = getAuth(fire);
        onAuthStateChanged(auth ,(user)=>{
            if(user){
                setUsuario(user.email);
            }
        } )
    },[]);

const cerrarSesion = () =>{
    const auth = getAuth(fire);
    signOut(auth);
    setUsuario(null);
    historial('/');
}

  return (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                      <Link className="nav-link"  to="/">Inicio</Link>
                </li>
                <li className='nav-item'>
                      {
                          !usuario ? (
                              <Link className="nav-link" to="/login">Login</Link>

                          ) :
                              (
                                  <span></span>
                              )

                      }
                </li>
                <li className='nav-item'>
                      {
                          !usuario ? (
                              <Link className="nav-link" to="/admin">Admin</Link>

                          ) :
                              (
                                  <span></span>
                              )

                      }
                      
                </li>
            </ul>
            {
                usuario ? (
                      <button
                          onClick={cerrarSesion}
                          className="btn btn-danger">Cerrar Sesion</button>

                ) :
                (
                    <span></span>
                )

            }
        </nav>

    </div>
  )
}
