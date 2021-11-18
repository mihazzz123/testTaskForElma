import htmlToElement from '../../utils/htmlToElement'
import htmlUsers     from './index.html';
import User          from '../user';

import './index.scss';


export default function (users) {
	let userList = htmlToElement(htmlUsers);
	if (!!users) {
		users.map(user => {
			userList.append(User(user));
		});
	}
	return userList;
}
