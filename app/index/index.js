"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_converter=require("app/converter/converter"),_converter2=_interopRequireDefault(_converter);require("polythene/theme/theme");var app={};app.view=function(){return(0,_mithril2.default)(".converter",[(0,_mithril2.default)("h1","Mithril HTML to JavaScript converter"),_mithril2.default.component(_converter2.default),(0,_mithril2.default)("div",{class:"footer"},[(0,_mithril2.default)("a",{href:"https://github.com/ArthurClemens/mithril-template-converter"},"Code on Github"),(0,_mithril2.default)("span",". "),(0,_mithril2.default)("span","Built for "),(0,_mithril2.default)("a",{href:"https://github.com/lhorie/mithril.js"},"Mithril"),(0,_mithril2.default)("span"," with "),(0,_mithril2.default)("a",{href:"https://github.com/ArthurClemens/Polythene"},"Polythene"),(0,_mithril2.default)("span",".")])])},_mithril2.default.mount(document.body,app);