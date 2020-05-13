import React from 'react';
import UserCard from './UserCard';
import {ReactComponent as ThiccDubs} from '../../assets/thicc-lil-dubs.svg';

export default function Leaderboard(props) {
  return (
    <div id="leaderboard">
      <div id="leaderboard-header">
        <h2>
          Weekly top contributors
        </h2>
        <ThiccDubs/>
      </div>
      <UserCard/>
      <UserCard/>
      <UserCard/>
    </div>
  )
}