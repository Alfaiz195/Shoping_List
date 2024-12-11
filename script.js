const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

function displayItems() {
  const itemsFormStorage = getItemsFromStrorage();
  itemsFromStoragel.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (itemInput.value === '') {
    alert('Please add an item');
    return;
  }

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStroage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }else {
    if(checkIfItemExists(newItem)){
      alert('That item already exists!');
      return;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  //Add item to local storage
  addItemTostorage(newItem);

  checkUI();

  itemInput.value = '';
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  //Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemTostorage(item) {
  const itemsFromStorage = getItemsFromStrorage();

  //Add new item to array
  itemsFromStorage.push(item);

  //Convert to JSONstring and set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStrorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemTOEdit(e.target);
  }
}

function checkIfItemExists(item){
  const itemsFromStorage = getItemsFromStrorage();

  return itemsFromStorage.includes(item);

  
}

function setItemToEdit(item) {
  iseditMode = true;

  itemList
    .querySelectorAll('li')
    .forEacj((i) => i, classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTMl = '<i class ="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

// use console.log(e.terarget.parentElement.classList) to find className
function removeItem(item) {
  if (confirm('Are you sure?')) {
    //Remove item form DOM
    item.remove();

    // Remove item form storage
    removeItemFromStorge(item.textContent);

    checkUI();
  }
}

function removeItemFromStroage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // filterr outt item tobe removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  if (confirm('Are you sure?')){
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // clear from localStorage
  localStorage.removeItem('items');}

  checkUI();
}

function filterItem(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value ='';

  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'Block';
    itemFilter.style.display = 'Block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode =false;
}
//Initialize App
function init() {
  //Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', itemFilter);
  document.addEventListener('DOMContentLoded', displayItems);

  checkUI();
}

init();
