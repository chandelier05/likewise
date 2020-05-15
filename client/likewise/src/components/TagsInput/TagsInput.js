// TagsInput.jsx
import React from "react";
import { Input, Tooltip } from "antd";
import "./TagsInput.scss";

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        let value = event.target.value.substring(0,event.target.value.length);
        if (event.keyCode == 13 && value !== "") {
            setTags([...tags, value.toLowerCase()]);
            props.selectedTags([...tags, value]);
            event.target.value = "";
        }
    };
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="tags-input" >
            <ul className="tags">
                {tags.map((tag, index) => (
                   <li key={index} className="tag">
                   <span className='tag-title'>{tag}</span>
                   <span className='tag-close-icon'
                       onClick={() => removeTags(index)}
                   >
                       x
                   </span>
               </li>
           ))}
       </ul>
       <Tooltip title="Press ENTER to add a tag!" placement="right">
       <input
                type="text"
                onKeyUp={addTags} id="tags-inputbox"
            />
       </Tooltip>
        </div>
    );
};
export default TagsInput;