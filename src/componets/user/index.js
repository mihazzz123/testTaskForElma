import htmlToElement from '../../utils/htmlToElement'
import htmlUser      from './index.html';

import './index.scss';


export default function (user) {
	let userRow = htmlToElement(htmlUser);
	userRow.id = user.id;
	userRow.dataset.username = user.username;
	
	let userName = document.createElement('div');
	userName.classList.add('userName');
	userName.dataset.executor = user.id;
	userName.textContent = `${!!user.firstName ? user.firstName : ''} ${!!user.surname ? user.surname : ''} ${!!user.secondname ? user.secondname : ''}`;
	
	userRow.append(userName);
	
	let userWeek = window.state.week.map(day => {
		let userDay = document.createElement('div');
		userDay.classList.add('userDay');
		userDay.dataset.day = day.name;
		userDay.dataset.date = day.date;
		userDay.dataset.executor = user.id;
		userRow.append(userDay);
	});
	
	return userRow;
}

