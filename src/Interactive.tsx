import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// @ts-ignore
import DynComponent from "./DynComponent";
import './DynComponent.css'
import * as ReactDOM from "react-dom";
// import Litemol from "./Litemol";
// @ts-ignore
angular.module('myModule', ['pdb.litemol']);

// interface LitemolProps {
//     pdbId: string;
// }

interface LitemolStates {
    pdbId: string;
    dynComponent: any;
    isSubmited: boolean;
    currentSlide: number;
    firstIpsum: JSX.Element;
    correctInput: boolean;
    renderChild: boolean;
}

class Interactive extends React.Component<{}, LitemolStates> {
// @ts-ignore
    private parallax: Parallax | null;
    private _activeTab: number;

    get pdbId(): string {
        return this._pdbId;
    }

    set pdbId(value: string) {
        this._pdbId = value;
    }

    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }

    private _pdbId: string;

    // private parallax: any;

    constructor(props: {}) {
        super(props);
        this.state = {
            pdbId: '',
            isSubmited: false,
            dynComponent: <div/>,
            currentSlide: 0,
            firstIpsum: <div/>,
            correctInput: true,
            renderChild: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.activeTab = 0;
    }

    private handleChange(event: any) {
        this.setState({pdbId: event.target.value});
    }

    private handleChildUnmount() {
        this.setState({renderChild: false});
    }

    private handleSubmit(event: any) {
        let self = this;
        event.preventDefault();

        function clickForValidationColoring() {
            setTimeout(
                function () {
                        var node = document.getElementsByClassName('lm-btn lm-btn-block lm-btn-commit lm-btn-commit-on')[1];
                        if (node) {
                            //@ts-ignore
                            node.click();
                        } else
                            clickForValidationColoring();
                }, 5000);
        }

        if (this.state.pdbId.length == 4) {
            //@ts-ignore
            if (ReactDOM.findDOMNode(document.getElementById('interactive-part'))) {
                //@ts-ignore
                ReactDOM.unmountComponentAtNode(document.getElementById('interactive-part'));
            }
            //@ts-ignore
            let chains: string;
            fetch(`https://www.ebi.ac.uk/pdbe/api/validation/rama_sidechain_listing/entry/${self.state.pdbId}`)
                .then((resp: any) => {
                    return resp.json();
                })
                .then((data: any) => {
                    let sortedModels: number[] = [];
                    data[self.state.pdbId]['molecules'].forEach((molecule: any) => {
                        molecule['chains'].forEach((e: any) => {
                            e['models'].forEach((model: any) => {
                                if (sortedModels.indexOf(model['model_id']) == -1)
                                    sortedModels.push(model['model_id'])
                            });
                        })
                    });
                    return sortedModels;
                }).then((models: any) => {
                fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/${this.state.pdbId}`)
                    .then((resp: any) => {
                        return resp.json()
                    })
                    .then((data: any) => {
                        let c: any[] = [];
                        data[self.state.pdbId].forEach((e: any) => {
                            e['in_chains'].forEach((x: any) => {
                                c.push(x)
                            })
                        });
                        let sorted = Array.from(new Set(c)).sort();
                        chains = '["' + sorted.join('","') + '"]';
                        ReactDOM.render(<div><DynComponent pdbId={self.state.pdbId} chains={sorted} models={models}/>
                        </div>, document.getElementById('interactive-part'));
                        self.setState({
                            isSubmited: true,
                            correctInput: true,
                            firstIpsum: <p>
                                On the right side you can see Litemol viewer with the molecule <b>1CBS</b>. The viewer
                                allows you to
                                select resiudes, change representations, change coloring. If you don't know, what to do,
                                there is a help button.
                                You can play around and try to inspect the molecule little bit. After that, you can move
                                to next page.
                            </p>
                        });
                        clickForValidationColoring();
                    })
            })
        }
    }

    private listenScrollEvent() {
        //@ts-ignore
    }


    public render() {
        // @ts-ignore
        return <div className="App">
            <div className="main-title masthead" style={{height: '54px'}}>
                <h1 className="white-color">Validation tutorial</h1>
                <div className="navbar">
                    <div className={"expandable-div"}>
                        <NavLink to="/example1">
                            <h3>
                                Examples
                            </h3>
                        </NavLink>
                        <div>
                            <NavLink to={"/example1"}>
                                Example I
                            </NavLink>
                            <br/>
                            <NavLink to={"/example2"}>
                                Example II
                            </NavLink>
                            <br/>
                            <NavLink to={"/example3"}>
                                Example III
                            </NavLink>
                        </div>
                    </div>
                    <NavLink to="/interactive" activeClassName="nav-active">
                        <h3>
                            Interactive
                        </h3>
                    </NavLink>
                    <NavLink to="/coordinates">
                        <h3>
                            Theory
                        </h3>
                    </NavLink>
                    <NavLink to="/">
                        <h3>
                            Introduction
                        </h3>
                    </NavLink>
                </div>
            </div>
                <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>*/}
                <div style={{width: '98%', padding: '10px', marginTop: '3%', marginLeft: '1%'}}>
                    <div style={{display: 'inline-block', width: '50%'}}>
                        <form onSubmit={this.handleSubmit.bind(this)} className={"form-inline mb-2"} style={{}}>
                            <div className="form-group form-inline">
                                <label>PDBid</label>
                                <input type={"text"} name={"pdb-id"} value={this.state.pdbId} onChange={this.handleChange} style={{display: 'inline-block'}}/>
                                <input type="submit" value="Submit" className={"btn btn-primary mb-2"} style={{display: 'inline-block'}}/>
                            </div>
                        </form>
                    </div>

                </div>
                <div id={"interactive-part"}>

                </div>
            </div>
        </div>;
    }
}


export default Interactive;