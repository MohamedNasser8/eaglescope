parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"CtpW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=i(require("react")),e=require("../../../common/utils.js"),r=i(require("d3"));function n(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,r=new WeakMap;return(n=function(t){return t?r:e})(t)}function i(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var r=n(e);if(r&&r.has(t))return r.get(t);var i={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if("default"!==o&&Object.prototype.hasOwnProperty.call(t,o)){var c=a?Object.getOwnPropertyDescriptor(t,o):null;c&&(c.get||c.set)?Object.defineProperty(i,o,c):i[o]=t[o]}return i.default=t,r&&r.set(t,i),i}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,r){return e&&c(t.prototype,e),r&&c(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&l(t,e)}function l(t,e){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=y();return function(){var r,n=h(t);if(e){var i=h(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return p(this,r)}}function p(t,e){if(e&&("object"===a(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return d(t)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=function(e){u(i,t.PureComponent);var n=f(i);function i(e){var r;return o(this,i),(r=n.call(this,e)).self=t.default.createRef(),r.state={margin:{top:10,right:10,bottom:35,left:10},loading:!0,error:null,fields:{y:"key",x:"value"}},r.state.data=r.transform(r.props.data,r.props.fields.y),r}return s(i,[{key:"transform",value:function(t,e){return r.nest().key(function(t){return t[e]}).sortKeys(r.ascending).rollup(function(t){return t.length}).entries(t)}},{key:"createXAixs",value:function(t){}},{key:"createYAixs",value:function(t){}},{key:"createYScale",value:function(t,e){return r.scaleBand().domain(this.state.data.map(function(e){return e[t]})).range([e,0]).padding(.1)}},{key:"createXScale",value:function(t,e){return r.scaleLinear().domain([0,r.max(this.state.data,function(e){return e[t]})]).range([0,e])}},{key:"drawBar",value:function(t,e){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"og",i=t.selectAll("rect.".concat(n)).data(e,function(t){return t[r.state.fields.y]}),a=i.enter().append("rect");return a.attr("class","".concat(n)).attr("x",0).attr("height",this.yScale.bandwidth()).attr("y",function(t){return this.yScale(t[this.state.fields.y])}.bind(this)),a.on("click",function(t,e){var n=a.filter(function(e){return e===t}).data()[0].key,i={id:r.props.id,title:r.props.title,field:r.props.fields.y,operation:"eq",values:n};r.props.filterAdded([i])}),a.append("title").text(function(t){return"".concat(t.key,":").concat(t.value)}),i.merge(a).transition().duration(1e3).attr("width",function(t){return this.xScale(t[this.state.fields.x])}.bind(this)).selectAll(".label").text(function(t){return t.key}),i.exit().transition().duration(1e3).attr("width",0).remove(),i}},{key:"componentDidUpdate",value:function(){var t=[];t=this.props.filters.length>0?this.transform(this.props.filterData,this.props.fields.y):this.transform(this.props.data,this.props.fields.y),this.filterbars=this.drawBar(this.viewer,t,"ft"),this.createTextLabel()}},{key:"componentDidMount",value:function(){var t=this;setTimeout(function(){var e=t.self.current.getBoundingClientRect(),n=e.width-t.state.margin.left-t.state.margin.right;t.innerHeight=e.height-t.state.margin.top-t.state.margin.bottom;var i=r.select(t.self.current).append("svg").attr("width",e.width).attr("height",e.height);t.viewer=i.append("g").attr("transform","translate("+t.state.margin.left+","+t.state.margin.top+")"),t.xScale=t.createXScale(t.state.fields.x,n),t.yScale=t.createYScale(t.state.fields.y,t.innerHeight),t.viewer.append("g").attr("transform","translate(0,".concat(t.innerHeight,")")).call(r.axisBottom(t.xScale).tickSize(-t.innerHeight)),t.bars=t.drawBar(t.viewer,t.state.data,"og"),t.filterbars=t.drawBar(t.viewer,t.state.data,"ft"),t.createTextLabel(),t.componentDidUpdate()},500)}},{key:"createTextLabel",value:function(){var t=this;this.viewer.selectAll(".label").remove(),this.viewer.selectAll(".label").data(this.state.data,function(e){return e[t.state.fields.y]}).enter().append("text").attr("class","label").attr("x",5).attr("y",function(t){return this.yScale(t[this.state.fields.y])+this.yScale.bandwidth()/2+4}.bind(this)).text(function(t){return t.key})}},{key:"render",value:function(){return t.default.createElement("div",{id:this.props.id,ref:this.self,style:{width:"100%",height:"100%"}})}}]),i}();exports.default=b;
},{"react":"n8MK","../../../common/utils.js":"by1F","d3":"UzF0"}]},{},[], null)
//# sourceMappingURL=HorizontalBarChart.e067fa97.js.map