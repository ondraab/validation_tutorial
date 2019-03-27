import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import * as $ from "jquery";
// import DynComponent from "./DynComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "nuka-carousel"
import Litemol from "./Litemol";
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

    // private nextSlide() {
    //     this.setState(state => ({
    //         currentSlide: state.currentSlide + 1
    //     }));
    // }
    //
    // private prevSlide() {
    //     this.setState(state => ({
    //         currentSlide: state.currentSlide - 1
    //     }));
    // }
    //
    // private updateCurrentSlide(index: number) {
    //     const { currentSlide } = this.state;
    //
    //     if (currentSlide !== index) {
    //         this.setState({
    //             currentSlide: index
    //         });
    //     }
    // }

    // private addClass(scrollTo: number) {
    //     let active = document.getElementsByClassName('page-nav')[0].childNodes[scrollTo];
    //     // loop through all 'a' elements
    //     let a = document.getElementsByClassName('page-nav')[0].childNodes;
    //     for (let i = 0; i < a.length; i++) {
    //         // @ts-ignore
    //         a[i].classList.remove('active')
    //     }
    //     // @ts-ignore
    //     active.classList.add('active');
    //     // @ts-ignore
    //     this.parallax.scrollTo(scrollTo)
    // }



    private listenScrollEvent() {
        //@ts-ignore
        let currPos = this.parallax.current / this.parallax.space;
        if (currPos < 0.75 && this.activeTab != 0) {
            $('div.page-nav a').each((a: number, obj: any) => {
                $(obj).removeClass('active').removeClass('onHover');});
            $('div.page-nav a:first').addClass('active').addClass('onHover');
            setTimeout(() => {
                $('div.page-nav a:first').removeClass('onHover')
            }, 2000);
            this.activeTab = 0;
        } else if (this.activeTab != 1 && currPos >= 0.75 && currPos < 1.5) {
            $('div.page-nav a').each((a: number, obj: any) => {
                $(obj).removeClass('active').removeClass('onHover');
                if (a == 1) {
                    $(obj).addClass('active').addClass('onHover');
                    setTimeout(() => {
                        $(obj).removeClass('onHover')
                    }, 2000);
                    this.activeTab = 1;
                }
            })
        } else if (this.activeTab != 2 && currPos >= 1.5 && currPos < 2.25) {
            $('div.page-nav a').each((a: number, obj: any) => {
                $(obj).removeClass('active').removeClass('onHover');
                if (a == 2) {
                    $(obj).addClass('active').addClass('onHover');
                    setTimeout(() => {
                        $(obj).removeClass('onHover')
                    }, 2000);
                    this.activeTab = 2;
                }
            })
        } else if (this.activeTab != 3 && currPos >= 2.25) {
            $('div.page-nav a').each((a: number, obj: any) => {
                $(obj).removeClass('active').removeClass('onHover');
                if (a == 3) {
                    $(obj).addClass('active').addClass('onHover');
                    setTimeout(() => {
                        $(obj).removeClass('onHover')
                    }, 2000);
                    this.activeTab = 3;
                }
            })
        }
    }


    public render() {
        // @ts-ignore
        return <div className="App">
            <div className="main-title masthead" style={{height: '54px'}}>
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
                    <div className={"expandable-div"} style={{backgroundColor: '#4E8542'}}>
                        <h3 >
                            Interactive
                        </h3>
                        <div>
                           <NavLink to={"/interactive"}>
                                Example I
                           </NavLink>
                            <br/>
                            <NavLink to={"/interactive2"}>
                                Example II
                            </NavLink>
                            <br/>
                            <NavLink to={"/interactive3"}>
                                Example III
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
                <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>*/}
                    <Carousel style={{position: 'absolute', top: '54px'}} dragging={false}>
                        <div style={{margin: '10px'}}>
                            <div style={{display: 'inline-block', width: '40%'}}>
                                <h2>Interactive validation</h2>
                                    <p>In this section you can find interactive validation tutorial showing you, how you may use available tools. For navigation in this interactive tutorial you can use dots in the green upper line.</p>
                                    <div>
                                        <h3>Example I.</h3>
                                        <div>
                                            <p>
                                                1CBS is a crystal structure of cellular retinoic-acid-binding proteins I and II in complex with all-trans-retionic acid and a synthetic retionid. You can find the structure <a href={"http://www.ebi.ac.uk/pdbe/entry/pdb/1cbs"}><b>here</b></a>.
                                            </p>
                                            <p>
                                                First thing you can do is inspect the molecule in the litemol. Put the PDBid '1cbs' in the following input and the litemol component will load.
                                            </p>
                                            <div>
                                            <form onSubmit={this.handleSubmit.bind(this)} className={"form-inline mb-2"}>
                                                <div className="form-group">
                                                    <label>PDBid</label>
                                                    <input type={"text"} name={"pdb-id"} value={this.state.pdbId} onChange={this.handleChange}/>
                                                    <input type="submit" value="Submit" className={`btn ${this.state.correctInput ? "btn-primary" : "btn-danger"} mb-2`}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                        <div>
                                            {this.state.firstIpsum}
                                        </div>
                                </div>
                            </div>
                            <div style={{display: 'inline-block', width: '58%', position: 'relative', float: 'right', height: '400px'}}>
                                {this.state.dynComponent}
                            </div>
                        </div>
                        <div style={{margin: '10px', display: 'flex'}}>
                            <div style={{width: '49.5%', display: 'inline-block'}}>
                                <p>
                                    Very useful validation plot which can be found either in validation report and on PDBe entry page is above.
                                </p>
                                    <img src={"src/videos/1cbs_validation_r.png"} width={"95%"} style={{margin: '10px 0 10px 0'}}/>
                                <p>
                                    Every molecule in PDB has it's own validation report. Typical questions that you can often answer after a cursory look at such a report include:
                                </p>
                                <ul>
                                    <li>What is your impression of the quality of this entry?</li>
                                    <li>How does it compare to other entries in the PDB and to other crystal structures at similar resolution?</li>
                                    <li>Are there any residues with a poor fit to the density?</li>
                                    <li>Are there any consecutive stretches of residues with many outliers?</li>
                                    <li>Is the geometry of the ligand in order?</li>
                                    <li>Does it appear to fit the density well?</li>
                                </ul>
                                <p style={{marginTop: '10px'}}>
                                    Try to find answers to all these questions in attached valiadation report.
                                </p>
                            </div>
                            <div style={{width: '50%', display: 'inline-block'}}>
                                <embed src={"src/videos/1cbs_full_validation.pdf"} width="100%" height="850px" />
                            </div>
                        </div>
                        <div style={{margin: '10px', display: 'flex'}}>
                            <div style={{width: '50%', display: 'inline-block'}}>
                                <p>
                                    An overall quality look can you give also a Ramachandran plot.
                                    As you can read in Coordinates section, Ramachandran plot is a plot of &phi; and &psi;
                                    angles for each residue in protein.
                                </p>
                                <p>
                                    The Ramachandran plot for 1CBS may be called as pretty.
                                    There is not any outlier, and almost all dihedral angles are evalueated as preferred.
                                    You may think, that the glycine residues (triangles) are outside the countours, so
                                    they are outliers, but glycine has different probabilty countours than other residues.
                                    You can play around wit the Ramachandran plot and it's settings.
                                </p>
                            </div>
                            <div style={{width: '50%', display: 'inline-block'}}>
                                <div style={{position: 'absolute', top: '40px'}}>
                                    {/*
                                    // @ts-ignore */}
                                    <ramachandran-component pdb-ids='["1cbs"]' chains-to-show='["A"]' models-to-show='["1"]' width="550"/>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                {/*<div style={{width: '95%'}}>*/}
                    {/*<h2>Interactive validation</h2>*/}
                    {/*<p>In this section you can find interactive validation tutorial showing you, how you may use available tools.</p>*/}
                    {/*<div>*/}
                        {/*<h3>Example I.</h3>*/}
                        {/*<div>*/}
                            {/*<p>*/}
                                {/*1CBS is a crystal structure of cellular retinoic-acid-binding proteins I and II in complex with all-trans-retionic acid and a synthetic retionid. You can find the structure <a href={"http://www.ebi.ac.uk/pdbe/entry/pdb/1cbs"}><b>here</b></a>.*/}
                            {/*</p>*/}
                            {/*<p>*/}
                                {/*First thing you can do is inspect the molecule in the litemol. Put the PDBid '1cbs' in the following input and the litemol component will load.*/}
                            {/*</p>*/}
                            {/*<div>*/}
                                {/*<label>PDBid</label>*/}
                                {/*<input type={"text"} name={"pdb-id"} value={this.state.pdbId} onChange={this.handleChange}/>*/}
                                {/*<input type="submit" value="Submit" className={"btn btn-primary mb-2"}/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<form onSubmit={this.handleSubmit.bind(this)} className={"form-inline mb-2"}>*/}
                        {/*<div className="form-group" style={{marginTop: '60px'}}>*/}
                            {/*<label>PDBid</label>*/}
                            {/*<input type={"text"} name={"pdb-id"} value={this.state.pdbId} onChange={this.handleChange}/>*/}
                            {/*<input type="submit" value="Submit" className={"btn btn-primary mb-2"}/>*/}
                        {/*</div>*/}
                    {/*</form>*/}
                {/*</div>*/}
                {/*<div id={"interactive-part"}>*/}
                    {/*{this.state.dynComponent}*/}
                {/*</div>*/}
            </div>
        </div>;
    }
}

// const DynComponent = (props: any) => {
//     let pdbIdField = `["${props.pdbId}"]`;
//     let chainsField = `["${props.chains}"]`;
//     let modelsField = `["${props.models}"]`;
//     return (
//         <div>
//             <div style={{width: '42%', display: 'inline-block', marginTop: '20px'}}>
//             {/*
//                // @ts-ignore */}
//                 <ramachandran-component pdb-ids={pdbIdField} chains-to-show={chainsField} models-to-show={modelsField} width="550" id='ramachandran-component'/>
//             </div>
//             <div style={{width: '57%', display: 'inline-block', position: 'relative', float: 'right', height: '800px'}}>
//                 <Litemol pdbId={props.pdbId}/>
//             </div>
//         </div>
//     );
// };
export default Interactive;