import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import DropdownList  from './DropdownList.jsx';

configure({adapter: new Adapter()});

it ('renders without crashing', () => {
  shallow(<DropdownList />);
});