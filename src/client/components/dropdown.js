import { Link, link } from 'react-router-dom';
import { spawn } from 'redux-saga/effects';
function Dropdown({ data, onSelectItem }) {
    const list = []
    console.log(data)
    Object.keys(data).map((key, index) => {
        data[key].length > 0 && list.push(<li key={`header-${index}`} className="dropdown-header">{key}</li>)
        data[key].map((item, i) => {
            list.push(<li key={`item-${index}-${i}`} className="dropdown-item">
                {!onSelectItem ? <Link to={item.name ? `/group/${item.id}`
                    : item.full_name ? `/mentor/${item.id}`
                        : `/room/${item.id}`}>
                    {item.name || item.number || item.full_name}
                </Link> : 
                <a onClick={() => onSelectItem(item.name ? 'group_id' : item.full_name ? 'mentor_id' : 'room_id', item.id)}> {item.name || item.number || item.full_name} </a>}
            </li>)
        })
    })
    return (
        <ul className="dropdown-list">
            {list}
        </ul>
    );
}

export default Dropdown;
