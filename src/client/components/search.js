import logo from '../../assets/logo.png';
import Input from './input';
import { useState , useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/baseurl';
import { DatePicker } from 'antd';


function Search(props) {
  let inputProps = { ...props };
  delete inputProps.flexDirection;
  delete inputProps.filterByWeek;
  delete inputProps.onChangeWeek;

  const [search, setSearch] = useState('')
  const [list, setList] = useState({})
  const onChange = (e) => {
    setSearch(e.target.value)
    axios.get(`${BASE_URL}/api/search/` + e.target.value)
      .then(res => {
        setList(res.data);
      }).catch(e => console.log(e))
  }

  return (
    <div className={'search ' + props.flexDirection}>
  
      <Link to='/'><img src={logo} alt="log" /> </Link>
      <Input {...inputProps} onChange={onChange} value={search} data={list} />
      {props.filterByWeek && <DatePicker className="week-picker" onChange={props.onChangeWeek} picker="week" placeholder='Неделя'/>}
    </div>
  );
}

export default Search;
