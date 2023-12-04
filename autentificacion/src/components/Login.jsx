import React, {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import fire from '../firebaseconfig';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const registrarUsuario = (e) =>{
        const auth= getAuth(fire);
        e.preventDefault();
        try {
            createUserWithEmailAndPassword(auth, email, pass)
            alert('Se registro');
        } catch (e) {
            console.log(e)
        }
    }
  return (
    <div className='row mt-5'>
        <div className='col'></div>
        <div className='col' >

        <form onSubmit={registrarUsuario} className='form-group' action="">
            <input 
            onChange={(e)=> {setEmail(e.target.value)}}
            className='form-control' type="email" name="email" id="" placeholder='introduce el mail'/>
            <input
            onChange={(e)=> {setPass(e.target.value)}}
            className='form-control mt-4' type="password" name="" id="" placeholder='introduce la contraseña'/>
                  <div className='d-grid gap-2'>
                      <input 
                      className='btn btn-dark btn-block mt-4' type="submit" value="Registrar Usuario" />
                  </div>
        </form>

        </div>
        <div className='col'></div>
    </div>
  )
}
