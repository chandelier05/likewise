import React, { Component } from "react";
import { Input, Menu, Select, Dropdown, message, Button, AutoComplete } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './searchbar.css';

const { Option } = Select;

export default class SearchBar extends Component {
  render() {
    return (
      <div className="likewise-searchbar">
        <Input.Group>
        <TagInput/>
        </Input.Group>
      </div>
    )
  }
}

function TagInput(props) {
  return (
    <div className="likewise-tagbar">
      <Input placeholder="Search Tags..." />
    </div>
  )
}

function QuarterSelect(props) {
 return(
  <div className='likewise-quarter-select'>
          <Select defaultValue="Sign Up" style={{ width: '30%' }}>
        <Option value="Sign Up">Sign Up</Option>
        <Option value="Sign In">Sign In</Option>
      </Select>
  </div>
 )
}

function YearInput(props) {
  return (
    <div>

    </div>
  )
}

function SearchButton(props) {
  return (
    <div>

    </div>
  )
}

export { TagInput, QuarterSelect, YearInput, SearchButton };