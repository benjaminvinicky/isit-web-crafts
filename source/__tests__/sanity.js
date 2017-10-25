import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from '../ReactHome';
import HomeButton from '../HomeButton';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
configure({adapter: new Adapter()});

import ElfDebugEnzyme from '../ElfDebugEnzyme';

const elfDebugEnzyme = new ElfDebugEnzyme(true, 'sanity');

describe('WebCrafts Sanity Test', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ReactHome/>, div);
    });

    it('renders reacthome header', () => {
        const wrapper = shallow(<ReactHome/>);
        const h1tag = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });

});