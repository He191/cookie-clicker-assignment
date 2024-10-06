import CookieUpgrade from './Components/CookieUpgrade';
import { useEffect, useState } from 'react';
import './App.css';

export default function () {
  // declaring states
  const [cookieUpgrade, setCookieUpgrade] = useState([]);
  const [cookieCount, setCookieCount] = useState(0);
  const [cookiePerSecond, setCookiePerSecond] = useState(1);
  const [reset, setReset] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //fetch data async await
      const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
      //turn the data into json
      const data = await response.json();
      
      setCookieUpgrade(data);
    } 
    fetchData();
  }, []);
useEffect(()=>{
  const interval = setInterval(()=>{
    setCookieCount((curruntCookieCount)=> curruntCookieCount +cookiePerSecond);
  },1000)
  return()=>{
    clearInterval(interval);
  }

},[cookiePerSecond])

  return (
    <>
      <h1>Cookie Clicker</h1>
      <div id='totalcount'>Total Count :{cookieCount}</div>
      <h3 id="cookiePerSecond">CookiePerSecond :{cookiePerSecond}</h3>
      <button onClick={()=>setCookieCount(cookieCount+100)}>Cookie Button</button>
      <button onClick= {function(){
        setCookieCount(0)
        setCookiePerSecond(1)
        setReset(reset+1)
      }}  >Reset cookie</button>
      {cookieUpgrade.map((item) => (
        <div id='cookieUpgrade'
          key={item.id}>
          <CookieUpgrade
            reset={reset}
            name={item.name}
            cost={item.cost}
            increase= { item.increase}
            // Used this link : (https://react.dev/learn/sharing-state-between-components )) to create this new props
            setCookieCountProp={()=> setCookieCount(cookieCount-item.cost)}
            setCookiePerSecondProp={()=>setCookiePerSecond(cookiePerSecond+item.increase)}
            cookieCountProp={cookieCount}

          />
        </div>
      )
      )
      }
    </>
  );
};
