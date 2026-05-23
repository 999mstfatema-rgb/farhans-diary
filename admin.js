import {
  auth,
  db
} from './firebase.js';

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.adminLogin = async()=>{

  const email = prompt('Admin Email');
  const password = prompt('Password');

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert('Admin Login Success');

    createPost();

  }catch(err){

    alert(err.message);

  }

}

async function createPost(){

  const title = prompt('Post Title');
  const image = prompt('Image URL');
  const category = prompt('Category');
  const description = prompt('Description');

  await addDoc(collection(db,'posts'),{

    title,
    image,
    category,
    description,

    likes:0,
    comments:0,
    shares:0,
    views:0,

    createdAt:serverTimestamp()

  });

  alert('Post Published');

  location.reload();

}
