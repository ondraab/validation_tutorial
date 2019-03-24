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
        this.state = {pdbId: '', isSubmited: false, dynComponent: <div/>, currentSlide: 0, firstIpsum: <div/>};
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
            this.setState({
                isSubmited: true,
                dynComponent: <Litemol pdbId={this.state.pdbId}/>,
                firstIpsum: <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Nam sed tellus id magna elementum tincidunt. Proin mattis lacinia justo. Nulla quis diam. Duis condimentum augue id magna semper rutrum. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, </p>})
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
                    <NavLink to="/interactive" activeClassName="nav-active">
                        <h3>
                            Interactive
                        </h3>
                    </NavLink>
                </div>
            </div>
                <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>*/}
                    <Carousel style={{position: 'absolute', top: '54px'}}>
                        <div style={{margin: '10px'}}>
                            <div style={{display: 'inline-block', width: '40%'}}>
                                <h2>Interactive validation</h2>
                                    <p>In this section you can find interactive validation tutorial showing you, how you may use available tools.</p>
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
                                                    <input type="submit" value="Submit" className={"btn btn-primary mb-2"}/>
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
                        <div>
                            <p>fsasf</p>
                        </div>
                        <div>
                            <p>fsasf</p>
                        </div>
                        <div>
                            <p>fsasf</p>
                        </div>
                        <div>
                            <p>fsasf</p>
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