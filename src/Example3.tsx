import * as React from "react";
import {Parallax} from 'react-spring/renderprops-addons';
import {NavLink} from "react-router-dom";
import * as $ from "jquery";
// import DynComponent from "./DynComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "nuka-carousel"
import Litemol from "./Litemol";
// import * as Form from "react-bootstrap/lib/Form";
import {Label} from "react-bootstrap";
import PropTypes from 'prop-types';
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
        const checkboxes = [
            {
                name: '1',
                key: '1',
                label: '1',
            },
            {
                name: '2',
                key: '2',
                label: '2',
            },
            {
                name: '3',
                key: '3',
                label: '3',
            },
            {
                name: '4',
                key: '4',
                label: '4',
            },
            {
                name: '5',
                key: '5',
                label: '5',
            },
            {
                name: '6',
                key: '6',
                label: '6',
            },
        ];

        // @ts-ignore
        const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
            <input type={type} name={name} checked={checked} onChange={onChange} style={{verticalAlign: 'middle', marginLeft: '4px'}}/>
        );

        Checkbox.propTypes = {
            type: PropTypes.string,
            name: PropTypes.string.isRequired,
            checked: PropTypes.bool,
            onChange: PropTypes.func.isRequired,
        };

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
            <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>*/}
                <Carousel style={{position: 'absolute', top: '54px'}} dragging={false}>
                    <div style={{margin: '10px'}}>
                        <div style={{display: 'inline-block', width: '40%'}}>
                            <h3>Example III</h3>
                            <div>
                                <p>
                                    1RIP is NMR structure of ribosomal protein S17. It was deposited in 1993.
                                    The length of the protein is 81 amino acids.
                                    You can find the structure <a href={"http://www.ebi.ac.uk/pdbe/entry/pdb/1rip"}><b>here</b></a>.
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
                            <Litemol pdbId={'1rip'}/>
                        </div>
                    </div>
                    <div style={{margin: '10px', display: 'flex'}}>
                        <div style={{width: '49.5%', display: 'inline-block'}}>
                            <p>
                                Very useful validation plot which can be found either in validation report and on PDBe entry page is above.
                            </p>
                            <img src={"src/videos/1rip_validation.png"} width={"95%"} style={{margin: '10px 0 10px 0'}}/>
                            <p>
                                As you can see in the plot above, scores are in red areas. This means, that the quality of the structure is not very well.
                                On the right sight is validation report. You can go through it and try to find, where may be problems.
                            </p>
                            <p>
                                First thing, what you should notice is on the bottom of page 2. The table summarizes
                                the quality of chain. You can see, that 20% of residues contains 3 or more errors. More than
                                a half of protein contains 2 errors and 26%  of residues contains 1 error.
                            </p>
                            <p>
                                Because the structure was determined using NMR, there are several models, with different
                                residue quality, as you can see on the page 5 and further in VR.
                            </p>
                        </div>
                        <div style={{width: '50%', display: 'inline-block'}}>
                            <embed src={"src/videos/1rip_full_validation.pdf"} width="100%" height="850px" />
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
                                The structures solved using NMR has more models. So you can switch between individual
                                models using checkboxes above the Ramachandran plot. You can also set view to more models.
                            </p>
                            <p>
                                As you can see, 67% of residues in model 1 are marked as OUTLIERS.
                            </p>
                        </div>
                        <div style={{width: '50%', display: 'inline-block'}}>
                            <div style={{position: 'absolute', top: '50px'}}>
                                {/*
                                // @ts-ignore */}
                                {this.state.ramaComponent}
                                {/*<ramachandran-component pdb-ids='["1rip"]' chains-to-show='["A"]' models-to-show={`[${this.state.checkedNumbers}]`} width="550"/>*/}
                            </div>
                            <div>
                                <div style={{textAlign: 'center', width: '540px'}}>
                                    <Label>Models:</Label>
                                    {
                                        checkboxes.map(item => (
                                            <label key={item.key} style={{width: '14%'}}>
                                                {item.name}
                                                {/*
                                                    // @ts-ignore */}
                                                <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.hangleCheckboxChange} />
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>;
    }
}
export default Example3;