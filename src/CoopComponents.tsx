import Litemol from "./Litemol";
import * as React from "react";

interface CoopComponentsProps {
    pdbId: string[];
    chains: string[];
    models: string[];
}

interface CoopComponentsStates {
    pdbId: string[];
    chains: string[];
    models: string[];
}

class CoopComponents extends React.Component<CoopComponentsProps, CoopComponentsStates>{

    constructor(props: CoopComponentsProps) {
        super(props);
        this.state = {pdbId: ["1cbs"], chains: ['A'], models: ['1']};
    }

    componentWillReceiveProps(nextProps: Readonly<CoopComponentsProps>): void {
        const {pdbId, chains, models} = this.props;
        if (nextProps.pdbId != pdbId || nextProps.chains != chains || nextProps.models != models)
            this.setState({pdbId: nextProps.pdbId, models: nextProps.models, chains: nextProps.chains});
    }

    public render() {
        return <div>
            <div id={"ramachandran-div"}>
                //@ts-ignore
                <ramachandran-component pdb-ids={JSON.stringify(this.state.pdbId)}
                                        chains-to-show={JSON.stringify(this.state.chains)}
                                        models-to-show={JSON.stringify(this.state.models)} width="600"/>
            </div>
            <div id={"litemol-div"}>
            //@ts-ignore
            <Litemol pdbId={this.state.pdbId}/>
            </div>
        </div>
    }
}

export default CoopComponents

