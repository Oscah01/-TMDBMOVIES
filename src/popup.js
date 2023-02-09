import { IMG_PATH } from "./index.js";
import { addComment, getComments } from "./comment-api.js";

const newDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

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
      <div id = "show-comm">
        <h3>comments : </h3>
      </div>
    </div>
    <div class = "movie-summary">
      <h1 class="popupTitle">${object.title}</h1><br>
      <h4 class="popupOverview">${object.overview}</h4><hr>
      <h4 class="popupVote">Vote average : ${object.vote_average}</h4><hr>
      <h4 class="popupLang">Original language : ${object.original_language}</h4><hr>
      <h4 class="popupRelease">Release date : ${object.release_date}</h4><hr>
      <h4 class="popupVoCnt">Vote count : ${object.vote_count}</h4><hr>
      <h4 class="popupPopula">Movie popularity : ${object.popularity}</h4>
      <div class="comment">
        <h3>Add a comment :</h3>
        <input id= "name-input" type="text" placeholder="Your name" required>
        <input id= "insights-input" type="text" placeholder="Your insights" required>
        
        <button type="button" id="comment-btn">Comment</button>
      </div>
    </div>
    `;
    

    container.appendChild(popupCard);

    const closeButtons = document.querySelector('.burger');
    closeButtons.addEventListener('click', () => {
    document.querySelector('.popup.active').classList.remove('active');
  });

  const SubmitButton = document.getElementById('comment-btn');
  const usernameInput = document.getElementById('name-input');
  const commentInput = document.getElementById('insights-input');
  const divComPar = document.getElementById('show-comm');

  SubmitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await addComment(object.id, usernameInput.value, commentInput.value);
    const result = await getComments(object.id);



    divComPar.innerHTML += `Date : ${newDate()} <br> 
    Name : ${usernameInput.value}<br> 
    Insights : ${commentInput.value}<hr>
    `;



  });
}

export default popupShow;

