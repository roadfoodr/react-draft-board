import React, {useState} from 'react';
import Player from './Player.js';

import '../Styles/Team.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

// const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />;
// const heartOutline = <FontAwesomeIcon icon={faHeartRegular} />;

// hack to combine a 2-level sort into 1 level
let position_sort_costs = new Map();
["DB", "LB", "K", "WRTE", "RB", "QB"].forEach((pos, i) => {
  position_sort_costs.set(pos, i * 1000);
});
const player_sort_func = (p1, p2) => {
  return (Number(p1.salary) + position_sort_costs.get(p1.combined_position)) >= 
         (Number(p2.salary) + position_sort_costs.get(p2.combined_position)) ?
  -1 : 1;
}

const bgColor = 'lightGray';

const Team = (props) => {
   console.log(props)
    return (
        <div className="pure-u-11-12 pure-u-md-1-3">
        <table className="team-container pure-table pure-table-bordered" style={{margin:10}}>
        <caption style={{ backgroundColor: bgColor, minWidth:400 }}>
            <h3>{props.franchise.franchise}</h3>
            <span style={{ padding:4 }}><small>plyrs:</small> <strong>{props.franchise.player_count}</strong></span>
            <span style={{ paddingTop:4, paddingRight:0, paddingBottom:4, paddingLeft:4 }}>
                <small>spnt:</small> <strong>${props.franchise.spent}</strong></span>
            <span style={{ padding:4 }}>/</span>
            <span style={{ paddingTop:4, paddingRight:4, paddingBottom:4, paddingLeft:0 }}>
                <small>left:</small> <strong>${props.franchise.remain}</strong></span>
            <span style={{ padding:4 }}><small>max bid:</small> <strong>${props.franchise.remain}</strong></span>
            <span style={{ padding:4 }}><small>rnkg:</small> <strong>{props.franchise.total_rating}</strong></span>
        </caption>
        <tbody>

        {props.players.sort(player_sort_func).map(player =>
            <Player player={player} key={player.name+player.position+player.team} />
        )}

        </tbody></table></div>
    
    )
}

export default Team;