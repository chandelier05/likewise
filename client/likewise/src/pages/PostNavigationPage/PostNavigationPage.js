import React, { useState, useEffect } from 'react';
import PostPreview from '../../components/PostPreview';
import UserPicture from '../../assets/userImg.PNG';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import SearchBar from "../../components/Searchbar/searchbar";
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1.2rem"
  },
  postSection: {
    "&:first-child": {
      margin: "0rem 2rem 1rem 2rem"
    }
  },
  header: {
    margin: "0rem 1rem",
    fontSize: "3rem",
    background: "rgb(136,181,225)",
    background: "linear-gradient(90deg, rgba(136,181,225,1) 0%, rgba(145,136,171,1) 25%)",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "900"
  }
}))

export default function PostNavigationPage(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoad] = useState(false);
  const[allPosts, setAllPosts] = useState([]);
  // Similar to componentDidMount and componentDidUpdate:
  // TODO: change functionality to look for most recent posts? and compile into list
  useEffect(() => {
    setLoad(true);
    var docRef = db.collection("posts").orderBy("likes", "asc");

    docRef.get().then((QuerySnapshot) => {
      let newArr = [];
      QuerySnapshot.forEach((doc) => {
        if (doc.exists) {
          let postData =
          {
            preview: doc.data()["preview"],
            body: doc.data()["body"],
            uid: doc.data()["uid"],
            likes: doc.data()["likes"],
            timestamp: doc.data()["timestamp"].toDate().toString(),
            pid: doc.id,
            tags: doc.data()['tags'],
            commentCount: doc.data()["commentCount"]
          }
          newArr.push(postData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      setPosts(newArr);
      setAllPosts(newArr);
      setLoad(false);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, []);

  const returnAllPosts = () => {
    return([allPosts, setAllPosts]);
  }

  //includes int values of approx. month and days for the start and end of each quarter
  const QUARTER_TYPES = {
    Autumn: {startDate: {month: 9, day: 30}, endDate: {month: 12, day:31}}, //im aware this is not correct
    Winter: {startDate: {month: 1, day: 1}, endDate: {month: 3, day: 29}}, 
    Spring: {startDate: {month: 3, day: 30}, endDate: {month: 6, day: 21}}, 
    Summer: {startDate: {month: 6, day:22}, endDate: {month:9, day: 29}},
  }

  //checks to see if date is between quarters
  const isBetweenDates = (quarter, date) => {
    if(quarter != ""){
      let pastStart = false;
      let withinEnd = false;

      if (quarter == "Autumn"){
        if(date.getMonth() == QUARTER_TYPES.Autumn.startDate.month){
          pastStart = date.getDay() >= QUARTER_TYPES.Autumn.startDate.day;

        }else{
          pastStart = date.getMonth() > QUARTER_TYPES.Autumn.startDate.month;

        }
        if(date.getMonth() == QUARTER_TYPES.Autumn.endDate.month){
          withinEnd = date.getDay() <= QUARTER_TYPES.Autumn.endDate.day;

        }else{
          withinEnd = date.getMonth() < QUARTER_TYPES.Autumn.endDate.month;

        }
      }
      if (quarter == "Winter"){ //for some reason dates from april appear
        if(date.getMonth() == QUARTER_TYPES.Winter.startDate.month){
          pastStart = date.getDay() >= QUARTER_TYPES.Winter.startDate.day;

        }else{
          pastStart = date.getMonth() > QUARTER_TYPES.Winter.startDate.month;

        }
        if(date.getMonth() == QUARTER_TYPES.Winter.endDate.month){
          withinEnd = date.getDay() <= QUARTER_TYPES.Winter.endDate.day;

        }else{
          withinEnd = date.getMonth() < QUARTER_TYPES.Winter.endDate.month;

        }
      }
      if (quarter == "Spring"){
        if(date.getMonth() == QUARTER_TYPES.Spring.startDate.month){
          pastStart = date.getDay() >= QUARTER_TYPES.Spring.startDate.day;

        }else{
          pastStart = date.getMonth() > QUARTER_TYPES.Spring.startDate.month;

        }
        if(date.getMonth() == QUARTER_TYPES.Spring.endDate.month){
          withinEnd = date.getDay() <= QUARTER_TYPES.Spring.endDate.day;

        }else{
          withinEnd = date.getMonth() < QUARTER_TYPES.Spring.endDate.month;

        }
      }
      if (quarter == "Summer"){
        if(date.getMonth() == QUARTER_TYPES.Summer.startDate.month){
          pastStart = date.getDay() >= QUARTER_TYPES.Summer.startDate.day;

        }else{
          pastStart = date.getMonth() > QUARTER_TYPES.Summer.startDate.month;

        }
        if(date.getMonth() == QUARTER_TYPES.Summer.endDate.month){
          withinEnd = date.getDay() <= QUARTER_TYPES.Summer.endDate.day;

        }else{
          withinEnd = date.getMonth() < QUARTER_TYPES.Summer.endDate.month;

        }
      }
      return pastStart && withinEnd;
    }
    return null;
  }

  //function filters results based on search filters
  //sort doesn't work yet
  const displaySearchResults = () => {
    console.log("starting posts: ", typeof posts);
    console.log("should be full: ", posts);
    let query = window.searchComponent.returnState();

    let results = allPosts.filter((post) => {
      let date = new Date(post.timestamp);
      let isDateBetween = isBetweenDates(query.quarterSelect, date);

      //if tag search and quarterSelect have been filled out
      if (query.tagSearch != "" && query.quarterSelect != ""){
        return  _.includes(post.tags, query.tagSearch) && isDateBetween && date.getFullYear() == query.yearInput;

      } //if quarterSelect not and tagSearch is
      else if (query.tagSearch != ""){
        console.log("post year: ",date.getFullYear());
        console.log("query year: ", query.yearInput);

        return  _.includes(post.tags, query.tagSearch) && (date.getFullYear() == query.yearInput);

      }//if tagSearch is not and quarterSelect is
      else if (query.quarterSelect != ""){
        console.log("isDAteBetween: ",isDateBetween);
        return isDateBetween && (date.getFullYear() == query.yearInput);

      }else{
        console.log("post year: ",date.getFullYear());
        console.log("query year: ", query.yearInput);
        console.log("boolean: ",date.getFullYear() == query.yearInput )
        return date.getFullYear() == query.yearInput;
      }
    });
    //sort doesn't work yet
    //results = sortSearchResults(results, posts.sortSelect);
    console.log("results: ", results );
    console.log("allposts: ", allPosts);
    setPosts(results);
    setLoad(false);
  }

  //sorts results in posts
  //doesn't work yet
  const sortSearchResults = (results, sort) => {
    console.log(sort);
    let sortedResults = [];
    if( sort == "ID"){
      sortedResults = _.sortBy(results, [function(o) {return o.pid}]);
      console.log("sortBy: ", sortedResults );
      
    }else if( sort == "Likes"){
      sortedResults = _.sortBy(results, [function(o) {return o.likes}]);
      console.log("sortBy: ", sortedResults );
      
    }else if( sort == "Date"){
      sortedResults = _.sortBy(results, [function(o)
                                          {let date = new Date(o.timestamp); 
                                          return date;}]);
      console.log("sortBy: ", sortedResults );
    }
    return sortedResults;
  }

  return (
    <div>
      <SearchBar ref={(searchComponent) => {window.searchComponent = searchComponent}} onSubmit={displaySearchResults} />
      <Grid container className={classes.root}>
        <Grid item xs={12} id="postSectionPreview">
          <h1 className={classes.header}>Browse posts</h1>
          {!loading && posts.length > 0 ?
            posts.map((item) => {
              return <PostPreview className="postPreview" postData={item} userImg={UserPicture} />
            })
            :
            <h2>loading</h2>
          }
        </Grid>
      </Grid>
    </div>

  )
}