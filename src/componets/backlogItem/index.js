import './index.scss';

export default function (item) {
	let backlogItem = document.createElement('div');
	backlogItem.id = item.id;
	backlogItem.classList.add('backlogItem');
	backlogItem.dataset.startDate = item.planStartDate;
	backlogItem.dataset.endDate = (item.planEndDate ?? item.endDate);
	backlogItem.setAttribute('draggable', 'true');
	
	let backlogItemTitle = document.createElement('span');
	backlogItemTitle.classList.add('backlogItemTitle');
	backlogItemTitle.textContent = item.subject;
	backlogItem.append(backlogItemTitle);
	
	if (!!item.description) {
		let backlogItemDesc = document.createElement('span');
		backlogItemDesc.classList.add('backlogItemDesc');
		backlogItemDesc.textContent = item.description;
		backlogItem.append(backlogItemDesc);
	}
	
	return backlogItem;
}