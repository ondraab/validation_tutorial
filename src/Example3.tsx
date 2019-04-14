import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynComponent from "./DynComponent";
// @ts-ignore
angular.module('myModule', ['pdb.litemol']);

interface LitemolStates {
    pdbId: string;
    dynComponent: any;
    isSubmited: boolean;
    currentSlide: number;
    firstIpsum: JSX.Element;
    correctInput: boolean;
    checkedItems: Map<string, boolean>;
    ramaComponent: JSX.Element;
    checkedNumbers: String[];
}

class Example3 extends React.Component<{}, LitemolStates> {

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

    constructor(props : {}) {
        super(props);
        this.state = {
            pdbId: '',
            isSubmited: false,
            dynComponent: <div/>,
            currentSlide: 0,
            firstIpsum: <div/>,
            correctInput: true,
            checkedItems: new Map([
                ['1', true],
                ['2', false],
                ['3', false],
                ['4', false],
                ['5', false],
                ['6', false]
            ]),
            checkedNumbers: ["'1'"],
            //@ts-ignore
            ramaComponent: <ramachandran-component pdb-ids='["1rip"]' chains-to-show='["A"]' models-to-show='["1"]' width="550"/>
        };
        this.hangleCheckboxChange = this.hangleCheckboxChange.bind(this);
        this.activeTab = 0;
    }

    private hangleCheckboxChange(event: any) {
        const item = event.target.name;
        const isChecked = event.target.checked;
        //@ts-ignore
        this.setState((prevState: Map<string, boolean>) => ({
            //@ts-ignore
            checkedItems: prevState.checkedItems.set(item, isChecked),
            //@ts-ignore
            ramaComponent: <ramachandran-component pdb-ids='["1rip"]' chains-to-show='["A"]' models-to-show={`[${([].concat.apply([], [...prevState.checkedItems].filter(([k, v]) => {return v==true}))).filter((k: any)=> {
                return typeof k != "boolean"
            })}]`} width="540"/>
        }));
    }

    public render() {
        // @ts-ignore
        return <div className="App">
            <div className="main-title masthead" style={{height: '54px'}}>
                <h1 className="white-color">Validation tutorial</h1>
                <div className="navbar">
                    <div className={"expandable-div"}>
                        <NavLink to="/example1" style={{backgroundColor: '#4E8542'}}>
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
                    <NavLink to="/interactive">
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
            <div id={"main-content"}>
                <div>
                    <div style={{display: 'inline-block', margin: '60px 0 0 10px'}}>
                        <h2>Example III.</h2>
                        <div>
                            <p>
                                The last example is 1RIP. It's ribosomal protein and in opposite to two preceding examples,
                                this structure was determined using NMR. Because of that, it has more models of one chain.
                            </p>
                            <p>
                                The values on validation plot are all in red area. When you take a look at the quality
                                of individual models, you can see differences. For example the third model has the greatest
                                number of residues, which contains some error. You can see, that there is only one residue
                                colored green. This means, that only one residue does not contains any faults.
                                The overall quality of each model is low, according to the fact, that most of the residues
                                contains some error.
                            </p>
                            <p>
                                On the second slide, you can see the Ramachandran plot and 3D structure. In the Ramachandran plot,
                                you can use checkboxes below the plot, to select, which models will be displayed in plot. In
                                default settings, the first model is displayed. You may notice, that most of the residues are colored
                                red, this means, that they are outliers, their dihedral angles are not in preferred or allowed regions.
                                You can also check the differences between individual models.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '300px', height: '600px'}} id={'example3'}>
                        <DynComponent pdbId={"1rip"} models={[1,2,3,4,5,6]} chains={['A']}/>
                    </div>
                </div>
            </div>
        </div>;
    }

    componentDidMount(): void {
        clickForValidationColoring();

        function clickForValidationColoring() {
            setTimeout(
                function () {
                    var node = document.getElementsByClassName('lm-btn lm-btn-block lm-btn-commit lm-btn-commit-on')[1];
                    if (node) {
                        //@ts-ignore
                        node.click();
                        //@ts-ignore
                        document.getElementsByClassName('lm-icon lm-icon-tools')[0].parentNode.click();
                    } else
                        clickForValidationColoring();
                }, 3000);
        }
    }
}
export default Example3;