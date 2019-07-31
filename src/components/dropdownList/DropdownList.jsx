import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class DropdownList extends Component {

    state = {
        cityAPI: 'http://dev-weather-api.azurewebsites.net/api/city/',
        currentCity: 'Select city...',
        fetchOptions: {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    }

    /**
     *  Function for handling onChange action and fetching weather forecasts data from API for current city
     *  @param {object} event - event object received from element after onChange action
     */
    handleInputChange = (event) => {
        const { fetchOptions, cityAPI } = this.state;

        // get current date - i.e. 2019-07-15
        const whatDay = new Date().toJSON().slice(0,10);
        const forecastAPI = `${cityAPI}${event.value}/weather?date=${whatDay}`;
        const currentCity = event.label;

        fetch(forecastAPI, fetchOptions)
          .then(response => {
            if (response.status === 200) {
              return response;
            }
            throw Error('No response from API');
          })
          .then(response => response.json())
          .then(data => {
            this.setState({ currentCity });
            this.props.handleWeatherForecast(data, currentCity);
        });
    }

    render() {
        const { currentCity } = this.state;
        const { options } = this.props;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <Select
                                options={options}
                                value={currentCity}
                                onChange={this.handleInputChange}
                                placeholder={currentCity}
                            />
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DropdownList.propTypes = {
    options: PropTypes.array.isRequired,
    handleWeatherForecast: PropTypes.func.isRequired
};

export default DropdownList;