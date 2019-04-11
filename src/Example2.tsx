import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Litemol from "./Litemol";
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
}

class Example2 extends React.Component<{}, LitemolStates> {
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
            correctInput: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.activeTab = 0;
    }

    private handleChange(event: any) {
        this.setState({pdbId: event.target.value});
    }

    private handleSubmit(event: any) {
        event.preventDefault();
        if (this.state.pdbId.length == 4) {
            if (this.state.pdbId == '1cbs') {
                this.setState({
                    isSubmited: true,
                    dynComponent: <Litemol pdbId={this.state.pdbId}/>,
                    correctInput: true,
                    firstIpsum: <p>
                        On the right side you can see Litemol viewer with the molecule <b>1CBS</b>. The viewer allows you to
                        select resiudes, change representations, change coloring. If you don't know, what to do, there is a help button.
                        You can play around and try to inspect the molecule little bit. After that, you can move to next page.
                    </p>})
            } else {
                this.setState({
                    correctInput: false,
                    firstIpsum: <p>Bad PDBid. Please put the right one. </p>
                })
            }
        }
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
                        <h2>Example I.</h2>
                        <div>
                            <p>
                                2GN5
                            </p>
                            <p></p>
                        </div>
                    </div>
                    <div style={{marginTop: '300px', height: '600px'}} id={'example1'}>
                        <DynComponent pdbId={"2gn5"} models={[1]} chains={['A']}/>
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
export default Example2;