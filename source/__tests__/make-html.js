import React from "react";
import MakeHtml from "../MakeHtml";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ElfDebugEnzyme from "../ElfDebugEnzyme";

const elfDebugEnzyme = new ElfDebugEnzyme(true, "sanity");

configure({ adapter: new Adapter() });

import jQuery from "jquery";

global.jQuery = jQuery;
global.$ = jQuery;

describe("MakeHtml Basic Tests Suite", function() {
    "use strict";

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

    it("renders HtmlHomeButton without crashing", () => {
        const wrapper = mount(<MakeHtml />);
        const definition = <p>This is the React MakeHtml component.</p>;
        elfDebugEnzyme.getLast(wrapper, "p", true);
        expect(wrapper.contains(definition)).toEqual(true);
    });
});
