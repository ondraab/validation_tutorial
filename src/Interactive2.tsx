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

interface LitemolStates {
    pdbId: string;
    dynComponent: any;
    isSubmited: boolean;
    currentSlide: number;
    firstIpsum: JSX.Element;
    correctInput: boolean;
}

class Interactive2 extends React.Component<{}, LitemolStates> {
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
                            <h3>Example II</h3>
                            <div>
                                <p>
                                    2GN5 is refined structure of the gene 5 DNA binding protein from bacteriophage FD.
                                    It was released in January 1986.
                                    You can find the structure <a href={"http://www.ebi.ac.uk/pdbe/entry/pdb/2gn5"}><b>here</b></a>.
                                    The structure was determined using X-ray and it's resolution is 2.3Å.
                                </p>
                                <p>
                                    The structure is not large, it's length is only 87 amino acids.
                                </p>
                                <p>
                                    You can look over the structure in Litemol again.
                                </p>
                                <div>
                            </div>
                        </div>
                            <div>

                            </div>
                        </div>
                        <div style={{display: 'inline-block', width: '58%', position: 'relative', float: 'right', height: '400px'}}>
                            <Litemol pdbId={'2gn5'}/>
                        </div>
                    </div>
                    <div style={{margin: '10px', display: 'flex'}}>
                        <div style={{width: '49.5%', display: 'inline-block'}}>
                            <p>
                                Very useful validation plot which can be found either in validation report and on PDBe entry page is above.
                            </p>
                                <img src={"src/videos/2gn5_validation.png"} width={"95%"} style={{margin: '10px 0 10px 0'}}/>
                            <p>
                                As you can see in the plot above, scores are in red areas. This means, that the quality of the structure is not very well.
                                On the right sight is validation report. You can go through it and try to find, where may be problems.
                            </p>
                            <p>
                                First thing, what you should notice is on the bottom of page 2 of VR. The table summarizes
                                the quality of chain. You can see, that 67% of residues contains 3 or more errors, the rest
                                of the the residues contains 2 errors per residue. This means, that the structure has very poor fit.
                                Similar, but more detailed plot is on the page 4.
                            </p>
                        </div>
                        <div style={{width: '50%', display: 'inline-block'}}>
                            <embed src={"src/videos/2gn5_full_validation.pdf"} width="100%" height="850px" />
                        </div>
                    </div>
                </Carousel>
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
export default Interactive2;