const url = 'https://randomuser.me/api/?results=10';
let friendsDataArr = []
// const outputElement = document.querySelector('.output')


const assignUsers = async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		friendsDataArr = data.results;
		console.log(friendsDataArr)
	} catch (error) {
		renderErrorMessage('unable to connect, try again', error)
	} 
 }
 assignUsers()

class FriendCard {
	constructor(img, firstName, lastName, age, phone, country){
		this.image = img;
		this.firstName = firstName;
		this.lastName=lastName;
		this.age=age;
		this.phone=phone;
		this.country=country;
	}
	render() {
		outputElement.insertAdjacentHTML('beforeend', `
			<li class="card">
				<img class="usercard--img" src=${this.imgSrc} alt="">
				<p class="usercard name">${this.firstName} ${this.lastName}</p>
				<p class="usercard age">${this.age} years old</p>
				<p class="usercard phone">${this.phone}</p>
			</li>`);
		}
} 

function renderAllFriends(friendsDataArr){
	friendsDataArr.map((friendObj)=> {
		const {cell, gender} = friendObj
		const { first, last } = friendObj.name
		const imgSrc = friendObj.picture.medium;
		const country = friendObj.location.country
		const age = friendObj.dob.age;
		new FriendCard(imgSrc, first, last, age, cell, country).render()
	})
}