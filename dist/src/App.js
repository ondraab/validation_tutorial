import * as tslib_1 from "tslib";
import * as React from 'react';
import './App.css';
import './theme-ebi-research.css';
import { NavLink } from "react-router-dom";
import { Parallax, ParallaxLayer } from "react-spring/addons";
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    // private parallax: any;
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { pdbId: '1cbs', models: ['1'], chains: ['A'] };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this._pdbId = '1cbs';
        return _this;
    }
    Object.defineProperty(App.prototype, "pdbId", {
        get: function () {
            return this._pdbId;
        },
        set: function (value) {
            this._pdbId = value;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.handleChange = function (event) {
        if (event.target.value.length == 4) {
            this._pdbId = event.target.value;
        }
    };
    App.prototype.handleSubmit = function (event) {
        if (this._pdbId.length == 4) {
            event.preventDefault();
            this.setState({ pdbId: this._pdbId });
        }
    };
    App.prototype.render = function () {
        var _this = this;
        var url = function (name, wrap) {
            if (wrap === void 0) { wrap = false; }
            return (wrap ? 'url(' : '') + "https://awv3node-homepage.surge.sh/build/assets/" + name + ".svg" + (wrap ? ')' : '');
        };
        return React.createElement("div", { className: "App" },
            React.createElement("div", { className: "main-title masthead" },
                React.createElement("h1", { className: "white-color" }, "Validation tutorial"),
                React.createElement("div", { className: "navbar" },
                    React.createElement(NavLink, { to: "/", activeClassName: "nav-active" },
                        React.createElement("h3", null, "Validation")),
                    React.createElement(NavLink, { to: "/coordinates" },
                        React.createElement("h3", null, "Coordinates")),
                    React.createElement(NavLink, { to: "/ligands" },
                        React.createElement("h3", null, "Ligands")))),
            React.createElement("div", null,
                React.createElement(Parallax, { ref: function (ref) { return (_this.parallax = ref); }, pages: 3 },
                    React.createElement(ParallaxLayer, { offset: 1, speed: 1, style: { backgroundColor: '#aeaeae' } }),
                    React.createElement(ParallaxLayer, { offset: 2, speed: 1, style: { backgroundColor: '#7c827e' } }),
                    React.createElement(ParallaxLayer, { offset: 0, speed: 0, factor: 3, style: { backgroundImage: url('stars', true), backgroundSize: 'cover' } }),
                    React.createElement(ParallaxLayer, { offset: 1.3, speed: -0.3, style: { pointerEvents: 'none' } }),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.8, style: { opacity: 0.1 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '55%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '10%', marginLeft: '15%' } })),
                    React.createElement(ParallaxLayer, { offset: 1.75, speed: 0.5, style: { opacity: 0.1 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '70%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '20%', marginLeft: '40%' } })),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.2, style: { opacity: 0.2 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '10%', marginLeft: '10%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '20%', marginLeft: '75%' } })),
                    React.createElement(ParallaxLayer, { offset: 1.6, speed: -0.1, style: { opacity: 0.4 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '60%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '25%', marginLeft: '30%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '10%', marginLeft: '80%' } })),
                    React.createElement(ParallaxLayer, { offset: 2.6, speed: 0.4, style: { opacity: 0.6 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '5%' } }),
                        React.createElement("img", { src: "https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png", style: { display: 'block', width: '15%', marginLeft: '75%' } })),
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
                        React.createElement("div", { style: { width: '80%' } },
                            React.createElement("h2", null, "What is validation and why to validate?"),
                            React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam faucibus mi quis velit. Maecenas sollicitudin. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Integer lacinia. Et harum quidem rerum facilis est et expedita distinctio. Vivamus luctus egestas leo. Aliquam erat volutpat. Aliquam in lorem sit amet leo accumsan lacinia. Phasellus faucibus molestie nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero."),
                            React.createElement("p", null, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Quisque tincidunt scelerisque libero. Etiam posuere lacus quis dolor. Integer pellentesque quam vel velit. Aenean vel massa quis mauris vehicula lacinia. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Aliquam ornare wisi eu metus. Nam sed tellus id magna elementum tincidunt. Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos."),
                            React.createElement("div", null,
                                React.createElement("img", { src: "/src/2r4r_multipercentile_validation.svg", style: { width: '50%', display: 'inline-block', verticalAlign: 'top' } }),
                                React.createElement("div", { style: { width: '50%', display: 'inline-block' } },
                                    React.createElement("h4", null, "Useful links"),
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            "A glossary of terms related to structural quality: ",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html" }, "http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html"))),
                                        React.createElement("li", null,
                                            "An introduction to protein crystallography: ",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://www.ruppweb.org/Xray/101index.html" }, "http://www.ruppweb.org/Xray/101index.html"))),
                                        React.createElement("li", null,
                                            "List of wwPDB documents and resources related to validation and validation reports: ",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://wwpdb.org/validation/validation-reports" }, "https://wwpdb.org/validation/validation-reports"))),
                                        React.createElement("li", null,
                                            "Overview of wwPDB Validation Task Forces (VTFs) and their published recommendations: ",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://wwpdb.org/task/validation-task-forces" }, "https://wwpdb.org/task/validation-task-forces"))),
                                        React.createElement("li", null,
                                            "The websites of the wwPDB partners, PDBe (",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://pdbe.org" }, "http://pdbe.org")),
                                            "), PDBj (",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://pdbj.org" }, "http://pdbj.org")),
                                            ") and RCSB PDB (",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://rcsb.org" }, "https://rcsb.org")),
                                            ")"),
                                        React.createElement("li", null,
                                            React.createElement("a", { href: "http://swift.cmbi.ru.nl/gv/pdbreport/" }, "PDBReport"),
                                            ", a collection of quality reports, generated by the program WHAT IF, for all models that have been deposited in the PDB, and an\u00A0",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://swift.cmbi.ru.nl/gv/whatcheck/" }, "explanation of the WHAT IF output"))),
                                        React.createElement("li", null,
                                            "An extensive review of validation in protein crystallography:\u00A0",
                                            React.createElement("u", null,
                                                React.createElement("a", { href: "http://scripts.iucr.org/cgi-bin/paper?S0907444999016364" }, "http://scripts.iucr.org/cgi-bin/paper?S0907444999016364")))))))),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.1, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        React.createElement("div", { style: { width: '60%', margin: '0 auto 0 10%' } },
                            React.createElement("h2", null, "Before we start, let's review some important facts"),
                            React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam faucibus mi quis velit. Maecenas sollicitudin. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Integer lacinia. Et harum quidem rerum facilis est et expedita distinctio. Vivamus luctus egestas leo. Aliquam erat volutpat. Aliquam in lorem sit amet leo accumsan lacinia. Phasellus faucibus molestie nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero."),
                            React.createElement("p", null, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Quisque tincidunt scelerisque libero. Etiam posuere lacus quis dolor. Integer pellentesque quam vel velit. Aenean vel massa quis mauris vehicula lacinia. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Aliquam ornare wisi eu metus. Nam sed tellus id magna elementum tincidunt. Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos."))),
                    React.createElement(ParallaxLayer, { offset: 2, speed: -0, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, 
                        // @ts-ignore
                        onClick: function () { return _this.parallax.scrollTo(0); } },
                        React.createElement("img", { src: url('clients-main'), style: { width: '40%' } })))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map