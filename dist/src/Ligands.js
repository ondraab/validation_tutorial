import * as tslib_1 from "tslib";
import * as React from 'react';
import './App.css';
import './theme-ebi-research.css';
import { NavLink } from "react-router-dom";
var Ligands = /** @class */ (function (_super) {
    tslib_1.__extends(Ligands, _super);
    function Ligands(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { pdbId: '1cbs', models: ['1'], chains: ['A'] };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this._pdbId = '1cbs';
        return _this;
    }
    Object.defineProperty(Ligands.prototype, "pdbId", {
        get: function () {
            return this._pdbId;
        },
        set: function (value) {
            this._pdbId = value;
        },
        enumerable: true,
        configurable: true
    });
    Ligands.prototype.handleChange = function (event) {
        if (event.target.value.length == 4) {
            this._pdbId = event.target.value;
        }
    };
    Ligands.prototype.handleSubmit = function (event) {
        if (this._pdbId.length == 4) {
            event.preventDefault();
            this.setState({ pdbId: this._pdbId });
        }
    };
    Ligands.prototype.render = function () {
        return React.createElement("div", { className: "LigandApp" },
            React.createElement("div", { className: "main-title masthead" },
                React.createElement("h1", { className: "white-color" }, "Validation tutorial"),
                React.createElement("div", { className: "navbar" },
                    React.createElement(NavLink, { to: "/" },
                        React.createElement("h3", null, "Validation")),
                    React.createElement(NavLink, { to: "/coordinates" },
                        React.createElement("h3", null, "Coordinates")),
                    React.createElement(NavLink, { to: "/ligands", activeClassName: "nav-active" },
                        React.createElement("h3", null, "Ligands")))));
    };
    return Ligands;
}(React.Component));
export default Ligands;
//# sourceMappingURL=Ligands.js.map