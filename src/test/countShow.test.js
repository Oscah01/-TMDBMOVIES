import countShow from '../countShow.js';

describe('the number of shows', () => {
  const mazeGrid = `<div class="movie">
  <img src="https://image.tmdb.org/t/p/w1280/jhlc1nsD8nnnGymEFaZ0twMH6M6.jpg" alt="The Independent">
  <div class="movie-info">
<h3>The Independent</h3>
<span class="orange">7.5</span>
  </div>
  <div class="overview">
<h3>Overview</h3>
It's the final weeks of the most consequential presidential election in history. America is poised to elect either its first female president or its first viable independent candidate. Reporting history as it's made, an idealistic young journalist teams up with her idol, legendary journalist Nick Booker, to uncover a conspiracy that places the fate of the election, and the country, in their hands.
<div class="likes">
<div id="878183" class="heart"></div>
<p class="likes-number">1</p>
<div class="animationHeart"></div>
</div>
<div class="button">
<button class="movie-btn">comments</button>
</div>
</div></div><div class="movie">
  <img src="https://image.tmdb.org/t/p/w1280/vcym9A0idLCFI1iIMRFiXKRvnbs.jpg" alt="Evil Eye">
  <div class="movie-info">
<h3>Evil Eye</h3>
<span class="orange">6.8</span>
  </div>
  <div class="overview">
<h3>Overview</h3>
Nala, a thirteen-year-old girl from the city, travels with her family to her grandmother's home in the countryside, to try to find a cure for her little sister's mysterious illness - But she'll soon find her granny is not exactly what she seems...
<div class="likes">
<div id="943221" class="heart"></div>
<p class="likes-number">1</p>
<div class="animationHeart"></div>
</div>
<div class="button">
<button class="movie-btn">comments</button>
</div>
</div></div>`;

  it('should count the comment count', () => {
    const element = document.createElement('div');
    element.innerHTML = mazeGrid;

    const numberOfShows = countShow(element);

    expect(numberOfShows).toBe(2);
  });
});