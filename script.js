const url = 'https://randomuser.me/api/?results=10';
const usersDataArr = []
const outputElement = document.querySelector('.output')

// const getUsersData = fetch(url)
// 	.then(response => response.json())
// 	.then(result =>  result.results)
// 	.then (console.log(usersDataArr))

// const getUsersData = async (url) => {	
// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		return data.results;
// 	} catch (error) {
// 		renderErrorMessage(message.failure, error)
// 	} finally {
// 		loading.remove();
// 	}
// 	};

class UserCard {
	constructor(img, firstName, lastName, age, phone){
		this.image = img;
		this.firstName = firstName;
		this.lastName=lastName;
		this.age=age;
		this.phone=phone;
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


