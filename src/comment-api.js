const URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsUrl = '/apps/UHGxdjdJQHx0gaXtgTL4/comments/';

export const addComment = async (id, user, comment) => {
  await fetch(`${URL}${commentsUrl}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: id,
        username: user,
        comment,
      }),
    });
};

export const getComments = async (incomingItemId) => {
  const request = await fetch(`${URL}${commentsUrl}?item_id=${incomingItemId}`);
  const moviee = await request.json();
  return moviee;
};