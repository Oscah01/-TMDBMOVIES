import { IMG_PATH } from "./index.js";

const popupShow = (object) => {
    const popupCard = document.createElement('li');
    const container = document.querySelector('.popup');
    container.innerHTML = '';
    const imgPop = IMG_PATH + object.poster_path;
    popupCard.classList.add('popup-card');
    popupCard.innerHTML = `
    <div class="burger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
      <div class="pop--img">
      <img src="${imgPop}" alt="${object.title} img">
      </div>
      <div class = "movie-summary">
      <h1 class="popupTitle">${object.title}</h1><br>
      <h4 class="popupOverview">${object.overview}</h4><hr>
      <h4 class="popupVote">Vote average : ${object.vote_average}</h4><hr>
      <h4 class="popupLang">Original language : ${object.original_language}</h4><hr>
      <h4 class="popupRelease">Release date : ${object.release_date}</h4><hr>
      <h4 class="popupVoCnt">Vote count : ${object.vote_count}</h4><hr>
      <h4 class="popupPopula">Movie popularity : ${object.popularity}</h4>
      </div>
    `;
    

    container.appendChild(popupCard);

    const closeButtons = document.querySelector('.burger');
    closeButtons.addEventListener('click', () => {
    document.querySelector('.popup.active').classList.remove('active');
  });
}

export default popupShow;

