import React from "react";
import ReactHome from "../ReactHome";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ElfDebugEnzyme from "../ElfDebugEnzyme";
const elfDebugEnzyme = new ElfDebugEnzyme(true, "sanity");
configure({ adapter: new Adapter() });
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;
//import '../fake-pub-sub';
//import raf from '../temp-poly-fills';

describe("React Home Tests", function() {
    "use strict";

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

    it("renders HomeButton without crashing", () => {
        const wrapper = shallow(<ReactHome />);
        const h1tag = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, "h1", true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });
});
