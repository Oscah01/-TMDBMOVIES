import './style.css';
import popupShow from './popup';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4663d1ba381b00aac6874230f49f551&page=2'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c4663d1ba381b00aac6874230f49f551&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')



// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''
    console.log(IMG_PATH + movies[0].poster_path);
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, heart1,animationHeart1, button } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
          <div class="heart"></div>
          <div class="animationHeart"></div>
          <div class="button">
          <button class="movie-btn">comments</button>
          </div>

        `
       
        main.appendChild(movieEl)

       
    });
    document.querySelectorAll('.movie-btn').forEach((cardBtn, i) => {
        cardBtn.addEventListener('click', async () => {
          const popupContainer = document.querySelector('.popup');
          popupContainer.classList.add('active');
          popupShow(movies[i]);
        });
      });
    
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})


export {getMovies, IMG_PATH};

