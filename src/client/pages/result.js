import Search  from "../components/search";
import Calendar from "../components/calendar";
import {useEffect , useState} from 'react'
import {useParams , useLocation} from 'react-router-dom'
import axios from "axios";
import moment from 'moment';
import {BASE_URL} from '../../config/baseurl'
function Result({queryname}) {
  const {id} = useParams()
  const [data , setData] = useState([])

  const getData = (s, e) => {
    let start = s ? s : moment().clone().startOf('week').add(1, 'days');
    let end = e ? e : moment().clone().endOf('week').add(1, 'days');

    axios.get(`${BASE_URL}/api/search?${queryname}=${id}&start=${start}&end=${end}`)
    .then(res => {
      setData(res.data)
    })
  }


  const onChangeWeek = (date) => {
    let weekStart = date.clone().startOf('week').add(1, 'days');
    let weekEnd = date.clone().endOf('week').add(1, 'days');
    console.log(weekStart, weekEnd)
    getData(weekStart, weekEnd)
  }

  useEffect(getData , [])

    return (
      <div className="result">
        <Search flexDirection="row" placeholder="Search by Group , Room , Mentor" filterByWeek={true} onChangeWeek={onChangeWeek}/>
        <Calendar data={data}/>
      </div>
    );
  }
  
  export default Result;
  