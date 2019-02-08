document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const likeBtn = document.querySelector('#like_button')
  const commentForm = document.querySelector('#comment_form')

  getImg().then(renderImg)

  likeBtn.addEventListener('click', likeImg)
  commentForm.addEventListener('submit', commentImg)
})

function likeImg() {
  let likesNum = parseInt(likes.textContent)
  likes.textContent = ++likesNum

  updateLikes(likesNum)
}

function commentImg() {
  event.preventDefault()

  const comment = event.target.comment.value

  renderComment(comment)

  updateComment(comment)

  event.target.reset()
}
