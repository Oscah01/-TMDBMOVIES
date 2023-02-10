import countComment from '../countComment.js';

describe('the number comments', () => {
  const comments = `<div id="show-comm"><h3>comments : (2)</h3> <hr>
  <p>* Date : 2023-02-10 | Ouail Commented : Great movie</p>

  <p>* Date : 2023-02-10 | fr Commented : er</p>
</div>`;

  it('should count the comment count', () => {
    const element = document.createElement('div');
    element.innerHTML = comments;

    const numberOfShows = countComment(element);

    expect(numberOfShows).toBe(2);
  });
});