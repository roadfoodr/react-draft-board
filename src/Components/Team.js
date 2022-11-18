import React, {useState} from 'react';
// import '../Styles/Team.css';

//import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

// const heartSolid = <FontAwesomeIcon icon={faHeartSolid} />;
// const heartOutline = <FontAwesomeIcon icon={faHeartRegular} />;


const Team = (props) => {
   console.log(props)
    return (
        <div className="team-container">
        <ul>
            <li>{props.franchise.franchise}</li>
            <li>{props.franchise.player_count}</li>
            <li>{props.franchise.spent}</li>
            <li>{props.franchise.remain}</li>
            <li>{props.franchise.total_rating}</li>
        </ul>
        </div>
    
    )
}


export default Team;