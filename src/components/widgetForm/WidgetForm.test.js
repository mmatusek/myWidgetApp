import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import WidgetForm  from './WidgetForm.jsx';

const mockData = [
  {
    'cityId': '2',
    'date': '2019-08-02T00:00:00',
    'humidity': 50,
    'pollenCount': 22,
    'precipitation': 90,
    'temperature': 18,
    'type': 'PartlyCloudy',
    'windInfo': {
      'direction': 'SW',
      'speed': 3
    }
  }
];

configure({adapter: new Adapter()});

it ('renders without crashing', () => {
  shallow(<WidgetForm currentCityWeather={mockData}/>);
});