import React from 'react';
import { shallow } from "enzyme";
import App from "../client/components/App";
import ExerciseCreator from '../client/components/ExerciseCreator'
import HistoryDisplay from '../client/components/HistoryDisplay'

describe('Test App Entry point', function () {
  it('should has class name of App', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find({className: 'App'}));
  });
});

describe('Test Exercise Creator display', function () {
  it('should render an h3 element in the component', function () {
    const wrapper = shallow(<ExerciseCreator/>);
    expect(wrapper.find('h3').text()).toEqual('Create a new Exercise:');  });
});


describe('Test History Display', function () {
  it('should has class name of App', function () {
    const wrapper = shallow(<HistoryDisplay/>);
    expect(wrapper.find('h1').text()).toEqual('Drill History:');
  });
});