import * as tslib_1 from "tslib";
import Litemol from "./Litemol";
import * as React from "react";
var CoopComponents = /** @class */ (function (_super) {
    tslib_1.__extends(CoopComponents, _super);
    function CoopComponents(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { pdbId: ["1cbs"], chains: ['A'], models: ['1'] };
        return _this;
    }
    CoopComponents.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, pdbId = _a.pdbId, chains = _a.chains, models = _a.models;
        if (nextProps.pdbId != pdbId || nextProps.chains != chains || nextProps.models != models)
            this.setState({ pdbId: nextProps.pdbId, models: nextProps.models, chains: nextProps.chains });
    };
    CoopComponents.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { id: "ramachandran-div" },
                "//@ts-ignore",
                React.createElement("ramachandran-component", { "pdb-ids": JSON.stringify(this.state.pdbId), "chains-to-show": JSON.stringify(this.state.chains), "models-to-show": JSON.stringify(this.state.models), width: "600" })),
            React.createElement("div", { id: "litemol-div" },
                "//@ts-ignore",
                React.createElement(Litemol, { pdbId: this.state.pdbId })));
    };
    return CoopComponents;
}(React.Component));
export default CoopComponents;
//# sourceMappingURL=CoopComponents.js.map