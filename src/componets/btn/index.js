import './index.scss';

export default function ({text, className, id, callback}) {
	let btnHtml = document.createElement('button');
	btnHtml.id = id;
	btnHtml.classList.add('btn');
	btnHtml.textContent = text;
	typeof className != 'object' ? className = [className] : className;
	!!className ? btnHtml.classList.add(...className) : false;
	!!callback && typeof callback == 'function' ? btnHtml.addEventListener('click', callback) : false;
	return btnHtml;
}
