import {
initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
apiKey: "AIzaSyBdbHoaDhKjlydvDL1HDu9KuVSBEeGTkIA",
authDomain: "farhans-diary.firebaseapp.com",
projectId: "farhans-diary",
storageBucket: "farhans-diary.firebasestorage.app",
messagingSenderId: "856421576567",
appId: "1:856421576567:web:9fe122351bf06902defb72",
measurementId: "G-5MSXBKMQ63"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

window.openLoginModal = function(){

document.getElementById("loginModal").style.display = "flex";

}

window.closeLoginModal = function(){

document.getElementById("loginModal").style.display = "none";

}

window.openPostModal = function(){

document.getElementById("postModal").style.display = "flex";

}

window.closePostModal = function(){

document.getElementById("postModal").style.display = "none";

}

window.adminLogin = async function(){

const email =
document.getElementById("adminEmail").value;

const password =
document.getElementById("adminPassword").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Successful");

closeLoginModal();

}catch(error){

alert(error.message);

}

}

window.logoutAdmin = async function(){

await signOut(auth);

alert("Logged Out");

}

onAuthStateChanged(auth,(user)=>{

const btns =
document.querySelector(".top-actions");

if(user){

if(!document.getElementById("createPostBtn")){

btns.innerHTML += `
<button id="createPostBtn" onclick="openPostModal()">
Create Post
</button>

<button id="logoutBtn" onclick="logoutAdmin()">
Logout
</button>
`;

}

const loginBtn =
btns.querySelector("button:nth-child(2)");

if(loginBtn){

loginBtn.remove();

}

}else{

const createBtn =
document.getElementById("createPostBtn");

const logoutBtn =
document.getElementById("logoutBtn");

if(createBtn) createBtn.remove();

if(logoutBtn) logoutBtn.remove();

}

});

window.publishPost = async function(){

const title =
document.getElementById("postTitle").value;

const category =
document.getElementById("postCategory").value;

const redirect =
document.getElementById("postRedirect").value;

const description =
document.getElementById("postDescription").value;

const content =
document.getElementById("postContent").value;

const imageFile =
document.getElementById("postImage").files[0];

const videoFile =
document.getElementById("postVideo").files[0];

let imageUrl = "";

let videoUrl = "";

try{

if(imageFile){

const imageRef = ref(
storage,
"images/" + Date.now() + imageFile.name
);

await uploadBytes(imageRef,imageFile);

imageUrl = await getDownloadURL(imageRef);

}

if(videoFile){

const videoRef = ref(
storage,
"videos/" + Date.now() + videoFile.name
);

await uploadBytes(videoRef,videoFile);

videoUrl = await getDownloadURL(videoRef);

}

await addDoc(collection(db,"posts"),{

title,
category,
redirect,
description,
content,
imageUrl,
videoUrl,
likes:0,
comments:0,
shares:0,
views:0,
created:Date.now()

});

alert("Post Published");

closePostModal();

location.reload();

}catch(error){

alert(error.message);

}

}

async function loadPosts(){

const container =
document.getElementById("postsContainer");

container.innerHTML = "";

const snapshot =
await getDocs(collection(db,"posts"));

snapshot.forEach((docSnap)=>{

const post = docSnap.data();

const id = docSnap.id;

const user = auth.currentUser;

const card = document.createElement("div");

card.className = "card";

card.innerHTML = `

${user ? `
<div class="three-dot" onclick="toggleMenu('${id}')">
⋮
</div>

<div class="dropdown" id="menu-${id}">
<button onclick="deletePost('${id}')">
Delete Post
</button>
</div>
` : ""}

${post.imageUrl ? `
<img src="${post.imageUrl}">
` : ""}

${post.videoUrl ? `
<video controls>
<source src="${post.videoUrl}">
</video>
` : ""}

<div class="content">

<div class="badge">
${post.category}
</div>

<h2>
${post.title}
</h2>

<p>
${post.description}
</p>

<div class="stats">

<button>
👁 ${post.views || 0}
</button>

<button>
👍 ${post.likes || 0}
</button>

<button>
💬 ${post.comments || 0}
</button>

<button>
↗ ${post.shares || 0}
</button>

</div>

<a
class="read-btn"
href="${post.redirect || '#'}"
target="_blank">

Read More

</a>

</div>

`;

container.appendChild(card);

});

}

window.toggleMenu = function(id){

const menu =
document.getElementById("menu-" + id);

if(menu.style.display === "block"){

menu.style.display = "none";

}else{

menu.style.display = "block";

}

}

window.deletePost = async function(id){

const confirmDelete =
confirm("Delete this post?");

if(!confirmDelete) return;

try{

await deleteDoc(doc(db,"posts",id));

alert("Post Deleted");

location.reload();

}catch(error){

alert(error.message);

}

}

loadPosts();
