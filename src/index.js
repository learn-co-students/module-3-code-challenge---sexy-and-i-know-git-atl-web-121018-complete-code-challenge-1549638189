document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1983

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')
  const image = document.querySelector('#image')
  const nameCont = document.querySelector('#name')
  const likesCont = document.querySelector('#likes')
  const likeButton = document.querySelector('#like_button')
  const commentCont = document.querySelector('#comments')
  const commentInput = document.querySelector('#comment_input')
  const form = document.querySelector('form')
  // const submitButton = document.querySelector()

  function fetchImage() {
    return fetch(imageURL).then((res) => res.json())
  }

  function showImage() {
    fetchImage().then(function(imageInfo) {
      // console.log(imageInfo)
      image.src = imageInfo.url
      nameCont.textContent = imageInfo.name
      likesCont.textContent = imageInfo.like_count
      imageInfo.comments.forEach((c) => {
        comment = document.createElement('li')
        comment.textContent = c.content
        commentCont.appendChild(comment)
      })
      likeButton.addEventListener('click', function(){addLike(imageInfo)})
      //comment stuff
      form.addEventListener('submit', function(){addComment(imageInfo)})
    })
    // console.log(form)
  }

  showImage()



  function renderLikes(imageInfo) {
    imageInfo.like_count += 1
    newLikes = imageInfo.like_count
    likesCont.textContent = newLikes
  }

  function addLike(imageInfo) {
    //let newLikes = imageInfo.like_count + 1
    // console.log(newLikes)
    // optimistic rendering
    renderLikes(imageInfo)
    //likesCont.textContent = newLikes
    likesURL = 'https://randopic.herokuapp.com/likes'
    fetch(likesURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
    //
    // setTimeout(updateLikes(), 60)
    // updateLikes()
  }

  function renderComment(comment) {
    newComment = document.createElement('li')
    newComment.textContent = comment
    commentCont.appendChild(newComment)
  }

  function addComment(imageInfo) {
    event.preventDefault()
    // console.log(event.target.comment.value)
    // optimistically render
    const newComment = event.target.comment.value
    renderComment(newComment)
    form.reset()
    commentURL = 'https://randopic.herokuapp.com/comments'
    fetch(commentURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      })
    })
  }

})

// function updateLikes(imageInfo) {
  //   fetchImage().then(function(imageInfo) {
    //     likesCont.textContent = imageInfo.like_count
    //   })
    // }
    // lol
