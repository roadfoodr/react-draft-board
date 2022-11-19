import React, {useState} from 'react';
// import '../Styles/Team.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

// const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />;
// const heartOutline = <FontAwesomeIcon icon={faHeartRegular} />;


const bgColor = 'lightgreen';

const Team = (props) => {
   console.log(props)
    return (
        <div className="pure-u-11-12 pure-u-md-1-3">
        <table className="team-container pure-table" style={{margin:10}}>
        <caption style={{ backgroundColor: bgColor, minWidth:400}}>
            <span style={{ padding:10 }}>{props.franchise.franchise}</span>
            <span style={{ padding:10 }}>{props.franchise.player_count}</span>
            <span style={{ padding:10 }}>${props.franchise.spent}</span>
            <span style={{ padding:10 }}>${props.franchise.remain}</span>
            <span style={{ padding:10 }}>{props.franchise.total_rating}</span>
        </caption>
        <tbody>
        <tr>
        <td style={{ width:400 }}>{props.players[0].name}</td>
        <td style={{ width:50 }}>{props.players[0].position}</td>
        <td style={{ width:50 }}>{props.players[0].team}</td>
        <td style={{ width:50 }}>${props.players[0].salary}</td>
        <td style={{ width:50 }}>{props.players[0].rating}</td>
        </tr>
        </tbody>

        </table></div>
    
    )
}


export default Team;