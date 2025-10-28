var thumb = document.getElementsByClassName("thumb");
var trash = document.getElementsByClassName("fa-trash");
var add = document.getElementsByClassName("fa-plus-square");


Array.from(thumb).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText

    let whichThumb = this.classList.contains("fa-thumbs-up") ? 'thumbUp' : 'thumbDown';

    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumb': whichThumb
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});



Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(add).forEach(e => e.addEventListener('click', createCard));

function createCard(e){
  //get drop zone
  const ul = e.target.parentNode.nextElementSibling;
  //create li
  const newCard = document.createElement('li');
  newCard.innerHTML = `
  <p><input type="text" placeholder="Enter title..."></p>
  `;
  ul.appendChild(newCard);
  //lisen to input
  const input = newCard.querySelector('input');
  input.addEventListener('keypress', e=>{
    if(e.key==='Enter' && input.value !== ''){
      fetch('/card', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': input.value,
        'status': newCard.parentNode.parentNode.className
      })
    })
      .then(response => {
        if (response.ok)
          window.location.href = '/board'; 
      })
    }
  })
}



///Drag and drop API Learned from MDN🤍/////////////
  //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

// function dragstartHandler(e) {
//   e.dataTransfer.setData("text/plain", e.target.classList[0]); // get the li by classname
// }

// const cards = document.querySelectorAll("li[class^='card-']");
// cards.forEach(card => card.addEventListener("dragstart", dragstartHandler));


// // Cancel dragover so that drop can fire
// const dropZones = document.querySelectorAll(".drop-zone");
// dropZones.forEach(dropZone => {

//   dropZone.addEventListener("dragover", (ev) => {
//     ev.preventDefault();
//   });

//   dropZone.addEventListener("drop", (ev) => {
//     ev.preventDefault();
//     const cardName = ev.dataTransfer.getData("text/plain");
//     console.log(cardName);
//     const card = document.querySelector(`.${cardName}`);
//     console.log(ev.target);

//     //prevent li inside li
//     if (ev.target.classList.contains('drop-zone'))
//       ev.target.appendChild(card);
//     else
//       ev.target.parentNode.appendChild(card); 
//   });

// })
//////////////////////////////

//Drop down menu
  const button = document.getElementById('menuButton');
  const dropdown = document.getElementById('dropdown');
  button.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });


///////////////////////////////






