import htmlToElement from '../../utils/htmlToElement'
import Calendar      from './index.html';
import calendarBtn   from '../calendarBtn';
import calendarDays  from '../calendarDays';
import users         from '../users';

import './index.scss';

export default function calendar() {
	let calendar = htmlToElement(Calendar);
	calendar.querySelector('.calendarTop').append(calendarBtn, calendarDays());
	calendar.append(users(window.state.users));
	return calendar;
}