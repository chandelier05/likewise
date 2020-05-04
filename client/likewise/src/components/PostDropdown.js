import React, {useState} from 'react';

export default function PostDropdown(props) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="dropdown">
      <button className="dropbtn" name="optionsButton" onClick={() => (setDropdown(!dropdown))}>...</button>
      { dropdown ?
        <div className="dropdown-content" name={'dropdownContent' + props.pid}>
          <button name='editPostButton'>Edit</button>
          <button name='deletePostButton' onClick={() => (props.handleDelete())}>Delete</button>
        </div> : <div></div>
      } 
    </div>
  )
}