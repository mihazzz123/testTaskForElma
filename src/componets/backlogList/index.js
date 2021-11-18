import backlogItem from '../backlogItem';
import './index.scss';

export default function (items) {
	let backlogList = document.createElement('div');
	backlogList.id = 'backlogList';
	backlogList.classList.add('backlogList');
	
	if (!!items) {
		let itemsContainer = document.createElement('div');
		items.map(item => {
			itemsContainer.append(backlogItem(item))
		});
		backlogList.innerHTML = itemsContainer.innerHTML;
		return backlogList;
	}
	return backlogList;
}

