document.addEventListener('DOMContentLoaded', setUpPage)

let imageId = 1982 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageCard = document.querySelector('#image_card')

function setUpPage() {
  renderAllImages()
  commentFormHandler()
}

function getImages() {
    return fetch(imageURL).then(res => res.json())
}

function renderAllImages() {
    getImages().then((image) => {
        renderImage(image)
    })
}

function renderImage(image) {
    // console.log(image)
    const showImg = document.querySelector('#image')
    showImg.src = image.url
    showImg.dataset.id = image.id

    const showName = document.querySelector('#name')
    showName.textContent = image.name

    const showLikes = document.querySelector('#likes')
    showLikes.textContent = image.like_count

    const likeBtn = document.querySelector('#like_button')
    likeBtn.dataset.id = image.id

    const commentList = document.querySelector('#comments')
    image.comments.forEach(function(comment) {
        const commentContent = document.createElement('li')
        commentContent.textContent = comment.content
        commentList.appendChild(commentContent)
    })

    likeBtn.addEventListener('click', changeLike)
}

function changeLike() {
    // debugger
    let newLikes = parseInt(event.target.parentElement.querySelector('#likes').textContent)

    newLikes++

    event.target.parentElement.querySelector('#likes').textContent = newLikes

    let id = event.target.dataset.id
    updateLikes(id, newLikes)
}

function updateLikes(id, newLikes) {
    return fetch(likeURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            image_id: imageId,
            id: id,
            like_count: newLikes
        })
    })
}

function commentFormHandler() {
    const commentForm = document.querySelector('#comment_form')
    commentForm.addEventListener('submit', addComment)
}

function addComment() {
    const allComments = document.querySelector('#comments')
    const comment = document.createElement('li')
    allComments.appendChild(comment)

    event.preventDefault()

    let newComment = event.target.comment.value
    comment.textContent = newComment

    event.target.reset()

    createComment(newComment)
}

function createComment(newComment) {
    return fetch(commentsURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            image_id: imageId,
            content: newComment
        })
    })
}
