import React, { Component } from 'react';
import SearchBar from "../../components/Searchbar/searchbar";


export default class TestPage extends Component {
    render() {
        return (
            <div className='likewise-testpage'>
                <SearchBar />
            </div>
        );
    }
}