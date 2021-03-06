import React, { Component, useState } from "react";
import { Input, Select, Button, InputNumber } from 'antd';
import {Button as MButton} from '@material-ui/core';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import './searchbar.css';
import "antd/dist/antd.css";
const { Option } = Select;

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tagSearch: this.props.tagSearch,
      quarterSelect: this.props.quarterSelect,
      yearInput: this.props.yearInput,
      sortSelect: this.props.sortSelect,
    }
  }
 
  tagOnChange = event => {
    const state = { ...this.state };
    state[event.target.id] = event.target.value;
    this.setState(state);
    console.log(event.target.value);
  }
  
  selectOnChange = item => {
    this.setState({
      quarterSelect: item,
    })
    console.log(item);
  }
  
  yearonChange = value => {
    this.setState({
      yearInput: value,
    })
    console.log(this.state.yearInput);
  }
  
   sortOnChange = value => {
    this.setState({
      sortSelect: value,
    })
  }

  returnState = () => {
    return this.state;
  }

  render(){
      return (
        <form className="likewise-searchbar">
          <div className="likewise-tagbar">
            <Input placeholder="Search Tags..." id="tagSearch" onChange={this.tagOnChange} value={this.state.tagSearch} />
          </div>
  
          <div className='likewise-quarter-select'>
            <Select placeholder="Quarter..." id="quarterSelect" onChange={this.selectOnChange} style={{width: "171px"}}>
              <Option value="Autumn">Autumn</Option>
              <Option value="Winter">Winter</Option>
              <Option value="Spring">Spring</Option>
              <Option value="Summer">Summer</Option>
            </Select>
          </div>
          <div className="likewise-yearinput">
            <InputNumber id="yearInput" onChange={this.yearonChange} min={1861} max={2024} defaultValue={2020} />
          </div>
          <div className="likewise-button">
            <Button onClick={this.props.onSubmit}>Search</Button>
          </div>
          <div className="likewise-sort-select" style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
            <div className="search-title" style={{ marginRight: "10px" }}> Sort by</div>
            <div>
              <Select defaultValue="ID" id="sortSelect" value={this.state.sortSelect} onChange={this.sortOnChange}>
                <Option value={"ID"}>Default (by ID)</Option>
                <Option value={"Likes"}>Likes</Option>
                <Option value={"Time"}>Time</Option>
              </Select>
            </div>
          </div>
        </form>
      )
  }
  
}

export function BackBar(props){

  const[redirect, setRedirect] = useState(false);

  const handleButton = () => {
    setRedirect(true);
  }

  if (redirect){
    return(
      <Redirect to="/posts" />
    )
  }else{
    return(
      <div className="likewise-searchbar">
        <MButton onClick={handleButton} size="large" className="redirect-button">
        <ArrowLeftOutlined style={{color: "white", width: "100%"}} />
        </MButton>
      </div>
    )
  }
}


