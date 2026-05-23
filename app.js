import {
db
} from './firebase.js';

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const postsContainer =
document.getElementById('postsContainer');

async function loadPosts(){

postsContainer.innerHTML='';

const querySnapshot =
await getDocs(collection(db,'posts'));

querySnapshot.forEach((doc)=>{

const post = doc.data();

postsContainer.innerHTML += `

<div class="card">

<div class="three-dot"
onclick="toggleDropdown('${doc.id}')">
⋮
</div>

<div class="dropdown"
id="dropdown-${doc.id}">

<button onclick="editPost('${doc.id}')">
Edit Post
</button>

<button onclick="deletePost('${doc.id}')">
Delete Post
</button>

</div>

<img src="${post.image}">

<div class="content">

<span class="badge">
${post.category}
</span>

<h2>${post.title}</h2>

<p>${post.description}</p>

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

</div>

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

window.deletePost = (id)=>{

alert('Delete system coming soon');

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
