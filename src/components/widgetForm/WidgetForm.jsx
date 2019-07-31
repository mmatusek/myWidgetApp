import React from 'react';
import PropTypes from 'prop-types';
import Ordinal from 'ordinal';

import './WidgetForm.css';


const WidgetForm= (props) => {

    /**
     *  Function to specify the day of the week i.e. 'Moday'
     *  @param {string} date - current date i.e. '2019-07-31'
     *  @param {boolean} isActive - false- received from content, true- received from firstItem
     */
   const weekDayName= (date, isActive) =>{
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const item = new Date(date).getDay();
        if (isActive) return dayNames[item] + ', ';
        else return dayNames[item];
    };

    /**
     *  Function to specify the month of the year i.e. 'January'
     *  @param {string} date - current date i.e. '2019-07-31'
     */
   const monthName= (date) =>{
        const monthNames = ['January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ',
                            'September ', 'October ', 'November ', 'December '];
        const item = new Date(date).getMonth();

        return monthNames[item];
    };

    /**
     *  Function for setting current weather icon
     *  @param {string} type - information from API about the type of weather i.e. Sunny
     */
    const  choosePicture = (type) => {
        switch (type) {
            case 'Sunny':
                return <img src="../images/sunny.png" alt="sunny"/>;
            case 'RainLight':
                return <img src="../images/rain_light.png" alt="rain light"/>;
            case 'RainAndCloudy':
                return <img src="../images/rain_s_cloudy.png" alt="rain and cloudy"/>;
            case 'Cloudy':
                return <img src="../images/cloudy.png" alt="cloudy"/>;
            case 'PartlyCloudy':
                return <img src="../images/partly_cloudy.png" alt="partly cloudy"/>;
            default: break;
        }
    };
    /**
     *  Component that describes how a section of the UI should appear for the first item
     *  Ordinal - Function to determine the correct ordinal indicators
     */
    const firstItem = props.currentCityWeather.splice(0,1).map((item, index) =>
        <React.Fragment key={index}>
            <div className="currentDay">
                 <h3>
                    {weekDayName(item.date.slice(0,10),true)}
                    {monthName(item.date)}
                    {Ordinal(parseInt(item.date.slice(8,10)))}
                </h3>
                 <h5>{item.type}</h5>
            </div>
                <ul>
                <li className="weatherImage">
                    <div>
                    {choosePicture(item.type)}
                    {item.temperature} <sup>&#176;C</sup>
                    </div>
                </li>
                  <li className="weatherInfo">
                    <span>
                    <div>Precipitation: {item.precipitation}</div>
                    <div>Humidity: {item.humidity}</div>
                    <div>Wind: {item.windInfo.speed} mph {item.windInfo.direction}</div>
                    <div>Pollen Count: {item.pollenCount}</div>
                    </span>
                    </li>
                </ul>
        </React.Fragment>
    );

    /**
     *  Component that describes how a section of the UI should appear for the second item and the next ones
     */
      const content = props.currentCityWeather.map((item, index) => (
           <React.Fragment key={index}>
                <tr>
                    <td><div><strong>{weekDayName(item.date.slice(0,10), false)}</strong></div></td>
                    <td><div>{choosePicture(item.type)}</div></td>
                    <td className="temperatureDivs">
                        <div className="temperatureDivLeft">{item.temperature}<sup>&#176;C</sup></div>
                        <div className="temperatureDivRight">
                        {Math.floor((item.temperature*1.8)+32)}<sup>&#176;F</sup>
                        </div>
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
};

 WidgetForm.propTypes = {
    currentCityWeather: PropTypes.array.isRequired
};

export default WidgetForm;