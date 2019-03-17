import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import * as $ from "jquery";
import DynComponent from "./DynComponent";
// @ts-ignore
angular.module('myModule', ['pdb.litemol']);

// interface LitemolProps {
//     pdbId: string;
// }

interface LitemolStates {
    pdbId: string;
    dynComponent: any;
    isSubmited: boolean;
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
        this.state = {pdbId: '', isSubmited: false, dynComponent: <div/>};
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
            console.log(this.state.pdbId)
            this.setState({isSubmited: true, dynComponent: <DynComponent pdbId={this.state.pdbId} chains={"A"} models={"1"}/>})
        }
    }

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
            <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)} className={"form-inline mb-2"}>
                        <div className="form-group" style={{marginTop: '60px'}}>
                            <label>PDBid</label>
                            <input type={"text"} name={"pdb-id"} value={this.state.pdbId} onChange={this.handleChange}/>
                            <input type="submit" value="Submit" className={"btn btn-primary mb-2"}/>
                        </div>
                    </form>
                </div>
                <div id={"interactive-part"}>
                    {this.state.dynComponent}
                </div>
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