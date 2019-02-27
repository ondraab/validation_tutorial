import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";


// import Expandable from 'react-expandable';
// import CoopComponents from "./CoopComponents";

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
}

class Ligands extends React.Component< {}, ValidationStates> {
    get pdbId(): string {
        return this._pdbId;
    }

    set pdbId(value: string) {
        this._pdbId = value;
    }

    private _pdbId: string;

    constructor(props : {}) {
        super(props);
        this.state = {pdbId: '1cbs', models: ['1'], chains: ['A']};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._pdbId = '1cbs'
    }

    private handleChange(event: any) {
        if (event.target.value.length == 4) {
            this._pdbId = event.target.value;
        }
    }

    private handleSubmit(event: any) {
        if (this._pdbId.length == 4) {
            event.preventDefault();
            this.setState({pdbId: this._pdbId});
        }
    }

    public render() {
        return <div className="LigandApp">
            <div className="main-title masthead">
                <h1 className="white-color">Validation tutorial</h1>
                <div className="navbar">
                    <NavLink to="/">
                        <h3>
                            Validation
                        </h3>
                    </NavLink>
                    <NavLink to="/coordinates">
                        <h3>
                            Coordinates
                        </h3>
                    </NavLink>
                    <NavLink to="/ligands" activeClassName="nav-active">
                        <h3>
                            Ligands
                        </h3>
                    </NavLink>
                </div>
            </div>

        </div>;
    }
}

export default Ligands;
