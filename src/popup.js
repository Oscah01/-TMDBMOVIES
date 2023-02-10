import { IMG_PATH } from "./index.js";
import { addComment, getComments } from "./comment-api.js";

const showComment = async (id) => {
  const result = await getComments(id);
  const commentSection = document.getElementById('show-comm');

  if (result.length > 0) {
    commentSection.innerHTML = `<h3>comments : (${result.length})</h3> <hr>`;
    result.forEach(element => {
      commentSection.innerHTML += `
      <p>* Date : ${element.creation_date} | ${element.username} Commented : ${element.comment}</p>
    `;
    });
  } else {
  commentSection.innerHTML = '<h3>comments : (0)</h3>';
  }
}  

const popupShow = (object) => {
    const popupCard = document.createElement('li');
    const container = document.querySelector('.popup');
    container.innerHTML = '';
    const imgPop = IMG_PATH + object.poster_path;
    popupCard.classList.add('popup-card');
    popupCard.innerHTML = `
    <div class="burger">X</div>
    <div class="pop--img">
      <img src="${imgPop}" alt="${object.title} img">
      
      <div id = "show-comm">
      ${showComment(object.id)}
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
        <h3>Add a comment : </h3>
        <input id= "name-input" type="text" placeholder="Your name" required>
        <input id= "insights-input" type="text" placeholder="Your comment" required>
        
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

  SubmitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if(usernameInput.value =='' || commentInput.value == ''){
      usernameInput.placeholder = 'Please fill your name';
      commentInput.placeholder = 'Please add your comment';
    }else {
      await addComment(object.id, usernameInput.value, commentInput.value);
      showComment(object.id);
      usernameInput.value = '';
      commentInput.value = '';
    }


  });
}

export default popupShow;

