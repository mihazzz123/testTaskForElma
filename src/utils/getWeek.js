window.state = {};
// Получаю дату
const getDate = index => {
	let offsetDay = 86400000 * index;
	let dateTemp = new Date(Date.now() + offsetDay);
	let day = String(dateTemp.getDate()).length === 2 ? dateTemp.getDate() : '0' + dateTemp.getDate();
	let month = String(dateTemp.getMonth() + 1).length === 2 ? dateTemp.getMonth() + 1 : '0' + (dateTemp.getMonth() + 1);
	let date = {};
	date.name = `${day}.${month}`;
	date.date = `${dateTemp.getFullYear()}-${month}-${day}`;
	return date;
}
window.state.today = getDate(0);
window.state.today.index = 0;
// Получаю 7 дней. По умолчанию 3 дня до сегодняшнего дня и 3 дня после сегодняшнего дня. Передаю в window.state
export default function (i = 0) {
	i -= 3;
	let week = [];
	for (let x = 7; x > 0; x--) {
		week.push(getDate(i));
		i++;
	}
	window.state.week = week;
	return week;
};

