import htmlToElement from "../../utils/htmlToElement";
import Search        from './index.html';

import IconSearch from '../../images/search.png';

import './index.scss';


export default function () {
	let search = htmlToElement(Search);
	let input = search.querySelector('input');
	
	let iconSearch = document.createElement('img');
	iconSearch.classList.add('iconSearch');
	iconSearch.src = IconSearch;
	search.querySelector('button').append(iconSearch);
	
	
	return search;
}