import React from 'react';
import '../Styles/UpdateControls.css';

const UpdateControls = (props) => {
  return (
    <div className="update-controls is-center">

      <small>Updates <strong>{props.tickPaused ? "Paused" : "Active"}</strong></small>

      <button className="pure-button" onClick={()=>{
        if (props.tickPaused) {
          props.setTick(0);
        }
        props.setTickPaused(!props.tickPaused);
      }} >{props.tickPaused ? "Resume" : "Pause"}</button>

      <button className="pure-button" onClick={()=>{ 
        props.setTick(props.tick + 1);
      }} >Refresh</button>
    </div>
  );
}

export default UpdateControls;
