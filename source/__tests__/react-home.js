import React from 'react';
import HomeButton from '../HomeButton';
import ReactHome from '../ReactHome';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ElfDebugEnzyme from "../ElfDebugEnzyme";

configure({ adapter: new Adapter() });
//import ElfDebugEnzyme from '../ElfDebugEnzyme';
//const elfDebugEnzyme = new ElfDebugEnzyme(true, 'home-buttons');
import '../../public/javascripts/tools/tiny-pub-sub.js';

const elfDebugEnzyme = new ElfDebugEnzyme(true, "make-image-home-button");

describe('WebCrafts Home Buttons Tests', function() {
    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('publishes clientMakeHtml event after button click', () => {
        const wrapper = shallow(<HomeButton />);
        let subscriptionCalled = false;
        $.subscribe('clientMakeHtml', (event, target) => {
            expect(event.type).toBe('clientMakeHtml');
            expect(target.message).toBe('The user wants to makeHtml.');
            subscriptionCalled = true;
        });
        wrapper.find('#makeHtml').simulate('click');
        expect(subscriptionCalled).toBeTruthy();
    });

    it('publishes clientMakeHtml event after button click with done', done => {
        const wrapper = shallow(<HomeButton />);
        $.subscribe('clientMakeHtml', (event, target) => {
            expect(target.message).toBe('The user wants to makeHtml.');
            done();
        });
        wrapper.find('#makeHtml').simulate('click');
    });

    it('renders default value of H1 tag', () => {
        const wrapper = shallow(<ReactHome />);
        const h1tag = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });

});