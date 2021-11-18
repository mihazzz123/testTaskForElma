import updateComponent from "./updateComponent";
import backlogList     from "../componets/backlogList";

export default function () {
	const searchForm = document.querySelector('#searchForm');
	const searchInput = searchForm.querySelector('#searchInput');
	
	searchInput.onkeyup = event => {
		if (event.target.value.length >= 2) {
			updateComponent(backlogList(window.state.tasksNoExecutor.filter(task => task.subject.toLowerCase().includes(event.target.value.toLowerCase()))));
		} else {
			updateComponent(backlogList(window.state.tasksNoExecutor));
		}
	}
}