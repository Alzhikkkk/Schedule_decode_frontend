import LessonInfo from "./lesson-info"
import BusyInfo from "./busy-info"
import TimeColumn from "./time-column";
import {time , weekDays} from '../../../utils/calendar-info';
import Col from "./col";
import Item from "./item";
function Calendar(props) {
    // let calendar = [(<TimeColumn key={"timecol"}/>)]
    const {data} = props

    const showItem = function(weekday , t){
        let hour = t.split(' ') // ["10:00", "10:59"]
        hour = hour[0]
        let val = data.filter(item => item.time == hour && item.weekday == weekday)
        val = val[0]
        console.log(val);
        return val && val.course? <LessonInfo 
        course={val.course.name } 
        group={val.group.name} 
        mentor={val.mentor.full_name} 
        room={val.room.number}/> : val 
        && val.text ? <BusyInfo text={val.text}/> : <span></span> 
    }

    let calendar = weekDays.map(weekday => {

        let showTime = [(<Item key={0}>{weekday} </Item>)]
        
        showTime = showTime.concat(time.map((t , i) => (<Item key={i+1} time={t}>
            {showItem(weekday , t)}
        </Item>)))
        return (<Col key={weekday}>{showTime}</Col>)
    });

    return (
      <div className="calendar">
          {calendar}
      </div>
    );
  }
  
  export default Calendar;
  