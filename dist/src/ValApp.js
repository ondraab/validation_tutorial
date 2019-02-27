var _this = this;
import * as React from "react";
import { Parallax, ParallaxLayer } from "react-spring/addons";
var url = function (name, wrap) {
    if (wrap === void 0) { wrap = false; }
    return (wrap ? 'url(' : '') + "https://awv3node-homepage.surge.sh/build/assets/" + name + ".svg" + (wrap ? ')' : '');
};
var ValApp = function () {
    return React.createElement("div", null,
        React.createElement(Parallax, { ref: function (ref) { return (_this.parallax = ref); }, pages: 3 },
            React.createElement(ParallaxLayer, { offset: 1, speed: 1, style: { backgroundColor: '#805E73' } }),
            React.createElement(ParallaxLayer, { offset: 2, speed: 1, style: { backgroundColor: '#87BCDE' } }),
            React.createElement(ParallaxLayer, { offset: 0, speed: 0, factor: 3, style: { backgroundImage: url('stars', true), backgroundSize: 'cover' } }),
            React.createElement(ParallaxLayer, { offset: 1.3, speed: -0.3, style: { pointerEvents: 'none' } },
                React.createElement("img", { src: url('satellite4'), style: { width: '15%', marginLeft: '70%' } })),
            React.createElement(ParallaxLayer, { offset: 1, speed: 0.8, style: { opacity: 0.1 } },
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '55%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '10%', marginLeft: '15%' } })),
            React.createElement(ParallaxLayer, { offset: 1.75, speed: 0.5, style: { opacity: 0.1 } },
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '70%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '40%' } })),
            React.createElement(ParallaxLayer, { offset: 1, speed: 0.2, style: { opacity: 0.2 } },
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '10%', marginLeft: '10%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '75%' } })),
            React.createElement(ParallaxLayer, { offset: 1.6, speed: -0.1, style: { opacity: 0.4 } },
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '60%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '25%', marginLeft: '30%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '10%', marginLeft: '80%' } })),
            React.createElement(ParallaxLayer, { offset: 2.6, speed: 0.4, style: { opacity: 0.6 } },
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '20%', marginLeft: '5%' } }),
                React.createElement("img", { src: url('cloud'), style: { display: 'block', width: '15%', marginLeft: '75%' } })),
            React.createElement(ParallaxLayer, { offset: 2.5, speed: -0.4, style: { display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' } },
                React.createElement("img", { src: url('earth'), style: { width: '60%' } })),
            React.createElement(ParallaxLayer, { offset: 2, speed: -0.3, 
                // @ts-ignore
                style: {
                    backgroundSize: '80%',
                    backgroundPosition: 'center',
                    backgroundImage: url('clients', true)
                } }),
            React.createElement(ParallaxLayer, { offset: 0, speed: 0.1, 
                // @ts-ignore
                onClick: function () { return _this.parallax.scrollTo(1); }, style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement("img", { src: url('server'), style: { width: '20%' } })),
            React.createElement(ParallaxLayer, { offset: 1, speed: 0.1, 
                // @ts-ignore
                onClick: function () { return _this.parallax.scrollTo(2); }, 
                // @ts-ignore
                style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement("img", { src: url('bash'), style: { width: '40%' } })),
            React.createElement(ParallaxLayer, { offset: 2, speed: -0, 
                // @ts-ignore
                style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, 
                // @ts-ignore
                onClick: function () { return _this.parallax.scrollTo(0); } },
                React.createElement("img", { src: url('clients-main'), style: { width: '40%' } }))));
};
;
//# sourceMappingURL=ValApp.js.map