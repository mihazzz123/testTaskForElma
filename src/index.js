import 'reset-css';
import './style.scss';

import updateComponent from './utils/updateComponent';
import getWeek         from './utils/getWeek';
import moveTask        from './utils/moveTask';
import changeWeek      from './utils/changeWeek';
import searchTask      from './utils/searchTask';

import backlog     from './componets/backlog';
import calendar    from './componets/calendar';
import users       from './componets/users';
import tasks       from './componets/tasks';
import backlogList from './componets/backlogList';


const root = document.querySelector('#root');

const urlTasks = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks';
const urlUsers = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users';


// Формирую глобальный state
getWeek(); // Получаю 7 дней.

// Получаю список пользователей. Передаю их в календарь. Передаю пользователей в window.state
async function getUsers(url) {
	let res = await fetch(url);
	if (res.status == 200) {
		window.state.users = await res.json();
		
		// Обновляю пользователей
		updateComponent(users(window.state.users));
	} else {
		throw new Error(res.status);
	}
}

getUsers(urlUsers);

// Получаю список задач. Передаю их в календарь. Передаю задачи в window.state.
async function getTasks(url) {
	let res = await fetch(url);
	if (res.status == 200) {
		window.state.allTtasks = await res.json();
		
		// Считаю количество необходимых дней на выполнение задачи
		window.state.allTtasks.map((task, key) => {
			return window.state.allTtasks[key].dayCount = (new Date(task.planEndDate) - new Date(task.planStartDate)) / 86400000 + 1;
		});
		window.state.tasks = window.state.allTtasks.filter(task => task.executor);
		window.state.tasksNoExecutor = window.state.allTtasks.filter(task => !task.executor);
		
		// Обновляю компоненты
		updateComponent(backlogList(window.state.tasksNoExecutor));
		tasks(window.state.tasks);
	} else {
		throw new Error(res.status);
	}
}

getTasks(urlTasks);

root.append(calendar(), backlog());

// Глобальные функции
// Поиск
searchTask();

// Смена недели
changeWeek();

// Перетаскивание задачек
moveTask();
