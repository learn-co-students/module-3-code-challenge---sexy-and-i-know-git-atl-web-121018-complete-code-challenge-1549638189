let imageId = 1984 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', (setupPage) => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // let imageId = 1984 //Enter the id from the fetched image here
	//
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
	//
  // const likeURL = `https://randopic.herokuapp.com/likes/`
	//
  // const commentsURL = `https://randopic.herokuapp.com/comments/`

	makeRequest(imageURL)
	addFormHandler()
})

	function makeRequest(imageURL) {
		fetch(imageURL)
		.then(res => res.json())
    .then(getPage)
	}

	function getPage(image) {
		// let title = document.querySelector('h4#name')
		let imageId = document.querySelector('img#image')
		imageId.src = image.url

		let imageName = document.querySelector('h4#name')
		imageName.textContent = image.name

		let likes = document.querySelector('span#likes')
		likes.textContent = image.like_count

		let button = document.querySelector('button#like_button')
		button.addEventListener('click', () => addLike(image))

		// let imgName = image.name
		// let imgURL = image.url
		// let imgLikes = image.like_count
		// let comments = image.c
	}

	function addLike(image) {

		// console.log(event)
	  let likes = image.like_count
	  let id = image.id
	  likes = likes + 1;
	  updateLikes(likes, id)
	}

	function updateLikes(likes, id) {
		// console.log(likes)
		// console.log(id)
	  return fetch(`https://randopic.herokuapp.com/likes`,{
	    method: 'POST',
	    headers:
	    {
	      "Content-Type": "application/json",
	      Accept: "application/json"
	    },
	    body: JSON.stringify({
	      id: 1984
	    })
	  })
	}

	function addFormHandler() {
  	let form = document.querySelector("#comment_form");
  	form.addEventListener('submit', handleSubmit)
	}

	function handleSubmit() {
		event.preventDefault();
		const container = document.querySelector('ul#comments')
		const inputElement = document.querySelector('input#comment_input')

		const comment = document.createElement('li')

		const container = document.querySelector('ul#comments')

	}
