import React, {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import fire from '../firebaseconfig';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgerror, setMsgerror] = useState(null)

    const registrarUsuario = (e) =>{
        const auth= getAuth(fire);
        e.preventDefault();
            createUserWithEmailAndPassword(auth, email, pass)
           .then(r => alert('Se registro'))
            .catch(e => {
            console.log(e)
            if (e.code == 'auth/invalid-email'){
                setMsgerror('formato de email incorrecto'); //no fue necesario lo comprueba el html
            }
            if(e.code == 'auth/weak-password'){
                setMsgerror('la contraseña deberia tener más de 6 caracteres');
            }
        })
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
        {

            msgerror != null ? (
                <div className='mt-4'>
                    {msgerror}
                </div>
            ) :
            (
                <span>

                </span>
            )

        }

        </div>
        <div className='col'></div>
    </div>
  )
}
