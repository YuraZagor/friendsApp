const url = 'https://randomuser.me/api/?results=100';
const friendCardsArr = []
let friendsArr = []
let sortedFriendCardsArr = [...friendCardsArr]

const outputElement = document.querySelector('.output')


const assignUsers = async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		friendsArr = data.results;
		cardsCreate(friendsArr)
		console.log(friendsArr)
		console.log(friendCardsArr)
	} catch (error) {
		console.error(error)
	} 
 }
 assignUsers()

class FriendCard {
	constructor(image, firstName, lastName, age, phone, country){
		this.image = image;
		this.firstName = firstName;
		this.lastName=lastName;
		this.age=age;
		this.phone=phone;
		this.country=country;
	}
	render() {
		outputElement.insertAdjacentHTML('beforeend', `
			<li class="card">
				<img class="friendcard--img" src=${this.image} alt="">
				<p class="friendcard name">${this.firstName} ${this.lastName}</p>
				<p class="friendcard age">${this.age} years old</p>
				<p class="friendcard phone">${this.phone}</p>
				<p class="friendcard country">${this.country}</p>
			</li>`);
		}
} 

function cardsCreate(friendsArr){
	friendsArr.map((friendObj)=> {
		const {cell} = friendObj
		const { first, last } = friendObj.name
		const imgSrc = friendObj.picture.large;
		const country = friendObj.location.country
		const age = friendObj.dob.age;
		friendCardsArr.push(new FriendCard(imgSrc, first, last, age, cell, country))
	})
	friendCardsArr.forEach(card => card.render())
}




function sortingMin(param){
	sortedFriendCardsArr.sort( (firstFriend, secondFriend) => {
		return firstFriend.param - secondFriend.param
	});
}
function sortingMax(param){
	sortedFriendCardsArr.sort( (firstFriend, secondFriend) => {
		return secondFriend.param - firstFriend.param 
	});
}
