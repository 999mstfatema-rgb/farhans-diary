import {
db
} from './firebase.js';

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const postsContainer =
document.getElementById('postsContainer');

async function loadPosts(){

postsContainer.innerHTML='';

const querySnapshot =
await getDocs(collection(db,'posts'));

querySnapshot.forEach((docSnap)=>{

const post = docSnap.data();

postsContainer.innerHTML += `

<div class="card">

${localStorage.getItem('isAdmin') === 'true'

? `

<div class="three-dot"
onclick="toggleDropdown('${docSnap.id}')">
⋮
</div>

<div class="dropdown"
id="dropdown-${docSnap.id}">

<button onclick="editPost('${docSnap.id}')">
Edit Post
</button>

<button onclick="deletePost('${docSnap.id}')">
Delete Post
</button>

</div>

`

: ''}

${post.image

? `<img src="${post.image}">`

: ''}

${post.video

? `
<video controls width="100%">
<source src="${post.video}">
</video>
`

: ''}

<div class="content">

<span class="badge">
${post.category || 'News'}
</span>

<h2>${post.title || ''}</h2>

<p>${post.description || ''}</p>

<div class="stats">

<button>
👍 ${post.likes || 0}
</button>

<button>
💬 ${post.comments || 0}
</button>

<button>
🔗 ${post.shares || 0}
</button>

<button>
👁 ${post.views || 0}
</button>

</div>

${post.redirectUrl

? `

<a href="${post.redirectUrl}"
target="_blank"
class="read-btn">

Read More

</a>

`

: ''}

</div>

</div>

`;

});

}

loadPosts();

window.toggleDropdown = (id)=>{

const menu =
document.getElementById(`dropdown-${id}`);

menu.style.display =
menu.style.display === 'block'
? 'none'
: 'block';

}

window.editPost = (id)=>{

alert('Edit system coming soon');

}

window.deletePost = async(id)=>{

const confirmDelete =
confirm('Delete this post?');

if(!confirmDelete) return;

try{

await deleteDoc(doc(db,"posts",id));

alert('Post Deleted');

location.reload();

}catch(err){

alert(err.message);

}

}

window.toggleTheme = ()=>{

document.body.classList.toggle('dark');

localStorage.setItem(
'theme',
document.body.classList.contains('dark')
? 'dark'
: 'light'
);

}

if(localStorage.getItem('theme') === 'dark'){

document.body.classList.add('dark');

}

const audio = new Audio(
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
);

window.toggleMusic = ()=>{

if(audio.paused){

audio.play();

}else{

audio.pause();

}

}

const searchInput =
document.getElementById('searchInput');

if(searchInput){

searchInput.addEventListener('keyup',()=>{

const value =
searchInput.value.toLowerCase();

document.querySelectorAll('.card')
.forEach(card=>{

card.style.display =
card.innerText.toLowerCase()
.includes(value)

? 'block'
: 'none';

});

});

}
