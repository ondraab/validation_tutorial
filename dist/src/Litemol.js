import * as tslib_1 from "tslib";
import * as React from "react";
// @ts-ignore
angular.module('myModule', ['pdb.litemol']);
var Litemol = /** @class */ (function (_super) {
    tslib_1.__extends(Litemol, _super);
    function Litemol(props) {
        var _this = _super.call(this, props) || this;
        _this.html = "<pdb-lite-mol pdb-id=\"'" + _this.props.pdbId + "'\"/>";
        return _this;
    }
    Litemol.prototype.componentDidMount = function () {
        // @ts-ignore
        angular.bootstrap(this.container, ['myModule']);
    };
    Litemol.prototype.render = function () {
        var _this = this;
        // @ts-ignore
        return React.createElement("div", { ref: function (c) { return _this.container = c; }, dangerouslySetInnerHTML: { __html: this.html } });
    };
    return Litemol;
}(React.Component));
export default Litemol;
//# sourceMappingURL=Litemol.js.map