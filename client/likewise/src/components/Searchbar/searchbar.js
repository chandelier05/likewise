import React, { Component } from "react";
import { Input, Menu, Select, Button } from 'antd';
import firebase from 'firebase';

// import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './searchbar.css';
import "antd/dist/antd.css";

const { Option } = Select;

export default class SearchBar extends Component {

  render() {
    return (
      <div className="likewise-searchbar">
        <TagSearch />
        <QuarterSelect />
        <YearInput />
        <SearchButton />
        <SortSelect/>
      </div>
    )
  }
}

function TagSearch(props) {
  return (
    <div className="likewise-tagbar">
      <Input placeholder="Search Tags..." />
    </div>
  )
}

function QuarterSelect(props) {
  return (
    <div className='likewise-quarter-select'>
      <Select placeholder="Quarter">
        <Option value="Autumn">Autumn</Option>
        <Option value="Winter">Winter</Option>
        <Option value="Autumn">Spring</Option>
        <Option value="Winter">Summer</Option>
      </Select>
    </div>
  )
}

function YearInput(props) {
  return (
    <div className="likewise-yearinput">
      <Input placeholder="Year" />
    </div>
  )
}

function SearchButton(props) {
  return (
    <div className="likewise-button">
      <Button>Search</Button>
    </div>
  )
}

function SortSelect(props) {
  return (
    <div className="likewise-sort-select">

      <Select placeholder="Sort By">
        <Option value="1">Date</Option>
        <Option value="2">Major</Option>
      </Select>
    </div>
  )
}

export { TagSearch, QuarterSelect, YearInput, SearchButton, SortSelect };