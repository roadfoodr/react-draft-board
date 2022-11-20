import React from 'react';
import Player from './Player.js';

import '../Styles/Team.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    console.log("entering Team")
    console.log(props)
    return (
        <div className="pure-u-11-12 pure-u-md-1-3">
        <table className="team-container pure-table pure-table-bordered" style={{margin:10}}>
        <caption style={{ backgroundColor: bgColor, minWidth:425}}>
            <h2 onClick={()=>props.setSortField("franchise")}>{props.franchise.franchise}</h2>
            <span style={{ padding:4 }} onClick={()=>props.setSortField("player_count")}>
                <small>plyrs:</small><strong>{props.franchise.player_count_off}</strong>|
                <strong>{props.franchise.player_count_dst}</strong></span>
            <span onClick={()=> { props.setSortField("spent");  props.setColorField("spent"); }}>
                <span style={{ paddingTop:4, paddingRight:0, paddingBottom:4, paddingLeft:4 }}>
                    <small>spnt:</small><strong>${props.franchise.spent}</strong></span>
                <span style={{ padding:1 }}>|</span>
                <span style={{ paddingTop:4, paddingRight:4, paddingBottom:4, paddingLeft:0 }}>
                    <small>left:</small><strong>${props.franchise.remain}</strong></span>
            </span>
            { /* <span><br></br></span> */ }
            <span style={{ padding:4 }} onClick={()=>props.setSortField("maxbid")}>
                <small>max:</small><strong>${props.franchise.maxbid}</strong></span>
            <span style={{ padding:4 }} 
                  onClick={()=> { props.setSortField("total_rating");  props.setColorField("total_rating"); }}>
                <small>rnkg:</small><strong>{props.franchise.total_rating}</strong></span>
        </caption>
        <tbody>

        { /* // TODO: within position, sort by timestamp instead of salary? */ }
        {props.players.sort(player_sort_func).map(player =>
            <Player player={player} key={player.name+player.position+player.team} />
        )}

        </tbody></table></div>
    
    )
}

export default Team;