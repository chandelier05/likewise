import React, {useEffect, useState} from 'react';
import UserCard from './UserCard';
import {ReactComponent as ThiccDubs} from '../../assets/thicc-lil-dubs.svg';
import {firestore as db} from '../../utils/firebase';

export default function Leaderboard(props) {
  const [leaderList, setList] = useState([]);
  const [loading, setLoad] = useState(true);
  const userDocRef = db.collection('users').orderBy('likes', 'desc').limit(3).get();
  useEffect(() => {
    userDocRef.then((QuerySnapshot) => {
      let tempArr = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        let userObj = {
          firstName: data.firstName,
          lastName: data.lastName,
          likes: data.likes,
          uid: doc.id
        };
        tempArr.push(userObj);
      })
      setList(tempArr);
      setLoad(false);
    })
  }, [])
  return (
    <div id="leaderboard">
      <div id="leaderboard-header">
        <h2>
          Weekly top contributors
        </h2>
        <ThiccDubs/>
      </div>
      <div id="leaderboard-leaders">
      {!loading ? 
        leaderList.map((item) => {
          return <UserCard displayName={item.firstName + " " + item.lastName} likes={item.likes} handleViewPosts={props.handleViewPosts} uid={item.uid}/>
        }) : <div></div>
      }
      </div>
    </div>
  )
}