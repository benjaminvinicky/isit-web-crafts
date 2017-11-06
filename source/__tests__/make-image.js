import React from "react";
import MakeImage from "../MakeImage";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ElfDebugEnzyme from "../ElfDebugEnzyme";

const elfDebugEnzyme = new ElfDebugEnzyme(true, "make-image");

configure({ adapter: new Adapter() });

import jQuery from "jquery";

global.jQuery = jQuery;
global.$ = jQuery;

describe("MakeImage Basic Tests Suite", function() {
    "use strict";

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

    it("renders ImageHomeButton without crashing", () => {
        const wrapper = mount(<MakeImage />);
        const definition = (
            <p>This is a React MakeImage HomeButton component.</p>
        );
        elfDebugEnzyme.getLast(wrapper, "p", true);
        expect(wrapper.contains(definition)).toEqual(true);
    });
});
