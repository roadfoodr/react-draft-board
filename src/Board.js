import React, {useEffect, useState} from 'react';
import {db} from "./firebase"
import {collection, getDocs} from "firebase/firestore"

import Team from './Components/Team.js';

const currency = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(2); }
const wholenum = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(0); }


function Board() {

  const [players, setPlayers] = useState([]); 
  const [franchises, setFranchises] = useState([]);


  useEffect(() => {
    let players_temp = [];
    let franchise_set = new Set();
    getDocs(collection(db, "players")).then((snapshot) => {
    snapshot.forEach((doc) => {
      let player_temp = doc.data();
      player_temp.name = player_temp.nameLast + ", " + player_temp.nameFirst;
      player_temp.salary = currency(player_temp.salary);
      players_temp.push(player_temp);
      franchise_set.add(doc.data().franchise);
    });

    // Compute summaries for each franchise
    let franchise_temp = [...franchise_set].sort().map( franchise => ({"franchise": franchise}) );
    franchise_temp.forEach( franchise => {
      let franchise_players = players_temp.filter( player => player.franchise === franchise.franchise)
      franchise.player_count = franchise_players.length;
      franchise.player_count_off = franchise_players.filter( player => 
          ["QB", "RB", "WR", "TE", "WRTE"].includes(player.position) ).length;
      franchise.player_count_dst = franchise_players.filter( player => 
          ["K", "LB", "DE", "DB"].includes(player.position) ).length;
      franchise.spent = currency(franchise_players.reduce((accumulator, object) => {
          return accumulator + Number(object.salary); }, 0) );
      franchise.remain = currency(global.config.salary_cap - franchise.spent);
      //TODO: max bid
      franchise.total_rating = wholenum(franchise_players.reduce((accumulator, object) => {
          return accumulator + Number(object.rating); }, 0) );
      });

    setPlayers(players_temp);
    setFranchises(franchise_temp);

    })
  }, [])


  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <h1>
          Draft Board
        </h1>
      </header>


      <h4>Salary cap: {currency(global.config.salary_cap)}</h4>

      <div className="pure-g">
      <div className="pure-u-11-12">
      {franchises.map(franchise =>
        <div><Team 
            franchise={franchise}
            players={players.filter(player => player.franchise === franchise.franchise)}
            key={franchise.franchise} /></div>
      )}
      </div></div>
      { /* console.log(players) */ }
      { console.log(franchises) }


    </div>
  );
}

export default Board;
