import calendarDaysItem from '../calendarDaysItem';
import './index.scss';


export default function () {
	let calendarDays = document.createElement('div');
	calendarDays.id = 'calendarDays';
	calendarDays.classList.add('calendarDays');
	window.state.week.map(day => {
		calendarDays.append(calendarDaysItem(day));
	});
	return calendarDays;
}

