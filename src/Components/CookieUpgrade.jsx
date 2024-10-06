import { useEffect, useState } from 'react';
import './CookieUpgrade.css';

export default function (props) {

  const [buyQuantity, setBuyQuantity] = useState(0);

  useEffect(()=>{
     setBuyQuantity(0) 
     console.log("useeffect chale chhe")
  },[props.reset])

  return (
    <>
      <h2>{buyQuantity}</h2>
      <h2>{props.name}</h2>
      <h2>{"£" + props.cost}</h2>
      <h2>{props.increase}</h2>
      <button id='button' onClick={function () {
        if( props.cookieCountProp >= props.cost){
          setBuyQuantity(buyQuantity + 1)
          props.setCookieCountProp()
          props.setCookiePerSecondProp()
          
        }
      }
      }>Buy</button>
    </>
  );
}