import * as tslib_1 from "tslib";
import * as React from 'react';
import './App.css';
import './theme-ebi-research.css';
import { NavLink } from "react-router-dom";
import { Parallax, ParallaxLayer } from "react-spring/addons";
var Coordinates = /** @class */ (function (_super) {
    tslib_1.__extends(Coordinates, _super);
    function Coordinates(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { pdbId: '1cbs', models: ['1'], chains: ['A'] };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this._pdbId = '1cbs';
        window.addEventListener('scroll', function () {
            console.log('fafas');
        });
        return _this;
    }
    Object.defineProperty(Coordinates.prototype, "pdbId", {
        get: function () {
            return this._pdbId;
        },
        set: function (value) {
            this._pdbId = value;
        },
        enumerable: true,
        configurable: true
    });
    Coordinates.prototype.handleChange = function (event) {
        if (event.target.value.length == 4) {
            this._pdbId = event.target.value;
        }
    };
    Coordinates.prototype.handleSubmit = function (event) {
        if (this._pdbId.length == 4) {
            event.preventDefault();
            this.setState({ pdbId: this._pdbId });
        }
    };
    Coordinates.prototype.addClass = function (scrollTo) {
        var active = document.getElementsByClassName('page-nav')[0].childNodes[scrollTo];
        // loop through all 'a' elements
        var a = document.getElementsByClassName('page-nav')[0].childNodes;
        for (var i = 0; i < a.length; i++) {
            // @ts-ignore
            a[i].classList.remove('active');
        }
        // @ts-ignore
        active.classList.add('active');
        // @ts-ignore
        this.parallax.scrollTo(scrollTo);
    };
    Coordinates.prototype.render = function () {
        var _this = this;
        var url = function (name, wrap) {
            if (wrap === void 0) { wrap = false; }
            return (wrap ? 'url(' : '') + "https://awv3node-homepage.surge.sh/build/assets/" + name + ".svg" + (wrap ? ')' : '');
        };
        return React.createElement("div", { className: "CoordinateApp" },
            React.createElement("script", null,
                "(function () ",
                // @ts-ignore
                // @ts-ignore
                angular.element(document).ready(function () {
                    // @ts-ignore
                    angular.bootstrap(document, ['pdb.litemol']);
                }),
                "());"),
            React.createElement("div", { className: "main-title masthead" },
                React.createElement("h1", { className: "white-color" }, "Validation tutorial"),
                React.createElement("div", { className: "navbar" },
                    React.createElement(NavLink, { to: "/" },
                        React.createElement("h3", null, "Validation")),
                    React.createElement(NavLink, { to: "/coordinates", activeClassName: "nav-active" },
                        React.createElement("h3", null, "Coordinates")),
                    React.createElement(NavLink, { to: "/ligands" },
                        React.createElement("h3", null, "Ligands")))),
            React.createElement("div", { className: "page-nav", style: { width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1 } },
                React.createElement("a", { className: "active", onClick: function () { return _this.addClass(0); } }),
                React.createElement("a", { onClick: function () { return _this.addClass(1); } }),
                React.createElement("a", { onClick: function () { return _this.addClass(2); } }),
                React.createElement("a", { onClick: function () { return _this.addClass(3); } })),
            React.createElement("div", null,
                React.createElement(Parallax, { ref: function (ref) { return (_this.parallax = ref); }, pages: 4 },
                    React.createElement(ParallaxLayer, { offset: 1, speed: 1, style: { backgroundColor: '#aeaeae' } }),
                    React.createElement(ParallaxLayer, { offset: 2, speed: 1, style: { backgroundColor: '#7c827e' } }),
                    React.createElement(ParallaxLayer, { offset: 0, speed: 0, factor: 3, style: { backgroundImage: url('stars', true), backgroundSize: 'cover' } }),
                    React.createElement(ParallaxLayer, { offset: 1.3, speed: -0.3, style: { pointerEvents: 'none' } }),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.8, style: { opacity: 0.1 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '55%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '10%', marginLeft: '15%' } })),
                    React.createElement(ParallaxLayer, { offset: 1.75, speed: 0.5, style: { opacity: 0.1 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '70%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '20%', marginLeft: '40%' } })),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.2, style: { opacity: 0.2 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '10%', marginLeft: '10%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '20%', marginLeft: '75%' } })),
                    React.createElement(ParallaxLayer, { offset: 1.6, speed: -0.1, style: { opacity: 0.4 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '60%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '25%', marginLeft: '30%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '10%', marginLeft: '80%' } })),
                    React.createElement(ParallaxLayer, { offset: 2.6, speed: 0.4, style: { opacity: 0.6 } },
                        React.createElement("img", { src: "http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png", style: { display: 'block', width: '20%', marginLeft: '5%' } }),
                        React.createElement("img", { src: "/src/protein-icon-2887050_640.png", style: { display: 'block', width: '15%', marginLeft: '75%' } })),
                    React.createElement(ParallaxLayer, { offset: 2.5, speed: -0.4, style: { display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' } },
                        React.createElement("img", { src: url('earth'), style: { width: '60%' } })),
                    React.createElement(ParallaxLayer, { offset: 2, speed: -0.3 }),
                    React.createElement(ParallaxLayer, { offset: 0, speed: 0.1, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        React.createElement("div", { style: { width: '95%', marginTop: '50px' } },
                            React.createElement("div", { style: { display: 'inline-block', width: '70%' } },
                                React.createElement("h2", null, "Coordinates and temperature factors"),
                                React.createElement("div", { className: "text-field" },
                                    React.createElement("p", { style: { fontSize: '140%' } }, "The majority of model-quality criteria are based on the use of the (X,Y,Z) coordinates of the atoms in the model, their nature (e.g., carboxylate oxygen or aromatic carbon), and their identity (e.g., the main-chain nitrogen atom of residue leucine 64). Often these criteria compare properties of the model against expectations based on chemistry, physics, or analysis of a large collection of (protein) structures (such databases are essentially an embodiment of the underlying chemistry and physics, provided they are unbiased and contain only high-quality structures). Here we shall have a look at some of the criteria that are often used in practice.")),
                                React.createElement("div", { className: "text-field", style: { marginLeft: "auto" } },
                                    React.createElement("p", { style: { fontSize: '140%' } }, "The covalent geometry of a model can be assessed by comparing bond lengths and angles to a library of \"ideal\" values. In the past, every refinement and modelling program had its own set of \"ideal\" values. This even made it possible to detect (with 95% accuracy) with which program a model had been refined, simply by inspecting its covalent geometry. Nowadays, standard sets of ideal bond lengths and bond angles, derived from an analysis of small-molecule crystal structures, are available for proteins and nucleic acids. ")),
                                React.createElement("div", { className: "text-field" },
                                    React.createElement("p", { style: { fontSize: '140%' } }, "For bond lengths, the RMS deviation from ideal values is typically quoted. Deviations from ideality of bond angles can be expressed directly as an angular RMS deviation or in terms of angle distances (i.e., the angle ABC is measured by the 1-3 distance |AC|). Nowadays, RMS-Z-values of bond lengths and bond angles are preferred as they are more informative (but these values are not always provided in papers). Other checks in this class include chirality and planarity tests.")),
                                React.createElement("div", { className: "text-field", style: { marginLeft: "auto" } },
                                    React.createElement("p", { style: { fontSize: '140%' } },
                                        React.createElement("i", null, "Validation potential of geometric tests: poor. Good scores for these criteria prove little. However, if an entire model scores poorly, this should set off warning bells. Also, gross outliers should always be investigated! Modern refinement programs normally produce models with few (if any) outliers.")))),
                            React.createElement("div", { style: { display: 'inline-block', float: 'right', marginTop: '30px' } },
                                React.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/9/97/Protein_backbone_PhiPsiOmega_drawing.svg", style: { height: '550px' } })))),
                    React.createElement(ParallaxLayer, { offset: 1, speed: 0.1, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        React.createElement("div", { style: { width: '95%' } },
                            React.createElement("div", { style: { width: '50%', display: 'inline-block', verticalAlign: 'middle' } },
                                React.createElement("h2", null, "Chirality"),
                                React.createElement("div", { className: "panel-group", id: "accordion", style: { width: "90%" } },
                                    React.createElement("div", { className: "panel panel-default" },
                                        React.createElement("div", { className: "panel-heading", style: { width: '8%', display: 'inline-block', padding: '20px 0 21px 10px', borderRadius: '0', borderRight: '1px solid gray' } },
                                            React.createElement("h4", { className: "panel-title", style: { fontSize: '30px' } }, "?")),
                                        React.createElement("div", { className: "panel-heading", style: { width: '92%', padding: '10px', display: 'inline-block', verticalAlign: 'bottom' } },
                                            React.createElement("h4", { className: "panel-title" },
                                                React.createElement("a", { className: "accordion-toggle", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseOne" }, "Which amino acids contain chiral carbon atoms? Are there any amino acids that contain more than one chiral carbon atom? If so, which one(s)?"))),
                                        React.createElement("div", { id: "collapseOne", className: "panel-collapse collapse in" },
                                            React.createElement("div", { className: "panel-body" },
                                                React.createElement("p", { style: { fontSize: '140%' } }, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam."))))),
                                React.createElement("h2", null, "Ramachandran plot"),
                                React.createElement("div", { className: "text-field" },
                                    React.createElement("p", { style: { fontSize: '140%' } }, "Ramachandran plot is a way to visualize dihedral angles \u03C8 against \u03C6 of amino acid residues in protein structure. Many combinations of angles in a polypeptide chain are forbidden because of steric collisions between atoms. This two-dimensional plot shows the allowed and disfavored values of \u03C8 and \u03C6: three-quarters of the possible combinations are excluded simply by local steric clashes. Steric exclusion is the fact that two atoms cannot be in the same place at the same time is the powerful organizing principle that propels the use of the Ramachandron plot forward.")),
                                React.createElement("div", { className: "panel-group", id: "accordion", style: { width: "90%", marginTop: '20px' } },
                                    React.createElement("div", { className: "panel panel-default" },
                                        React.createElement("div", { className: "panel-heading", style: { width: '8%', display: 'inline-block', padding: '30px 0 30px 10px', borderRadius: '0', borderRight: '1px solid gray' } },
                                            React.createElement("h4", { className: "panel-title", style: { fontSize: '30px' } }, "?")),
                                        React.createElement("div", { className: "panel-heading", style: { width: '92%', padding: '10px', display: 'inline-block', verticalAlign: 'bottom' } },
                                            React.createElement("h4", { className: "panel-title" },
                                                React.createElement("a", { className: "accordion-toggle", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseTwo" }, "The three most-densely populated areas in the Ramachandran plot are called the alpha, the beta, and the left-handed helical region. Where are these three regions located approximately in the Ramachandran plot?"))),
                                        React.createElement("div", { id: "collapseTwo", className: "panel-collapse collapse in" },
                                            React.createElement("div", { className: "panel-body" },
                                                React.createElement("p", { style: { fontSize: '140%' } }, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.")))))),
                            React.createElement("div", { style: { width: '50%', display: 'inline-block', marginTop: '90px' } },
                                React.createElement("div", { className: "panel-group", id: "accordion", style: { width: "90%", marginTop: '20px' } },
                                    React.createElement("div", { className: "panel panel-default" },
                                        React.createElement("div", { className: "panel-heading" },
                                            React.createElement("h4", { className: "panel-title" },
                                                React.createElement("a", { className: "accordion-toggle", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseThree" }, "Why do glycine residues have an atypical distribution? And proline residues?"))),
                                        React.createElement("div", { id: "collapseThree", className: "panel-collapse collapse in" },
                                            React.createElement("div", { className: "panel-body" },
                                                React.createElement("p", { style: { fontSize: '140%' } }, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam."))))),
                                React.createElement("div", { className: "panel-group", id: "accordion", style: { width: "90%", marginTop: '20px' } },
                                    React.createElement("div", { className: "panel panel-default" },
                                        React.createElement("div", { className: "panel-heading" },
                                            React.createElement("h4", { className: "panel-title" },
                                                React.createElement("a", { className: "accordion-toggle", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapseFour" }, "Which regions would you expect to be most favourable in the Ramachandran plot of a protein that consists entirely of D-amino acids?"))),
                                        React.createElement("div", { id: "collapseFour", className: "panel-collapse collapse in" },
                                            React.createElement("div", { className: "panel-body" },
                                                React.createElement("p", { style: { fontSize: '140%' } }, "Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.")))))))),
                    React.createElement(ParallaxLayer, { offset: 3, speed: -0, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        React.createElement("div", { style: { width: '100%' } },
                            React.createElement("div", { style: { width: '50%', display: 'inline-block', marginTop: '95px' } }),
                            React.createElement("div", { style: { width: '50%', height: '360px', position: 'relative', marginTop: '75px', float: 'right' } }))),
                    React.createElement(ParallaxLayer, { offset: 2, speed: -0, 
                        // @ts-ignore
                        style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                        React.createElement("div", { style: { width: '100%' } },
                            React.createElement("div", { style: { width: '50%', display: 'inline-block', marginTop: '95px' } },
                                React.createElement("ramachandran-component", { "pdb-ids": '["2gwx", "2baw"]', "chains-to-show": '["A", "B"]', "models-to-show": '["1"]', width: "550" })),
                            React.createElement("div", { style: { width: '50%', height: '360px', position: 'relative', marginTop: '75px', float: 'right' } },
                                React.createElement("pdb-lite-mol", { "pdb-id": "'2gwx'", "is-expanded": "false" })))))));
    };
    return Coordinates;
}(React.Component));
export default Coordinates;
//# sourceMappingURL=Coordinates.js.map