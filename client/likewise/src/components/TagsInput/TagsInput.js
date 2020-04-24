// TagsInput.jsx
import React from "react";
import { Input, Tooltip } from "antd";
import "./TagsInput.scss";

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        let value = event.target.value.substring(0,event.target.value.length-1);
        if (event.key === "," && value !== "") {
            setTags([...tags, value]);
            props.selectedTags([...tags, value]);
            event.target.value = "";
        }
    };
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="tags-input">
            <ul id="tags">
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
       <Tooltip title="Press , to add tags" placement="right">
       <input
                type="text"
                onKeyUp={event => event.key === "," ? addTags(event) : null}
            />
       </Tooltip>
        </div>
    );
};
export default TagsInput;