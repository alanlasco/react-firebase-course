import firebase from 'firebase/app'
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAa_ZtqrbxDOjXh6dwcfNCYgfyKi085r0U",
    authDomain: "prueba-aut-bc50f.firebaseapp.com",
    projectId: "prueba-aut-bc50f",
    storageBucket: "prueba-aut-bc50f.appspot.com",
    messagingSenderId: "696027409177",
    appId: "1:696027409177:web:bf6001ce97960cf714f388",
    measurementId: "G-VFQ01ED5FQ"
};

const fire = initializeApp(firebaseConfig);


export default fire;