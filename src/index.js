document.addEventListener('DOMContentLoaded', setupPage)

let imageId = 1981 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageCard = document.querySelector('#image_card')
const commentContainer = document.querySelector('#comments')
const likeBtn = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')

let picture = document.querySelector('#image')
let title = document.querySelector('#name')
let likes = document.querySelector('#likes')

function setupPage() {
  likeHandler()
  formHandler()
  renderImage()
  renderComments()
} 

function renderImage() {
  getImage().then(imageView)
} 

function getImage() {
  return fetch(imageURL).then(res => res.json())
} 

function imageView(image) {
  picture.src = image.url 
  title.textContent = image.name 
  likes.textContent = image.like_count
} 

function renderComments() {
  getImage().then(commentView)
} 

function commentView(image) {
  commentContainer.textContent = ""
  let allComments = image.comments 
  // debugger
  allComments.forEach(c => {
    let comment = document.createElement('li')
    comment.textContent = c.content
    commentContainer.appendChild(comment)

      let delBtn = document.createElement('button')
      delBtn.textContent = "Delete Me"
      delBtn.dataset.id = c.id 
      delBtn.addEventListener('click',removeComment)
      comment.appendChild(delBtn)
  })
}

function likeHandler() {
  likeBtn.addEventListener('click', addLike)
} 

function addLike() {
  let newLikes = parseInt(likes.textContent) + 1
  likes.textContent = newLikes 

  updateLikes()
} 

function updateLikes() {
  return fetch(likeURL,{
    method: 'POST',
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      image_id: imageId
    })
  })   
} 

function formHandler() {
  commentForm.addEventListener('submit',newComment)
} 

function newComment() {
  event.preventDefault()
  let newContent = event.target.comment.value
  createComment(newContent).then(renderComments)
  event.target.reset()
}

function createComment(newContent) {
  return fetch(commentsURL,{
    method: 'POST',
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      image_id: imageId, 
      content: newContent
    })
  })  
} 

function removeComment() {
  let byeComment = event.target.parentElement
  byeComment.parentElement.removeChild(byeComment) 

  let id = event.target.dataset.id 
  deleteComment(id) 
} 

function deleteComment(id) {
  return fetch(`https://randopic.herokuapp.com/comments/${id}`,{
    method: 'DELETE'
  })  
}