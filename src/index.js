/* eslint-disable camelcase */
import './style.css';
import popupShow from './popup.js';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4663d1ba381b00aac6874230f49f551&page=3';
const APP_ID = 'r5rxF20VmKmZGxe859n1';
const LIKES_URL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${APP_ID}/likes/`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c4663d1ba381b00aac6874230f49f551&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const postLikes = async (movieID) => {
  const likeTarget = document.getElementById(`${movieID}`);
  const likesNumber = likeTarget.nextSibling.nextSibling;
  likesNumber.textContent = +likesNumber.textContent + 1;
  await fetch(LIKES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: `${movieID}`,
    }),

  });
};

async function fetchLikes() {
  const res = await fetch(LIKES_URL);
  const data = await res.json();
  return data;
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  }
  if (vote >= 5) {
    return 'orange';
  }
  return 'red';
}

async function showMovies(movies) {
  const likes = await fetchLikes();
  main.innerHTML = '';
  movies.forEach((movie) => {
    const like = likes.find((l) => +l.item_id === +movie.id);
    const {
      title, poster_path, vote_average, overview,
    } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
          <div class="likes">
          <div id=${movie.id} class="heart"></div>
          <p class="likes-number"> ${like ? like.likes : 0}</p>
          <div class="animationHeart"></div>
          </div>
          <div class="button">
          <button class="movie-btn">comments</button>
          </div>
        `;
    const heart = movieEl.querySelector('.heart');
    const animationHeart = movieEl.querySelector('.animationHeart');

    heart.addEventListener('click', (e) => {
      postLikes(e.target.id);
      animationHeart.classList.add('animation');
      heart.classList.add('fill-color');

      animationHeart.addEventListener('animationend', () => {
        animationHeart.classList.remove('animation');
        heart.classList.remove('fill-color');
      });
    });

    //   animationHeart.addEventListener('click',() => {
    //     animationHeart.classList.remove
    //     ('animation')
    //     heart.classList.remove('fill-color');
    //   })

    main.appendChild(movieEl);
  });

  document.querySelectorAll('.movie-btn').forEach((cardBtn, i) => {
    cardBtn.addEventListener('click', async () => {
      const popupContainer = document.querySelector('.popup');
      popupContainer.classList.add('active');
      popupShow(movies[i]);
    });
  });
}
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}
getMovies(API_URL);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

export { getMovies, IMG_PATH };
