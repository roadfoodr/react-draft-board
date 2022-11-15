import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

import {db} from "./firebase";
import {doc, setDoc} from "firebase/firestore";

const Add = (props) => {
    const urlParams = useParams();

    useEffect(() => {
        if (urlParams) {
            const thisYear = new Date().getFullYear();
            const docID = urlParams.nameLast + urlParams.nameFirst + urlParams.position + urlParams.team + thisYear;
            console.log(docID);
            setDoc(doc(db, "players", docID), {
                franchise: urlParams.franchise,
                nameLast: urlParams.nameLast,
                nameFirst: urlParams.nameFirst,
                position: urlParams.position,
                combined_position: (urlParams.position === "WR" || urlParams.position === "TE") ? 
                                    "WRTE" : urlParams.position,
                team: urlParams.team,
                salary: Number(urlParams.salary),
                rating: Number(urlParams.rating),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString('en-US'),   
                year: thisYear    
                })
            }
      }, [urlParams])

    return (
        <div id="Add">
            <h1>Adding Player</h1>
            <p>the parameters are:
            <ul>
            <li>{urlParams.franchise}</li>
            <li>{urlParams.nameLast}</li>
            <li>{urlParams.nameFirst}</li>
            <li>{urlParams.position}</li>
            <li>{urlParams.team}</li>
            <li>{urlParams.salary}</li>
            <li>{urlParams.rating}</li>
            </ul>
        </p>
        </div>
    
    )
}

export default Add;