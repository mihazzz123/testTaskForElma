import updateComponent from '../utils/updateComponent';
import getWeek         from '../utils/getWeek';

import calendarDays from '../componets/calendarDays';
import users        from '../componets/users';
import tasks        from '../componets/tasks';

export default function () {
	
	const weekPrev = document.querySelector('#weekPrev');
	const weekNext = document.querySelector('#weekNext');
	const changeWeek = i => {
		window.state.today.index = i;
		getWeek(window.state.today.index);
		updateComponent(calendarDays());
		updateComponent(users(window.state.users));
		tasks(window.state.tasks);
	}
	weekPrev.onclick = () => changeWeek(window.state.today.index - 7);
	weekNext.onclick = () => changeWeek(window.state.today.index + 7);
}