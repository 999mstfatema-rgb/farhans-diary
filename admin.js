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

window.openLoginModal = ()=>{

document.getElementById('loginModal')
.style.display='flex';

}

window.closeLoginModal = ()=>{

document.getElementById('loginModal')
.style.display='none';

}

window.openPostModal = ()=>{

document.getElementById('postModal')
.style.display='flex';

}

window.closePostModal = ()=>{

document.getElementById('postModal')
.style.display='none';

}

window.adminLogin = async()=>{

const email =
document.getElementById('adminEmail').value;

const password =
document.getElementById('adminPassword').value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

localStorage.setItem('isAdmin','true');

alert('Admin Login Success');

closeLoginModal();

if(!document.getElementById('createPostBtn')){

const btn = document.createElement('button');

btn.id='createPostBtn';

btn.innerText='Create Post';

btn.style.position='fixed';
btn.style.right='20px';
btn.style.bottom='90px';
btn.style.zIndex='9999';
btn.style.padding='14px 18px';
btn.style.border='none';
btn.style.borderRadius='50px';
btn.style.background='#4f46e5';
btn.style.color='#fff';
btn.style.fontWeight='600';
btn.style.cursor='pointer';

btn.onclick = openPostModal;

document.body.appendChild(btn);

}

location.reload();

}catch(err){

alert(err.message);

}

}

window.logoutAdmin = ()=>{

localStorage.removeItem('isAdmin');

location.reload();

}

window.publishPost = async()=>{

const title =
document.getElementById('postTitle').value;

const image =
document.getElementById('postImage').value;

const video =
document.getElementById('postVideo').value;

const category =
document.getElementById('postCategory').value;

const redirectUrl =
document.getElementById('postRedirect').value;

const description =
document.getElementById('postDescription').value;

const content =
document.getElementById('postContent').value;

await addDoc(collection(db,'posts'),{

title,
image,
video,
category,
redirectUrl,
description,
content,

likes:0,
comments:0,
shares:0,
views:0,

createdAt:serverTimestamp()

});

alert('Post Published');

closePostModal();

location.reload();

}

if(localStorage.getItem('isAdmin') === 'true'){

window.addEventListener('load',()=>{

if(!document.getElementById('createPostBtn')){

const btn = document.createElement('button');

btn.id='createPostBtn';

btn.innerText='Create Post';

btn.style.position='fixed';
btn.style.right='20px';
btn.style.bottom='90px';
btn.style.zIndex='9999';
btn.style.padding='14px 18px';
btn.style.border='none';
btn.style.borderRadius='50px';
btn.style.background='#4f46e5';
btn.style.color='#fff';
btn.style.fontWeight='600';
btn.style.cursor='pointer';

btn.onclick = openPostModal;

document.body.appendChild(btn);

}

});

}
