import React, { Component } from "react";
import { Input, Menu, Select, Button } from 'antd';
import firebase from 'firebase';
import {Switch, Route, Redirect} from 'react-router-dom';
import PostNavigationPage from "../../pages/PostNavigationPage/PostNavigationPage";

// import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './searchbar.css';
import "antd/dist/antd.css";

const { Option } = Select;

function getState(){
  return{
    tagSearch: "", 
    quarterSelect:"",
    yearInput:"",
    sortSelect:"", 
  }
}

//press searchbutton, redirects to postnagivationpage

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.State = getState();
  }

  //should set state of SearchBar to these
  itemOnChange = event => {
    const copy = {...this.state};
    copy[event.target.id] = event.target.value;
    this.setState(copy);
  }

  buttonOnClick = (event) => {
    return(
      <Switch>
        <Route exact path="/posts">
          <PostNavigationPage/>
        </Route>
      </Switch>
    )
  }

  render() {
    return (
      <div className="likewise-searchbar">
        <TagSearch />
        <QuarterSelect />
        <YearInput />
        <SearchButton onClick={this.buttonOnClick} />
        <SortSelect/>
      </div>
    )
  }
}

function TagSearch(props) {
  return (
    <div className="likewise-tagbar">
      <Input placeholder="Search Tags..." id="tagSearch" onChange={this.itemOnChange} {...this.props}/>
    </div>
  )
}

function QuarterSelect(props) {
  return (
    <div className='likewise-quarter-select'>
      <Select placeholder="Quarter" id="quarterSelect" onChange={this.itemOnChange} {...this.props}>
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
      <Input placeholder="Year" id="yearInput" onChange={this.itemOnChange} {...this.props}/>
    </div>
  )
}

function SearchButton(props) {
  return (
    <div className="likewise-button">
      <Button {...this.props}>Search</Button>
    </div>
  )
}

function SortSelect(props) {
  return (
    <div className="likewise-sort-select">

      <Select placeholder="Sort By" id="sortSelect" onChange={this.itemOnChange} {...this.props}>
        <Option value="1">Date</Option>
        <Option value="2">Major</Option>
      </Select>
    </div>
  )
}

export { TagSearch, QuarterSelect, YearInput, SearchButton, SortSelect };