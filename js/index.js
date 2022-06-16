'use strict';

const container = document.querySelector('.word');
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');

function getWord(word) {
  if (word === '') {
    alert('Please enter a word');
  } else {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((data) => {
        let noun = data[0].phonetics[0].text;
        let audioSrc = data[0].phonetics[0].audio;
        if (!noun) {
          noun = data[0].phonetics[1].text;
        }
        if (!audioSrc) {
          audioSrc = data[0].phonetics[1].audio;
        }
        const audio = new Audio(audioSrc);
        container.innerHTML = `
          <div class="word__searched">
            <h1 class="word__name">${word}</h1>
            <button class="word__sound">
              <img src="./assets/img/sound.svg" alt="sound">
            </button>
          </div>
          <span class="word__noun">noun ${noun}</span>
          <p class="word__definition">${data[0].meanings[0].definitions[0].definition}</p>
        `;
        const wordSound = document.querySelector('.word__sound')
        wordSound.addEventListener('click', () => {
          audio.play()
        })
      })
      .catch((err) => {
        if ((err.message = 'Failed to fetch')) {
          alert('Word not found');
        } else {
          alert('Please check your connection');
        }
      });
  }
}

searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    getWord(e.target.value);
  }
});

searchBtn.addEventListener('click', () => {
  getWord(searchInput.value);
});
