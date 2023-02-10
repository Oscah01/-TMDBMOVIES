/**
 * Counts the number of comments in a given element
 * @param {HTMLElement} element
 * @returns {number} number of comments
 * */
 const countComment = (element) => element.querySelectorAll('#show-comm p').length;

 export default countComment;