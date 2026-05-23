import {
auth,
db,
storage
} from './firebase.js';

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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

showAdminButton();

location.reload();

}catch(err){

alert(err.message);

}

}

window.logoutAdmin = ()=>{

localStorage.removeItem('isAdmin');

location.reload();

}

function showAdminButton(){

if(document.getElementById('createPostBtn'))
return;

const btn = document.createElement('button');

btn.id='createPostBtn';

btn.innerText='New Post';

btn.style.position='fixed';
btn.style.right='20px';
btn.style.bottom='90px';
btn.style.zIndex='9999';
btn.style.padding='14px 18px';
btn.style.border='none';
btn.style.borderRadius='50px';
btn.style.background='#4f46e5';
btn.style.color='#fff';
btn.style.fontWeight='700';

btn.onclick = openPostModal;

document.body.appendChild(btn);

}

if(localStorage.getItem('isAdmin') === 'true'){

window.addEventListener('load',()=>{

showAdminButton();

});

}

window.publishPost = async()=>{

const title =
document.getElementById('postTitle').value;

const category =
document.getElementById('postCategory').value;

const redirectUrl =
document.getElementById('postRedirect').value;

const description =
document.getElementById('postDescription').value;

const content =
document.getElementById('postContent').value;

const imageFile =
document.getElementById('postImage').files[0];

const videoFile =
document.getElementById('postVideo').files[0];

let imageUrl = '';

let videoUrl = '';

try{

if(imageFile){

const imageRef = ref(
storage,
'images/' + Date.now() + imageFile.name
);

await uploadBytes(imageRef,imageFile);

imageUrl =
await getDownloadURL(imageRef);

}

if(videoFile){

const videoRef = ref(
storage,
'videos/' + Date.now() + videoFile.name
);

await uploadBytes(videoRef,videoFile);

videoUrl =
await getDownloadURL(videoRef);

}

await addDoc(collection(db,'posts'),{

title,
category,
redirectUrl,
description,
content,

image:imageUrl,
video:videoUrl,

likes:0,
comments:0,
shares:0,
views:0,

createdAt:serverTimestamp()

});

alert('Post Published Successfully');

closePostModal();

location.reload();

}catch(err){

alert(err.message);

}

}
