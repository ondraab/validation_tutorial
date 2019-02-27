import * as React from "react";
// @ts-ignore
angular.module('myModule', ['pdb.litemol']);

interface LitemolProps {
    pdbId: string;
}

interface LitemolStates {
    pdbId: string;
}

class Litemol extends React.Component<LitemolProps, LitemolStates> {

    constructor(props: LitemolProps) {
        super(props);
    }

    componentDidMount(): void {
        // @ts-ignore
        angular.bootstrap(this.container, ['myModule']);
    }

    public html = `<pdb-lite-mol pdb-id="'${this.props.pdbId}'"/>`;

    public render() {
        // @ts-ignore
        return <div ref={c => this.container = c} dangerouslySetInnerHTML={{__html: this.html}}/>
    }
}
export default Litemol;