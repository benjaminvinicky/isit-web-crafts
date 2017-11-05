import React from "react";
import "../../public/javascripts/tools/tiny-pub-sub";
import ReactDOM from "react-dom";
import ReactHome from "../ReactHome";
import HomeButton from "../HomeButton";
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

describe("Webcrafts HomeButton Tests", function() {
    "use strict";

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

    it("publishes clientMakeHtml event after button click", () => {
        const wrapper = shallow(<HomeButton />);
        let subscriptionCalled = false;
        $.subscribe("clientMakeHtml", (event, target) => {
            console.log(JSON.stringify(event, null, 4));
            console.log(target);
            expect(event.type).toBe("clientMakeHtml");
            expect(target.message).toBe("The user wants to makeHtml.");
            subscriptionCalled = true;
        });
        wrapper.find("#makeHtml").simulate("click");
        expect(subscriptionCalled).toBeTruthy();
    });

    it("publishes clientMakeImg event after button click", () => {
        const wrapper = shallow(<HomeButton />);
        $.subscribe("clientMakeImg", (event, target) => {
            console.log(JSON.stringify(event, null, 4));
            console.log(target);
            expect(event.type).toBe("clientMakeImg");
            expect(target.message).toBe("The user wants to makeImg.");
        });
        wrapper.find("#makeImg").simulate("click");
    });
});
