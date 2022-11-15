import React, {useEffect, useState} from 'react';
import {db} from "./firebase"
import {collection, getDocs} from "firebase/firestore"

const currency = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(2); }
const wholenum = (n) => { n=parseFloat(n); return isNaN(n) ? false : n.toFixed(0); }

function Board() {

  const [players, setPlayers] = useState([]); 
  const [franchises, setFranchises] = useState([]); 

  useEffect(() => {
    let player_temp = [];
    let franchise_set = new Set();
    getDocs(collection(db, "players")).then((snapshot) => {
    snapshot.forEach((doc) => {
      player_temp.push(doc.data());
      franchise_set.add(doc.data().franchise);
    });

    let franchise_temp = [...franchise_set].sort().map( franchise => ({"franchise": franchise}) );
    franchise_temp.forEach( franchise => {
      let franchise_players = player_temp.filter( player => player.franchise === franchise.franchise)
      franchise.player_count = franchise_players.length;
      franchise.spent = currency(franchise_players.reduce((accumulator, object) => {
          return accumulator + object.salary; }, 0) );
      franchise.remain = currency(global.config.salary_cap - franchise.spent);
      //TODO: max bid
      franchise.total_rating = wholenum(franchise_players.reduce((accumulator, object) => {
          return accumulator + object.rating; }, 0) );
      });

    setPlayers(player_temp);
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

      { console.log(players) }
      { console.log(franchises) }


    </div>
  );
}

export default Board;
