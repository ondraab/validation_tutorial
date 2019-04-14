import * as React from "react";
import {NavLink} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Litemol from "./Litemol";
import DynComponent from "./DynComponent";
import "./Example1.css"
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

class Example1 extends React.Component<{}, LitemolStates> {
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
                                1CBS is a crystal structure of cellular retinoic-acid-binding proteins I and II in complex with all-trans-retionic acid and a synthetic retionid. You can find the structure <a href={"http://www.ebi.ac.uk/pdbe/entry/pdb/1cbs"}><b>here</b></a>.
                            </p>
                            <p>
                                First thing, you may notice in the interactive validation, is overall chain quality. The protein has only one chain and one model. Most of the residues are colored by green color.
                                That means, that the data does not contain any faults. 10 residues contains clashes and 3 residues ontain sidechain outliers. There are no Ramachandran or RSRZ outliers.
                            </p>
                            <p>
                                On the second slide there are visualization tools, The ramachandran component on the left side and the litemol viewer on the right. On the ramachandran plot,
                                you can see, that there are just three residues ouutside the contours. Why they aren't highlighted as outliers? The residues are glycines (triangle symbol) and
                                the probability map for dihedral angles is different. You can check that by pointing cursor on the residues for few seconds. Or you can change the contours with settings
                                below the plot.
                            </p>
                            <p>
                                The litemol viewer colors residues by their quality. The coloring is the same as on the first slide. By clicking on each residue, you can inspect it's density.
                            </p>
                            <p>
                                The tables on the third slide are about binding sites and ligands. In the left table, you can
                                 check the quality of binding sites. In the protein 1CBS, there is only one binding site,
                                <b>AC1</b>. It's binding site for <b>REA</b> ligand. The coloring in the left table represents,
                                how many faults are in individual binding site residues.
                            </p>
                            <p>
                                In the right table is summary of ligands in protein and their annotation validations, retrieved
                                from ValidatorDB. The <b>REA</b> ligand does not have any problems. The corresponding
                                 drugbank ID is <a href={'https://www.drugbank.ca/drugs/DB00755'}><b>DB00755</b></a>. On the
                                drugbank site you can check more information about the ligand.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '500px', height: '214px'}} id={'example1'}>
                        <DynComponent pdbId={"1cbs"} models={[1]} chains={['A']}/>
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

export default Example1;