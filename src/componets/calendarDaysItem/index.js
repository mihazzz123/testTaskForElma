import './index.scss';

export default function (day) {
	let calendarDaysItem = document.createElement('div');
	calendarDaysItem.classList.add('calendarDaysItem');
	calendarDaysItem.textContent = day.name;
	calendarDaysItem.dataset.date = day.date;
	return calendarDaysItem;
}

