const url = 'https://randomuser.me/api/?results=50';

let sortedUsers = '';
const cardsContainer = document.querySelector('.cards--container');
// const sortInput = document.querySelectorAll('.checkbox--icon');
const inputsForm = document.querySelector('.form');

const fetchUsers = async () => {
  
  let allUsersData = []
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const { results } = await response.json();
          for (let i=0; i<results.length; i++){
            allUsersData.push(results[i])
          }
      return allUsersData  
    }
  } catch (err) {
    console.error(err);
  }
};
let newData 

const initApp = async () => {
  let usersData = await fetchUsers();
  console.log(usersData)
  // handleInput(usersData)
  fillCardContainer(usersData);
  searchByUserName(usersData);
  resetUsers([...usersData]);
};
initApp();

function fillCardContainer(data) {
  let userCard;
  cardsContainer.innerHTML = '';
  data.forEach((item) => {
    userCard = createCard(item);
    cardsContainer.innerHTML += userCard;
  });
};

function createCard( {picture, name, dob, cell, gender, location}) {
	const card = `
		<div class="user-card ${gender}">
			<div class="user--img">
				<img class="user--image" src="${picture.large}" alt="" >
			</div>
			<div class="user-info">
				<h3 class="user-name">${name.first}</h3>
				<h3 class="user-name">${name.last}</h3>
				<p class="user-age">${dob.age} years old</p>
				<p class="user-phone"> ${cell}"</p> 
				<p class="user-country"> ${location.country} </p4> 
				<p class="user-city"> ${location.city} </p5> 
			</div>
		</div>
	`;
	return card;
};

inputsForm.onclick = function(event){
  let input = event.target.closest('input')
  if (!input) return;
  handleInput(input.value)
};

function handleInput(id, data) {
  let sortedData
  let genderFilteredData = data
  let forPrintData

  switch (id, data) {
    case 'Reset':
      resetUsers(data)

    case 'ageUp':
    case 'ageDown':
    case 'az':
    case 'za':
      console.log(inputsForm.value)
      sortedData = sortUsers(id, data)
      forPrintData = sortUsers(id, [...genderFilteredData])
      break;
    case 'male':
    case 'female':
    case 'all':
      console.log(inputsForm.value)
      forPrintData = filterByGender(id, sortedUsers)
      genderFilteredData = filterByGender(id, data)
      break;      
    default:
      break;
  }; 
  // console.log(sortedData) 
  console.log(sortedUsers) 
  fillCardContainer(forPrintData)
};

function sortUsers(data, id) {
  if (id === 'ageUp' || id === 'ageDown') {  
    data.sort((a, b) => a.dob.age - b.dob.age);
    return id === 'ageUp' ? data : data.reverse();
  }
  if (id === 'az' || id === 'za') {
    data.sort((a, b) => a.name.first.localeCompare(b.name.first));
    return id === 'az' ? data : data.reverse();
  }
}

function filterByGender(id, data) {
  if (id === 'female') {
    return data.filter((user) => user.gender === 'female');
  }
  if (id === 'male') {
    return data.filter((user) => user.gender === 'male');
  }
  return data;
};

const searchInput = document.querySelector('#user--names');
const searchByUserName = (data) => {
  sortedUsers = [...data];
  searchInput.addEventListener('input', () => {
    sortedUsers = allUsersData.filter((user) => user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (sortedUsers.length === 0) {
      document.querySelector('.cards--container').innerHTML = `
        <h2 class="no-matches-title">No corresponding user, try some other variants ...</h2>
      `;
    } else {
      fillCardContainer(sortedUsers);
    }
  });
};

const resetUsers = (data) => {
  fillCardContainer(data);
	searchInput.value = '';
  document.getElementById('sex--any').checked = true
  document.getElementById('empty').checked = true
};
