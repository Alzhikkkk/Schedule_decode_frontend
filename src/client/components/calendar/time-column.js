import {time} from '../../../utils/calendar-info';
import Col from './col';
import Item from './item';
function TimeColumn(props) {
    let showTime = [(<Item key={0}/>)]
    showTime = showTime.concat(time.map((t , i) => (
        <Item key={(i + 1)}><span>{t}</span></Item>
        )))
    return (
        <Col key={"time-0"}>{showTime}</Col>
    );
  }
  
  export default TimeColumn;
  