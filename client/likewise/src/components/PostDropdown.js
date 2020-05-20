import React, {useState, useCallback} from 'react';


export default function PostDropdown(props) {
  const [dropdown, setDropdown] = useState(false);
  const handleButtonPress = (callback) => {
    console.log('handleButton press called?')
    setDropdown(!dropdown);
    callback();
  };
  return (
    <div className={props.className}>
      <button className="dropbtn" name="optionsButton" onClick={() => (setDropdown(!dropdown))}>...</button>
      { dropdown ?
        <div className="dropdown-content" name={'dropdownContent' + props.pid}>
          <button name='editPostButton' onClick={() => (handleButtonPress(props.handleEdit))}>Edit</button>
          <button name='deletePostButton' onClick={() => (handleButtonPress(props.handleDelete))}>Delete</button>
        </div> : <div></div>
      } 
    </div>
  )
}