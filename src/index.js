let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  handleNewToy()
  getToys()
  newToyForm()
});

const newToyForm = () => {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyName = e.target.name.value
    const newToyImage = e.target.image.value

    const newToyObj = {
      name: newToyName,
      image: newToyImage,
      like: 0
    }
    renderToy(newToyObj)
  })
}

const handleNewToy = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys =>  toys.forEach(toy => renderToy(toy)))
}

const renderToy = (toy) => {
  const toyCard = document.createElement('div')
  toyCard.className = "card"

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement('button')
  likeBtn.innerText = `Like <3`
  likeBtn.className = 'like-btn'
  likeBtn.id = toy.id
  
  toyCard.append(toyName, toyImage, toyLikes, likeBtn)

  likeBtn.addEventListener('click', (e) => {
    const currentLikes = e.target.previousSibling.innerText
    const actualLikes = currentLikes.split(" ")[0]

    e.target.previousSibling.innerText = `${parseInt(actualLikes) + 1} Likes`
  })

  const toyCollection = document.querySelector('#toy-collection')
  toyCollection.append(toyCard)
}



