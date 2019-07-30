import React from 'react';

import './WidgetForm.css';


const WidgetForm= (props) => {

   const weekDayName= (day, isActive = false) =>{
        const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        const dayNamesActive = ["Sunday, ","Monday, ","Tuesday, ","Wednesday, ","Thursday, ","Friday, ","Saturday, "]
        const item = new Date(day).getDay();
        if(isActive) return dayNamesActive[item]
        else return dayNames[item]
    }

   const monthName= (month) =>{
        const monthNames = ["January ","February ","March ","April ","May ","June ","July ","August ","September ","october ","November ","December "];
        const item = new Date(month).getMonth();
     return monthNames[item]
    }

    const numberTh = (num) => {
        switch (num) {
            case 1:
                return `${num}st`
            case 2:
                return `${num}nd`
            case 21:
                return `${num}st`
            case 22:
                return `${num}nd`
            case 23:
                return `${num}rd`
            case 3:
                return `${num}rd`
            case 31:
                return `${num}st`
            default:
                return `${num}th`
        }
    }

      const  choosePicture = (type) => {
        switch (type) {
            case 'Sunny':
                return <img src="../images/sunny.png" alt="sunny"/>
            case 'RainLight':
                return <img src="../images/rain_light.png" alt="rain light"/>
            case 'RainAndCloudy':
                return <img src="../images/rain_s_cloudy.png" alt="rain and cloudy"/>
            case 'Cloudy':
                return <img src="../images/cloudy.png" alt="cloudy"/>
            case 'PartlyCloudy':
                return <img src="../images/partly_cloudy.png" alt="partly cloudy"/>
            default: break
        }
    }
 
    const firstItem = props.currentCityWeather.splice(0,1).map((item, index) => 
        <React.Fragment key={index}>
             <div className="currentday"><h3>{weekDayName(item.date, true)}{monthName(item.date)}{numberTh(item.date.slice(8,10))}</h3> <h5>{item.type}</h5></div>
                <ul>
                <li className="weatherimage"><div>{choosePicture(item.type)} {item.temperature} <sup>&#176;C</sup></div></li>
                  <li className="weatherinfo">
                    <span>
                    <div>Precipitation: {item.precipitation}</div>
                    <div>Humidity: {item.humidity}</div>
                    <div>Wind: {item.windInfo.speed} mph {item.windInfo.direction}</div>
                    <div>Pollen Count: {item.pollenCount}</div>
                    </span>
                    </li>
                </ul>
                
        </React.Fragment>
    )

      const content= props.currentCityWeather.map((item, index) => (
           <React.Fragment key={index}>
                <tr>
                    <td className="nextday"><div><strong>{weekDayName(item.date.slice(0,10))}</strong></div></td>
                    <td><div>{choosePicture(item.type)}</div></td> 
                    <td className="temperaturedivs">
                        <div>{item.temperature}<sup>&#176;C</sup> </div> 
                        <div>{Math.floor((item.temperature*1.8)+32)}<sup>&#176;F</sup></div>
                    </td>
                    <td><div>Pollen {item.pollenCount}</div></td>
                </tr>
            </React.Fragment >
    ));
       
    
    return ( 
        <div className="main">
            <div>{firstItem}</div>
            <table className="rwd-table">
                <tbody>
                    {content}
                </tbody>
            </table>  
            </div>
                );
 }    
        
    

export default WidgetForm;