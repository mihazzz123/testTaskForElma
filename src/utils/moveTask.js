import tasks           from "../componets/tasks";
import updateComponent from "./updateComponent";
import backlogList     from "../componets/backlogList";

export default function () {
	// Получаю координаты элемента
	const getCoords = elem => {
		let box = elem.getBoundingClientRect();
		return {
			top : box.top,
			left: box.left
		};
	}

// Функция перемещения элемента
	const moveItem = (item, event, coords) => {
		item.style.left = (event.clientX - coords.left) + 'px';
		item.style.top = (event.clientY - coords.top) + 'px';
	}

// Вешаю событие onmousedown на задачки в Backlog
	const backlogListItems = document.querySelector('.backlogList');
	backlogListItems.onmousedown = event => {
		if (event.target.closest('.backlogItem')) {
			
			let taskObj;
			
			// Задача на которой нажал кнопку мыши
			const task = event.target.closest('.backlogItem');
			
			// Затем вешаю на неё событие ondragstart
			task.ondragstart = event => ondragstartHandler(event);
			// Вешаю событие ondragend на выбранную задачу
			task.ondragend = event => ondragendHandler(event);
			
			
			// В случае если пользователь перетаскивает задачу на имя исполнителя
			const userNames = document.querySelectorAll('.userName');
			userNames.forEach(userName => {
				// Задача наведена над именем исполнителя
				userName.ondragover = event => ondragoverHandlerUser(event);
				// Задача сброшена на имя исполнителя
				userName.ondrop = event => ondropHandlerUser(event);
			});
			
			// В случае если пользователь перетаскивает задачу на день в календаре
			const userDays = document.querySelectorAll('.userDay');
			userDays.forEach(userDay => {
				// Задача наведена над днем календаря
				userDay.ondragover = event => ondragoverHandlerCalendar(event);
				// Задача сброшена на день в календаре
				userDay.ondrop = event => ondropHandlerCalendar(event);
			});
			
			
			// Обработчик начала перетаскивания задачи
			const ondragstartHandler = event => {
				// Получаю объект принадлежащей этой задаче
				taskObj = window.state.tasksNoExecutor.filter(task => task.id === event.target.id)[0];
				
				// Добавляю класс для стилизации задачи
				event.target.classList.add('ondragstart');
				
				// Создаю копию задачи для возможности стилизации перетаскиваемой задачи
				let tempItem = event.target.cloneNode(true);
				tempItem.style.width = event.target.clientWidth + 'px';
				tempItem.classList.add('tempDragItem');
				tempItem.style.position = 'fixed';
				tempItem.style.left = (event.clientX + event.target.width) + 'px';
				tempItem.style.top = (event.clientY + event.target.height) + 'px';
				document.body.append(tempItem);
				
				// Скрываю перетаскиваемую задачу по умолчанию
				event.target.style.opacity = '0';
				setTimeout(() => {
					event.target.style.opacity = '1';
				}, 0)
				
				// Вешаю событие на document для отслеживания положения курсора
				document.ondragover = e => {
					e.preventDefault();
					
					// Получаю координаты задачи
					let coords = getCoords(event.target);
					coords.left = event.clientX - coords.left;
					coords.top = event.clientY - coords.top;
					
					// Двигаю свою копию задачи
					moveItem(tempItem, e, coords);
				}
			};
			
			// Обработчик завершения перетаскивания задачи
			const ondragendHandler = event => {
				// После того как заканчиваю ее перетаскивание, удаляю временные классы и временные элементы
				event.target.classList.remove('ondragstart');
				document.querySelectorAll('.dragoverItem, .tempDragItem').forEach(item => {
					item.remove();
				});
			}
			
			// Обработчик перетаскивания задачи над именем пользователя
			const ondragoverHandlerUser = event => {
				event.preventDefault();
				
				// Получаю дни на которые можно поставить задачу
				const userSelected = event.target.closest('.userName');
				let userSelectedDays = userSelected.closest('.user').querySelectorAll('.userDay');
				userSelectedDays = [...userSelectedDays].filter(day => {
					return day.dataset.date >= taskObj.planStartDate && day.dataset.date <= (taskObj.planEndDate ?? taskObj.endDate);
				});
				
				// Добавляю класс на ряд пользователя для стилизации
				document.querySelectorAll('.user').forEach(user => {
					user.classList.remove('selectUser');
				});
				userSelected.closest('.user').classList.add('selectUser');
				
				// Показываю пользователю где будет располагаться задача
				userSelectedDays.forEach(day => {
					let dragoverItem = document.createElement('div');
					dragoverItem.classList.add('dragoverItem');
					dragoverItem.textContent = taskObj.subject;
					if (!day.querySelector('.dragoverItem')) {
						day.append(dragoverItem);
					}
				});
				
				// Удаляю временные элементы
				document.querySelectorAll('.userDay').forEach(item => {
					if (!userSelectedDays.includes(item)) {
						item.querySelectorAll('.dragoverItem').forEach(item => {
							item.remove();
						});
					}
				});
			}
			
			// Обработчик сбрасывания задачи на имя пользователя
			const ondropHandlerUser = event => {
				// Получаю данные выбранного исполнителя и передаю их в выбранную задачу
				const userSelected = event.target.closest('.userName');
				taskObj.executor = +userSelected.dataset.executor;
				
				// Добавляю выбранную задачу в state. Обновляю задачи
				window.state.tasks.push(taskObj);
				tasks(window.state.tasks);
				
				// Удаляю выбранную задачу из backlog. Обновляю backlog
				window.state.tasksNoExecutor = window.state.tasksNoExecutor.filter(task => task.id !== taskObj.id);
				updateComponent(backlogList(window.state.tasksNoExecutor));
				
				// Удаляю временные классы и временные элементы
				document.querySelectorAll('.user').forEach(user => {
					user.classList.remove('selectUser');
				});
			}
			
			// Обработчик перетаскивания задачи над днем календаря
			const ondragoverHandlerCalendar = event => {
				if (!!taskObj) {
					event.preventDefault();
					
					// Получаю дни на которые можно поставить задачу
					let dragover = event.target.closest('.user').querySelectorAll('.userDay');
					let index = [...dragover].indexOf(event.target.closest('.userDay'));
					dragover = [...dragover].slice(index, index + taskObj.dayCount);
					
					// Показываю пользователю где будет располагаться задача
					dragover.forEach(item => {
						if (!item.querySelector('.dragoverItem')) {
							let dragoverItem = document.createElement('div');
							dragoverItem.classList.add('dragoverItem');
							dragoverItem.textContent = taskObj.subject;
							item.append(dragoverItem);
						}
					});
					
					// Удаляю временные элементы
					userDays.forEach(userDay => {
						if (!dragover.includes(userDay)) {
							userDay.querySelectorAll('.dragoverItem').forEach(item => {
								item.remove();
							});
						}
					});
					document.querySelectorAll('.user').forEach(user => {
						user.classList.remove('selectUser');
					});
				}
			}
			
			// Обработчик сбрасывания задачи на день в календаре
			const ondropHandlerCalendar = event => {
				// Получаю день на который пользователь сбросил задачу
				const target = event.target.closest('.userDay');
				
				// Добавляю исполнителя выбранной задаче
				taskObj.executor = +target.dataset.executor;
				
				// Считаю новые дни для выполнения задачи, передаю в объект выбранной задаче новые даты
				let planEndDate = new Date(Date.parse(new Date(target.dataset.date)) + Date.parse(new Date(taskObj.planEndDate ?? taskObj.endDate)) - Date.parse(new Date(taskObj.planStartDate)));
				taskObj.planEndDate = `${planEndDate.getFullYear()}-${String(planEndDate.getMonth() + 1).length === 2 ? planEndDate.getMonth() + 1 : '0' + (planEndDate.getMonth() + 1)}-${String(planEndDate.getDate()).length === 2 ? planEndDate.getDate() : '0' + planEndDate.getDate()}`;
				taskObj.planStartDate = target.dataset.date;
				
				// Добавляю выбранную задачу в state. Обновляю задачи
				window.state.tasks.push(taskObj);
				tasks(window.state.tasks);
				
				// Удаляю выбранную задачу из backlog. Обновляю backlog
				window.state.tasksNoExecutor = window.state.tasksNoExecutor.filter(task => task.id !== taskObj.id);
				updateComponent(backlogList(window.state.tasksNoExecutor));
				
				// Удаляю временные элементы
				document.querySelectorAll('.dragoverItem').forEach(item => {
					item.remove();
				});
			}
			
			
		}
	}
}