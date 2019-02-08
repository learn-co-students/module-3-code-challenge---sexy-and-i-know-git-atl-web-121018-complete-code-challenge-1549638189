const likes = document.querySelector('#likes')
const commentsUl = document.querySelector('#comments')


function renderImg(imgData) {
  console.log(imgData);

  const img = document.querySelector('#image')
  img.src = imgData.url

  const name = document.querySelector('#name')
  name.textContent = imgData.name

  likes.textContent = imgData.like_count

  imgData.comments.forEach((comment) => renderComment(comment.content))
}

function renderComment(comment) {
  const commentLi = document.createElement('li')
  commentLi.textContent = comment
  commentsUl.appendChild(commentLi)
}
