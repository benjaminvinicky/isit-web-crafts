import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import MenuItem from 'material-ui/MenuItem';
import MakeHtmlDropDowns from '../MakeHtmlDropDowns';
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebugEnzyme = new ElfDebugEnzyme(true, 'make-html-drop-downs');

const pretag = "<pre id=\"configSummary\">\n" +
    "      [\n" +
    "          &quot;/home/charlie/Git/CloudNotes/tips/Summary.html&quot;,\n" +
    "          &quot;/home/charlie/Git/CloudNotes/tips/master-list.html&quot;\n" +
    "      ]\n" +
    "</pre>"

describe('React Home Tests', () => {

    fit('renders default value of H1 tag', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        const h1tag = <h1>Render Markdown as HTML</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });

    it('gets drop down value', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        //elfDebugEnzyme.getAll(wrapper, true);
        elfDebugEnzyme.getLast(wrapper, 'MenuItem', true);
        const code = <MenuItem primaryText='/home/charlie/Git/CloudNotes/Isit320/'/>;
        expect(wrapper.containsMatchingElement(code)).toBe(true);
    });

    it('renders button click message for last pre tag', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        wrapper.find('#generate').simulate('click');
        elfDebugEnzyme.getLast(wrapper, 'pre', true);
        const paragraphData = wrapper.find('pre').last().debug();
        expect(paragraphData).toContain('/home/charlie/Git/CloudNotes/tips');
    });

    it('renders button click message for last pre tag', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        wrapper.find('#generate').simulate('click');
        elfDebugEnzyme.getLast(wrapper, 'pre', true);
        const paragraphData = wrapper.find('pre').last().debug();
        expect(wrapper.containsMatchingElement(pretag)).toBe(true);
    });

});
