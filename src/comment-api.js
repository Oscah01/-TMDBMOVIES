
const API_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsUrl = '/apps/azdzaazasa/comments';

export const addComment = async (id, user, comment) => {
    await fetch(`${API_URL}${commentsUrl}`,
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
    const request = await fetch(`${API_URL}${commentsUrl}?item_id=${incomingItemId}`);
    const tech = await request.json();
    return tech;
};