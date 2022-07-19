function Item(props) {
    return (
        <div key={0} className="calendar-item">
            <span className="calendar-item--time">{props.time}</span>
            {props.children}
        </div>
    );
  }
  
  export default Item;
  