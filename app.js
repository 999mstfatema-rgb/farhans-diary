import {
  db
} from './firebase.js';

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const postsContainer = document.getElementById('postsContainer');

async function loadPosts(){

  postsContainer.innerHTML = '';

  const querySnapshot = await getDocs(collection(db,'posts'));

  querySnapshot.forEach((doc)=>{

    const post = doc.data();

    postsContainer.innerHTML += `
    <div class="card">

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
