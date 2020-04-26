import React, { Component } from 'react';
import SearchBar from "../../components/Searchbar/searchbar";
import TagsInput from "../../components/TagsInput/TagsInput";


export default function TestPage(props) {
    const selectedTags = tags => console.log(tags);
    return (
        <div className='likewise-testpage'>
           <SearchBar/>
           <TagsInput selectedTags={selectedTags}/>
        </div>
    );
}