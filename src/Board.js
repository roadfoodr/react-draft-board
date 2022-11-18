import React, {useEffect, useState} from 'react';
import {db} from "./firebase"
import {collection, getDocs} from "firebase/firestore"

const currency = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(2); }
const wholenum = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(0); }

let position_sort_costs = new Map();
["DB", "LB", "K", "WRTE", "RB", "QB"].forEach((pos, i) => {
  position_sort_costs.set(pos, i * 1000);
});
const player_sort_func = (p1, p2) => {
  return p1.salary + position_sort_costs.get(p1.combined_position) >= 
         p2.salary + position_sort_costs.get(p2.combined_position) ?
  p1 : p2;
}

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
      players_temp.push(player_temp);
      franchise_set.add(doc.data().franchise);
    });

    // Compute summaries for each franchise
    let franchise_temp = [...franchise_set].sort().map( franchise => ({"franchise": franchise}) );
    franchise_temp.forEach( franchise => {
      let franchise_players = players_temp.filter( player => player.franchise === franchise.franchise)
      franchise.player_count = franchise_players.length;
      franchise.spent = currency(franchise_players.reduce((accumulator, object) => {
          return accumulator + object.salary; }, 0) );
      franchise.remain = currency(global.config.salary_cap - franchise.spent);
      //TODO: max bid
      franchise.total_rating = wholenum(franchise_players.reduce((accumulator, object) => {
          return accumulator + object.rating; }, 0) );
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
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>


      <h4>Salary cap: {currency(global.config.salary_cap)}</h4>

      {franchises.map(franchise =>
        <p key={franchise.franchise}>{franchise.franchise}</p>
      )}

      { console.log(players) }
      { console.log(franchises) }


    </div>
  );
}

export default Board;
