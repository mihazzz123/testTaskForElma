import Btn from '../btn'
import './index.scss';


let calendarBtn = document.createElement('div');
calendarBtn.classList.add('calendarBtn');
calendarBtn.append(Btn({text: 'Left', className: ['fs', 'weekChange'], id: 'weekPrev'}), Btn({text: 'Right', className: ['fs', 'weekChange'], id: 'weekNext'}))

export default calendarBtn;