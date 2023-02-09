const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4663d1ba381b00aac6874230f49f551&page=3';
const URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsUrl = '/apps/G2GQQAue4EZGjaPnDQMx/comments/';

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