import './index.scss';

export default function (tasks) {
	if (!!tasks) {
		document.querySelectorAll('.userTask ,.dragoverItem').forEach(item => {
			item.remove();
		});
		window.state.week.forEach(day => {
				tasks.map(task => {
					if (day.date >= task.planStartDate && day.date <= (task.planEndDate ?? task.endDate) && !!document.querySelector(`.userDay[data-date="${day.date}"][data-executor="${task.executor}"]`)) {
						let taskItem = document.createElement('div');
						taskItem.dataset.id = task.id;
						taskItem.dataset.description = task.description;
						taskItem.dataset.executor = task.executor;
						taskItem.dataset.startDate = task.planStartDate;
						taskItem.dataset.endDate = (task.planEndDate ?? task.endDate);
						taskItem.classList.add('userTask');
						
						taskItem.innerHTML = `<span class="userTaskName">${task.subject}</span>`;
						
						if ((task.planEndDate ?? task.endDate) <= window.state.today) {
							taskItem.classList.add('active');
						}
						taskItem.onmouseover = () => {
							document.querySelectorAll(`.userTask[data-id="${task.id}"]`).forEach(item => {
								item.classList.add('hover');
							});
						}
						taskItem.onmouseleave = () => {
							document.querySelectorAll(`.userTask[data-id="${task.id}"]`).forEach(item => {
								item.classList.remove('hover');
							});
						}
						
						let tooltip = document.createElement('div');
						tooltip.classList.add('userTaskTooltip');
						tooltip.innerHTML = `<span class="userTaskTooltip__title">${task.subject}</span>`;
						if (!!task.description) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Description:</strong> <span>${task.description}</span></span>`;
						}
						if (!!task.creationDate) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Creation Date:</strong> <span>${task.creationDate}</span></span>`;
						}
						if (!!task.planStartDate) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Plan Start Date:</strong> <span>${task.planStartDate}</span></span>`;
						}
						if (!!task.planEndDate) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Plan End Date:</strong> <span>${task.planEndDate}</span></span>`;
						}
						if (!!task.endDate) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>End Date:</strong> <span>${task.endDate}</span></span>`;
						}
						if (!!task.status) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Status:</strong> <span>${task.status}</span></span>`;
						}
						if (!!task.order) {
							tooltip.innerHTML += `<span class="userTaskTooltip__param"><strong>Order:</strong> <span>${task.order}</span></span>`;
						}
						
						taskItem.append(tooltip);
						document.querySelector(`.userDay[data-date="${day.date}"][data-executor="${task.executor}"]`).append(taskItem);
					}
				});
			}
		)
		;
	}
}



