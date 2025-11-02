let add = document.getElementsByClassName("fa-plus-square");
let trash = document.getElementsByClassName("fa-trash");



Array.from(trash).forEach( elem => {
  elem.addEventListener('click', e => {
    const cardId = e.currentTarget.parentNode.parentNode.parentNode.dataset.id; //access to data-id
    console.log(cardId);
     fetch('/card', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'cardId': cardId
      })
    })
      .then(response => {
        if (response.ok)
          window.location.href = '/board';
      });
  });
  });

Array.from(add).forEach( elem => elem.addEventListener('click', createCard));
function createCard(elem) {
  //get drop zone
  const ul = elem.target.parentNode.nextElementSibling;
  //create li
  const newCard = document.createElement('li');
  newCard.innerHTML = `
  <p><input type="text" placeholder="Enter title..."></p>
  `;
  ul.appendChild(newCard);
  //lisen to input
  const input = newCard.querySelector('input');
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter' && input.value !== '') {
      fetch('/card', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'title': input.value,
          'status': newCard.parentNode.parentNode.className.split(' ')[0]
        })
      })
        .then(response => {
          if (response.ok)
            window.location.href = '/board';
        })
    }
  })
}



///Drag and drop API Learned from MDN/////////////
//https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

function dragstartHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.id); // get the li by data-id
}

const cards = document.querySelectorAll("li");
cards.forEach(card => card.addEventListener("dragstart", dragstartHandler));


// Cancel dragover so that drop can fire
const dropZones = document.querySelectorAll(".drop-zone");
dropZones.forEach(dropZone => {

  dropZone.addEventListener("dragover", e => {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", e => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    console.log(cardId);
    const card = document.querySelector(`[data-id='${cardId}']`);

    //prevent li inside li
    if (e.target.classList.contains('drop-zone'))
      e.target.appendChild(card);
    else
      e.target.parentNode.appendChild(card);

    console.log(dropZone.closest('section').classList[0]);

    //change card's status
    fetch('/card', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'cardId': cardId,
        'status': dropZone.closest('section').classList[0]
      })
    })
      .then(response => {
        if (response.ok)
          window.location.href = '/board';
      })
  });

})