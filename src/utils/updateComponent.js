export default function (updateItem) {
	if (!!updateItem) {
		document.getElementById(updateItem.id).innerHTML = updateItem.innerHTML;
	} else {
		return false;
	}
}