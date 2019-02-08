document.addEventListener('DOMContentLoaded', initPage)


  let imageId = 1927 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/1927`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

function initPage(){
  fetchImage()
  buttonHandler()
  formHandler()
}

function buttonHandler(){
  let button = document.querySelector('#like_button')
  button.addEventListener('click', addLike)
}

function formHandler(){
  let form = document.querySelector('form')
  form.addEventListener('submit', addComment)
}

function fetchImage(){
  fetch('https://randopic.herokuapp.com/images/1927')
  .then(res => res.json())
  .then(showImage)
}

function showImage(data){
  console.log(data)

  let name = document.querySelector('#name')
  name.innerText = data.name

  let image = document.querySelector('#image')
  image.src = data.url

  let likes = document.querySelector('#likes')
  likes.innerText = data.like_count



  let comments = data.comments
  comments.forEach(comment => {
    let commentContainer = document.querySelector('#comments')

    let li = document.createElement('li')
    li.textContent = comment.content
    commentContainer.appendChild(li)

    let dltBut = document.createElement('button')
    dltBut.innerText = "Delete"
    dltBut.dataset.id = comment.id
    dltBut.addEventListener('click', deleteMe)
    li.appendChild(dltBut)


  })

}


function addLike(){
  let likes = parseInt(document.querySelector('#likes').innerText)

  ++likes

  document.querySelector('#likes').innerText = likes


  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      like_count: likes
    })
  })

}



function addComment(event){
  event.preventDefault()
  let form = document.querySelector('form')
  let commentContainer = document.querySelector('#comments')

  let li = document.createElement('li')
  li.innerText = form.comment.value
  commentContainer.appendChild(li)

  let comment = form.comment.value

  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })


  event.target.reset()

}




function deleteMe(){

  event.target.parentElement.remove()

  let id = event.target.dataset.id

  fetch(`https://randopic.herokuapp.com/comments/${id}`, {
    method: 'DELETE'
  })
}
