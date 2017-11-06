import React from "react";
import MakeHtmlDropDowns from "../MakeHtmlDropDowns";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ElfDebugEnzyme from "../ElfDebugEnzyme";

const elfDebugEnzyme = new ElfDebugEnzyme(true, "sanity");

configure({ adapter: new Adapter() });

import jQuery from "jquery";

global.jQuery = jQuery;
global.$ = jQuery;

describe("MakeHtml Dropdown test Suite", function() {
    "use strict";

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });
});
