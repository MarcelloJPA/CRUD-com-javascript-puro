window.addEventListener('load', start)

let globalNames = ['um', 'dois', 'tres', 'quatro'];
let currentIndex = null
let isEditing = false;


function start() {
  preventFormSubmit()
  activateInput()
  render()

  let inputName = document.querySelector('#inputName')
}


/* Evitar o recarregamento da página*/
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault()
  }
  var form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
}

/* Ativar o focus no input sem precisar clicar */
function activateInput() {
  function insertName(newName) { //Colcoca o valor no Array
    globalNames.push(newName)
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName

  }
  function handleTyping(event) { /* Quando pressionar Enter chama a função insertName*/
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
      }
      else {
        insertName(event.target.value)
      }
      isEditing = false

      render()

    }
  }
  inputName.focus()
  inputName.addEventListener('keyup', handleTyping)
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1)
      render()
    }

    let button = document.createElement('button')
    button.classList.add('deleteButton')
    button.textContent = 'x'
    button.addEventListener('click', deleteName)
    return button
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus()
      isEditing = true
      currentIndex = index
    }

    let span = document.createElement('span')
    span.classList.add('clickable')
    span.textContent = name
    span.addEventListener('click', editItem)
    return span
  }



  let divNames = document.querySelector('#names');
  divNames.innerHTML = ''

  let ul = document.createElement('ul');

  for (i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    let li = document.createElement('li')
    let button = createDeleteButton(i)
    let span = createSpan(currentName, i)


    li.classList.add('circle')


    ul.appendChild(li)//li fica dentro de ul
    li.appendChild(button)//button fica dentro de li
    li.appendChild(span)// span fica dentro de li
  }

  divNames.appendChild(ul)
  clearInput()
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}