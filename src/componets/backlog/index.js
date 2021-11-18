import htmlToElement from "../../utils/htmlToElement";
import htmlBacklog   from './index.html';
import backlogList   from '../backlogList';
import search        from '../search';
import './index.scss';


export default function () {
	let backlog = htmlToElement(htmlBacklog);
	backlog.append(search());
	backlog.append(backlogList());
	
	return backlog
}
