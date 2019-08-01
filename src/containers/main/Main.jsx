import React, {Component} from 'react';

import './Main.css';
import DropdownList from '../../components/dropdownList/DropdownList.jsx';
import WidgetForm from '../../components/widgetForm/WidgetForm.jsx';


class Main extends Component {

  state = {
    cityAPI: 'http://dev-weather-api.azurewebsites.net/api/city',
    cityList : [],
    cityName: '',
    currentCityWeather: [],
    fetchOptions: {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }
  }

  componentDidMount() {
    this.fetchDataAPI();
  }

  /**
   *  Function for fetching data from API
   */
  fetchDataAPI = () => {
    const { cityAPI, fetchOptions } = this.state;

    fetch(cityAPI, fetchOptions)
      .then(response => {
        if (response.status === 200){
          return response;
        }
        throw Error('No response from API');
      })
      .then(response => response.json())
      .then(cityList => {
        this.convertToSelectForm(cityList);
      });
  }

  /**
   *  Function that coverts current form of city list into form used by 'Select' element
   *  @param {array} cityList - list of all cities available form API - i.e. [{name: 'London', id: 1},..]
   */
  convertToSelectForm = ( cityList ) => {
    const currentCityList = [...cityList];

    const selectFormCityList = currentCityList.map(city => {
        return {
          label: city.name,
          value: city.id
        };
    });

    this.setState({ cityList: selectFormCityList });
  }

  /**
   *  Function for handle data received from child component - DropdownList
   *  @param {array} currentCityWeather - weather forecasts of the city selected in the child component
   *                                      - i.e. [{cityId: '2', date:..},..]
   *  @param {string} cityName - name of the city selected in the child component - DropdownList - i.e. 'London'
   */
  weatherForecast = ( currentCityWeather, cityName ) => {
    this.setState({ currentCityWeather, cityName });
  }

  render(){
    const { cityList, cityName, currentCityWeather } = this.state;

    return (
      <div className="App">
        <header>
          <div>Weather App</div>
          <div>Martyna Matusek</div>
          </header>
        <main>
        <DropdownList options={cityList} handleWeatherForecast={this.weatherForecast}/>
        <WidgetForm currentCityWeather={currentCityWeather} cityName={cityName}/>
        </main>
      </div>
  );
}
}

export default Main;





