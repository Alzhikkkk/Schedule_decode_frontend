import Dropdown from './dropdown';
function Input(props) {
  const inputProps= {...props}
  delete inputProps.data;
  delete inputProps.onSelectItem;
  
  return (
    <fieldset className="fieldset">
      <input className="input" {...inputProps} />
      <Dropdown data={props.data} onSelectItem={props.onSelectItem}/>
    </fieldset>
  );
}

export default Input;
