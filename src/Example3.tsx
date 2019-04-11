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
                                1RIP
                            </p>
                            <p></p>
                        </div>
                    </div>
                    <div style={{marginTop: '300px', height: '600px'}} id={'example1'}>
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