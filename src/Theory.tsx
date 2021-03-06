import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import ImageZoom from 'react-medium-image-zoom'
import * as $ from "jquery";
import ReactTooltip from 'react-tooltip';
import {Collapse} from "react-collapse";
import * as Modal from "react-modal";

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
    showAnswer1: boolean;
    showAnswer2: boolean;
    showAnswer4: boolean;
    showAnswer3: boolean;
    showAnswer5: boolean;
    showAnswer6: boolean;
    questionStyle: string;
}

class Theory extends React.Component< {}, ValidationStates> {
    // @ts-ignore
    private parallax: Parallax | null;
    private _activeTab: number;
    private _displayed: boolean;
    private _displayed2: boolean;
    private _displayed3: boolean;
    get displayed(): boolean {
        return this._displayed;
    }

    set displayed(value: boolean) {
        this._displayed = value;
    }
    get displayed3(): boolean {
        return this._displayed3;
    }

    set displayed3(value: boolean) {
        this._displayed3 = value;
    }
    get displayed2(): boolean {
        return this._displayed2;
    }

    set displayed2(value: boolean) {
        this._displayed2 = value;
    }
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

    constructor(props : {}) {
        super(props);
        this.state = {
            pdbId: '1cbs',
            models: ['1'],
            chains: ['A'],
            showAnswer1: false,
            showAnswer2: false,
            showAnswer4: false,
            showAnswer3: false,
            showAnswer5: false,
            showAnswer6: false,
            questionStyle: '100%'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowAnswer1 = this.handleShowAnswer1.bind(this);
        this.handleShowAnswer2 = this.handleShowAnswer2.bind(this);
        this.handleShowAnswer3 = this.handleShowAnswer3.bind(this);
        this.handleHideAnswer3 = this.handleHideAnswer3.bind(this);
        this.handleShowAnswer4 = this.handleShowAnswer4.bind(this);
        this.handleHideAnswer4 = this.handleHideAnswer4.bind(this);
        this.handleHideAnswer5 = this.handleHideAnswer5.bind(this);
        this.handleShowAnswer5 = this.handleShowAnswer5.bind(this);
        this.handleHideAnswer6 = this.handleHideAnswer6.bind(this);
        this.handleShowAnswer6 = this.handleShowAnswer6.bind(this);
        // this.closeModals = this.closeModals.bind(this);
        this._pdbId = '1cbs';
        this._activeTab = 0;
    }

    private handleChange(event: any) {
        if (event.target.value.length == 4) {
            this._pdbId = event.target.value;
        }
    }

    private handleSubmit(event: any) {
        if (this._pdbId.length == 4) {
            event.preventDefault();
            this.setState({pdbId: this._pdbId});
        }
    }

    private addClass(scrollTo: number) {
        let active = document.getElementsByClassName('page-nav')[0].childNodes[scrollTo];
        // loop through all 'a' elements
        let a = document.getElementsByClassName('page-nav')[0].childNodes;
        for (let i = 0; i < a.length; i++) {
            // @ts-ignore
            a[i].classList.remove('active')
        }
        // @ts-ignore
        active.classList.add('active');
        // @ts-ignore
        this.parallax.scrollTo(scrollTo)
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
        } else if (this.activeTab != 3 && currPos >= 2.25 && currPos < 3) {
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
        } else if (this.activeTab != 4 && currPos >= 3) {
            $('div.page-nav a').each((a: number, obj: any) => {
                $(obj).removeClass('active').removeClass('onHover');
                if (a == 4) {
                    $(obj).addClass('active').addClass('onHover');
                    setTimeout(() => {
                        $(obj).removeClass('onHover')
                    }, 2000);
                    this.activeTab = 4;
                }
            })
        }
        // if (currPos >= 1 && currPos <=2.4) {
        //     if (!this.displayed) {
        //         $('#rama-view-container').append("<ramachandran-component pdb-ids='[\"1cbs\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-1'/>");
        //         this.rama1 = $('#ramachandran-component-1');
        //         this.displayed = true;
        //     }
        // } else {
        //     this.displayed = false;
        //     $('#ramachandran-component-1').remove();
        // }
        //
        // if (currPos > 2.5 && currPos < 3.19) {
        //     if (!this.displayed2) {
        //         if (typeof this.rama3 !== 'undefined') {
        //             $('#ramachandran-2').append(this.rama2);
        //         } else {
        //             $('#ramachandran-2').append("<ramachandran-component pdb-ids='[\"2hyv\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-2'/>");
        //             this.rama2 = $('#ramachandran-component-2');
        //         }
        //         this.displayed2 = true;
        //     }
        // } else {
        //     this.displayed2 = false;
        //     $('#ramachandran-component-2').remove();
        // }
        //
        // if (currPos > 3.5) {
        //     if (!this._displayed3) {
        //         if (typeof this.rama3 !== 'undefined') {
        //             $('#ramachandran-3').append(this.rama3);
        //             console.log('pridano 3 z cache');
        //         } else {
        //             $('#ramachandran-3').append("<ramachandran-component pdb-ids='[\"1tqn\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-3'/>");
        //             this.rama3 = $('#ramachandran-component-3');
        //         }
        //         this.displayed3 = true;
        //     }
        // } else {
        //     this._displayed3 = false;
        //     // $('#ramachandran-component-3').css('display', 'none');
        //     $('#ramachandran-component-3').remove();
        // }
    }

    private handleShowAnswer1() {
        this.setState({
            showAnswer1: !this.state.showAnswer1
        })
    }

    private handleShowAnswer2() {
        this.setState({
            showAnswer2: !this.state.showAnswer2
        })
    }

    private handleShowAnswer4() {
        this.setState({
            showAnswer4: true
        })
    }

    private handleHideAnswer4() {
        this.setState({
            showAnswer4: false
        })
    }

    private handleShowAnswer3() {
        this.setState({
            showAnswer3: true
        })
    }

    private handleHideAnswer3() {
        this.setState({
            showAnswer3: false
        })
    }

    private handleShowAnswer5() {
        this.setState({
            showAnswer5: true
        })
    }

    private handleHideAnswer5() {
        this.setState({
            showAnswer5: false
        })
    }

    private handleShowAnswer6() {
        this.setState({
            showAnswer6: true
        })
    }

    private handleHideAnswer6() {
        this.setState({
            showAnswer6: false
        })
    }

    public render() {
        // @ts-ignore
        return <div className="CoordinateApp">
            <ReactTooltip />
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
                    <NavLink to="/interactive">
                        <h3>
                            Interactive
                        </h3>
                    </NavLink>
                    <NavLink to="/coordinates" activeClassName="nav-active">
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
            <div className="page-nav long-5" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active grow"} style={{position: 'absolute', top: 0, right: 0}}
                   onClick={() => this.addClass(0)}>
                    <h2 style={{color: 'white'}}>Theory intro</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '19vh', right: 0}}
                   onClick={() => this.addClass(1)}>
                    <h2 style={{color: 'white'}}>Basic facts</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '38vh', right: 0}}
                   onClick={() => this.addClass(2)}>
                    <h2 style={{color: 'white'}}>Dihedral angles</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '57vh', right: 0}}
                   onClick={() => this.addClass(3)}>
                    <h2 style={{color: 'white'}}>Outliers</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '76vh', right: 0}}
                   onClick={() => this.addClass(4)}>
                    <h2 style={{color: 'white'}}>Ramachandran principle</h2>
                </a>

            </div>
            <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>
                <Parallax ref={ref => (this.parallax = ref)} pages={5}>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={0} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%', marginTop:'50px'}}>
                            <div style={{width: '100%', display: 'inline-block'}}>
                                <h2>Theory intro</h2>
                                <div style={{display: 'flex'}}>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                        <h3>Refresher</h3>
                                        <ul >
                                            <li>If you have forgotten what amino acids are, look  <b><a href={"http://en.wikipedia.org/wiki/Amino_acid"}>here</a></b> or <b><a href={"http://www.biology.arizona.edu/biochemistry/problem_sets/aa/aa.html"}>here</a></b></li>
                                            <li>If you have forgotten what molecular geometry is, look <b><a href={"http://en.wikipedia.org/wiki/Molecular_geometry"}>here</a></b></li>
                                            <li>If you have forgotten what dihedral or torsion angles are, look <b><a href={"http://en.wikipedia.org/wiki/Dihedral_angle"}>here</a></b></li>
                                            <li>If you have forgotten what eclipsed and staggered conformations are, look <b><a href={"http://en.wikipedia.org/wiki/Rotamer"}>here</a></b></li>
                                            <li>If you have forgotten what chiral carbon atoms are, look <b><a href={"https://en.wikipedia.org/wiki/Asymmetric_carbon"}>here</a></b></li>
                                            <li>If you have forgotten what &phi; and &psi; are, look <b><a href={"http://employees.csbsju.edu/hjakubowski/classes/ch331/protstructure/phipsi.gif"}>here</a></b>, <b><a href={"http://www.msg.ucsf.edu/local/programs/garlic/commands/phipsi.gif"}>here</a></b> or <b><a href={"https://proteopedia.org/wiki/index.php/Phi_and_Psi_Angles"}>here</a></b></li>
                                            <li>If you have forgotten what &chi;-1, &chi;-2 etc. are, look <b><a href={"http://dunbrack.fccc.edu/bbdep2010/Images/Chi1Chi2Chi3Chi4.PNG"}>here</a></b> or <b><a href={"http://www.msg.ucsf.edu/local/programs/garlic/commands/chi_angles.gif"}>here</a></b></li>
                                        </ul>
                                    </div>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%'}}>
                                        <p>
                                            The majority of model-quality criteria are based on the use of the (X,Y,Z)
                                            coordinates of the atoms in the model, their nature (e.g., carboxylate oxygen
                                            or aromatic carbon), and their identity (e.g., the main-chain nitrogen atom of
                                            residue leucine 64). Often these criteria compare properties of the model against
                                            expectations based on chemistry, physics, or analysis of a large collection of
                                            (protein) structures (such databases are essentially an embodiment of the underlying
                                            chemistry and physics, provided they are unbiased and contain only high-quality structures).
                                            Here we shall have a look at some of the criteria that are often used in practice.
                                        </p>
                                    </div>
                                </div>
                                <h3 style={{marginTop: '10px'}}>Coordinates factors</h3>
                                <div className={"text-field-sq"}>
                                    <p>
                                        The covalent geometry of a model can be assessed by comparing bond lengths and
                                        angles to a library of "ideal" values. In the past, every refinement and modelling
                                        program had its own set of "ideal" values. This even made it possible to detect
                                        (with 95% accuracy) with which program a model had been refined, simply by inspecting
                                        its covalent geometry. Nowadays, standard sets of ideal bond lengths and bond angles,
                                        derived from an analysis of small-molecule crystal structures, are available
                                        for proteins and nucleic acids.
                                    </p>
                                    <p>
                                        For bond lengths, the RMS deviation from ideal values is typically quoted.
                                        Deviations from ideality of bond angles can be expressed directly as an angular
                                        RMS deviation or in terms of angle distances (i.e., the angle ABC is measured by
                                        the 1-3 distance |AC|).  Nowadays, RMS-Z-values of bond lengths and bond angles are
                                        preferred as they are more informative (but these values are not always provided in papers).
                                        Other checks in this class include chirality and planarity tests.
                                    </p>
                                    <p style={{borderTop: 'black solid 1px'}}><i>
                                        Validation potential of geometric tests: poor. Good scores for these criteria
                                        prove little. However, if an entire model scores poorly, this should set off
                                        warning bells. Also, gross outliers should always be investigated!
                                        Modern refinement programs normally produce models with few (if any) outliers
                                    </i></p>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>

                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Basic facts</h2>
                            <div style={{display: 'flex'}}>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex', marginRight: 'auto'}}>
                                    <div className="text-field-sq">
                                        <div className={"expandable-question"} style={{height: this.state.showAnswer1 ? '50%' : '100%'}}>
                                            <div className="panel-heading question-mark">
                                                <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                            </div>
                                            <div className="panel-heading question-heading">
                                                <h4 className="panel-title">
                                                    <div className={"question-s"}>
                                                        <a className="accordion-toggle" data-toggle="collapse"
                                                           data-parent="#accordion">
                                                            Which amino acids contain chiral carbon atoms? Are there any
                                                            amino acids that contain more than one chiral carbon atom? If so, which one(s)?
                                                        </a>
                                                        <a onClick={this.handleShowAnswer1}>
                                                            <FontAwesomeIcon icon={this.state.showAnswer1 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}} className="hint--bottom" aria-label={"Show answer"}/>
                                                        </a>
                                                    </div>
                                                </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <Collapse isOpened={this.state.showAnswer1} style={{display: 'block'}}>
                                                <div>
                                                    <p className={"answer"}>
                                                        All amino acids but glycine have at least one chiral center at C&beta;. Aminoacids with with more than one chiral center are Isoleucine and Threonine
                                                    </p>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex'}}>
                                    <div className="text-field-sq">
                                        <div style={{height: this.state.showAnswer2 ? '70%' : '100%'}}>
                                            <div className="panel-heading question-mark">
                                                <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                            </div>
                                            <div className="panel-heading question-heading">
                                                <h4 className="panel-title">
                                                    <div className={"question-s"}>
                                                        <a className="accordion-toggle" data-toggle="collapse"
                                                           data-parent="#accordion">
                                                            Currently there are 22 (rather than 20) known naturally occurring, genetically encoded amino acids. Number 21 has one-letter code U and number 22 has one-letter code O. What are the names and three-letter codes of these two amino acids? How many PDB entries contain at least one of them?
                                                        </a>
                                                        <a onClick={this.handleShowAnswer2}>
                                                            <FontAwesomeIcon icon={this.state.showAnswer2 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}}/>
                                                        </a>
                                                    </div>
                                                </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <Collapse isOpened={this.state.showAnswer2} style={{display: 'block'}}>
                                                <div>
                                                    <p className={"answer"}>
                                                        U - Selenocysteine (Seq), O - Pyrrolysine (Pyl), for actual answer about the number of entries, try use PDBe service.
                                                    </p>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex', marginRight: 'auto'}}>
                                    <div className="text-field-sq">
                                        <div style={{height: this.state.showAnswer3 ? '50%' : '100%'}}>
                                            <div className="panel-heading question-mark">
                                                <h4 style={{fontSize:'30px'}}>?</h4>
                                            </div>
                                            <div className="panel-heading question-heading">
                                                <h4 className="panel-title">
                                                    <div className={"question-s"}>
                                                        <p>
                                                            Do you expect the C&beta; atom of a tyrosine residue to lie in the same plane as the aromatic ring?
                                                        </p>
                                                        <a onClick={this.handleShowAnswer3}>
                                                            <FontAwesomeIcon icon={this.state.showAnswer3 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}}/>
                                                        </a>
                                                    </div>
                                                </h4>
                                            </div>
                                            <Modal
                                                isOpen={this.state.showAnswer3}
                                                onAfterOpen={this.handleShowAnswer3}
                                                onRequestClose={this.handleHideAnswer3}
                                                style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                                contentLabel="Example Modal">
                                                <div>
                                                    <img src={'/src/videos/tyrosine.gif'} style={{width: '676px', height: '400px'}}/>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex'}}>
                                    <div className="text-field-sq">
                                        <div style={{height: this.state.showAnswer4 ? '50%' : '100%'}}>
                                            <div className="panel-heading question-mark">
                                                <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                            </div>
                                            <div className="panel-heading question-heading">
                                                <h4 className="panel-title">
                                                    <div className={"question-s"}>
                                                        <p>
                                                            Using your favourite graphics program or web-based 3D viewer, have a look at residue TRP D67 in PDB entry 7GPB. Does anything strike you as odd?
                                                        </p>
                                                        <a onClick={this.handleShowAnswer4}>
                                                            <FontAwesomeIcon icon={this.state.showAnswer4 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}}/>
                                                        </a>
                                                    </div>
                                                </h4>
                                            </div>
                                            <Modal
                                                isOpen={this.state.showAnswer4}
                                                onAfterOpen={this.handleShowAnswer4}
                                                onRequestClose={this.handleHideAnswer4}
                                                style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                                contentLabel="Example Modal">
                                                <div>
                                                   <img src={'/src/videos/7gpb_63d_2.gif'} style={{width: '676px', height: '400px'}}/>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"text-field-sq"}>
                                <div style={{display: 'flex'}}>
                                    <div style={{display: 'inline-flex', width: '80%', marginRight: 'auto'}}>
                                        <div style={{display: 'block'}}>
                                            <p>
                                                The conformation of the backbone of every non-terminal amino-acid residue is determined by three torsion angles, called:
                                            </p>
                                            <ul >
                                                <li>&phi; (phi) &rarr; (C<sub>[i-1]</sub>-N<sub>[i]</sub>-C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>)</li>
                                                <li>&psi; (psi) &rarr; (N<sub>[i]</sub>-C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>-N<sub>[i+1]</sub>)</li>
                                                <li>&omega; (omega) &rarr; (C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>-N<sub>[i+1]</sub>-C&alpha;<sub>[i+1]</sub>)</li>
                                            </ul>
                                            <p style={{borderBottom: 'gray solid 1px'}}>
                                                Due to resonance, the peptide bond has partial double-bond character. Therefore, the omega torsion angle is restrained to values near 0 (cis-peptide) and 180 degrees (trans-peptide). Cis-peptides are relatively rare and usually (but not always) occur if the next residue is a proline. The omega angle therefore offers little in the way of validation checks, although values in the range of ±20 to ±160 degrees should be treated with caution in anything but very high-resolution models.
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{display: 'inline-flex', width: '19%'}}>
                                        <div style={{width: '100%', position: 'relative'}}>
                                            <ImageZoom
                                                image={{
                                                src: '/src/videos/psiphi.gif',
                                                alt: 'Phi and Psi',
                                                className: 'img',
                                                style: { width: '100%', objectFit: 'contain' }
                                            }}
                                                zoomImage={{
                                                src: '/src/videos/psiphi.gif',
                                                alt: 'Phi and Psi'
                                            }}
                                                defaultStyles={{
                                                    overlay: {
                                                        opacity: 0.5
                                                }
                                            }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p><i>
                                    Validation potential of omega: poor.
                                </i></p>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Dihedral angles</h2>
                            <div className={"text-field-sq"} style={{width: '58%', top: '80px'}}>
                                <p>
                                    The &phi; and &psi; torsion angles, on the other hand, are much less restricted, but it has been known for a long time that, due to steric hindrance, there are several clearly preferred combinations of &phi;, &psi; values (a scatter plot of &phi;, &psi; values for all residues in a protein model is called a Ramachandran plot). This is true even for proline and glycine residues, although their distributions are atypical. Also, the overwhelming majority of residues that are not in regular secondary structure elements are found to have favourable &phi;, &psi; torsion-angle combinations. For these reasons, the Ramachandran plot is an extremely simple, useful and sensitive indicator of model quality. Residues that have unusual &phi;, &psi; torsion-angle combinations should be scrutinised by the crystallographer. If they have convincing electron density, there is probably a good structural or functional reason for the protein to tolerate the energetic strain that is associated with the unusual conformation. The quality of a model's Ramachandran plot is most convincingly illustrated with a figure. Alternatively, the fraction of residues in certain predefined areas of the plot (e.g., core regions) can be quoted, but in that case it is important to indicate which definition of such areas was used.
                                </p>
                                <p>
                                    If you are interested in finding out which specific steric clashes put restrictions on &phi; and/or &psi;, read the <b><a href={"https://onlinelibrary.wiley.com/doi/full/10.1110/ps.03235203"}>2003 paper by Ho et al.</a></b> They found that O<sub>(i-1)</sub>...C&beta;<sub>(i)</sub> restricts &phi; of residue i, C&beta;<sub>(i)</sub>...O<sub>(i)</sub> and C&beta;<sub>(i)</sub>...N<sub>(i+1)</sub> restrict &psi;, and O<sub>(i-1)</sub>...O<sub>(i)</sub> and O<sub>(i-1)</sub>...N<sub>(i+1)</sub> restrict both &phi; and &psi;.
                                </p>
                                <p style={{borderTop: 'black solid 1px'}}><i>
                                    Validation potential of &phi;, &psi; combinations: excellent. A quick look at the Ramachandran plot will tell you a lot about the quality of a model. Good models have most residues tightly clustered in the most-favoured regions with relatively few outliers. Good, but low-resolution models may have less pronounced clustering, but will still have few outliers. Models that show poor clustering and many outliers are bound to be poor.
                                </i></p>
                            </div>
                            <div style={{width: '58%'}}>
                                <div className="text-field-sq">
                                    <div className={"expandable-question"} style={{height: this.state.showAnswer5 ? '50%' : '100%'}}>
                                        <div className="panel-heading question-mark">
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading question-heading">
                                            <h4 className="panel-title">
                                                <div className={"question-s"}>
                                                    <p>
                                                        The three most-densely populated areas in the Ramachandran plot are called the alpha, the beta, and the left-handed helical region. Where are these three regions located approximately in the Ramachandran plot?
                                                    </p>
                                                    <a onClick={this.handleShowAnswer5}>
                                                        <FontAwesomeIcon icon={this.state.showAnswer5 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}} className="hint--bottom" aria-label={"Show answer"}/>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                    </div>
                                    <Modal
                                        isOpen={this.state.showAnswer5}
                                        onAfterOpen={this.handleShowAnswer5}
                                        onRequestClose={this.handleHideAnswer5}
                                        style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                        contentLabel="Example Modal">
                                        <div>
                                            <img src={'/src/videos/rama.png'} style={{width: '500px'}}/>
                                        </div>
                                    </Modal>
                                </div>
                                <div className="text-field-sq">
                                    <div className={"expandable-question"} style={{height: this.state.showAnswer6 ? '50%' : '100%'}}>
                                        <div className="panel-heading question-mark">
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading question-heading">
                                            <h4 className="panel-title">
                                                <div className={"question-s"}>
                                                    <p>
                                                        Which regions would you expect to be most favourable in the Ramachandran plot of a protein that consists entirely of D-amino acids?
                                                    </p>
                                                    <a onClick={this.handleShowAnswer6}>
                                                        <FontAwesomeIcon icon={this.state.showAnswer6 ? faAngleRight : faAngleDown} size={"2x"} style={{float: 'right', cursor: 'pointer'}} className="hint--bottom" aria-label={"Show answer"}/>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                    </div>
                                    <Modal
                                        isOpen={this.state.showAnswer6}
                                        onAfterOpen={this.handleShowAnswer6}
                                        onRequestClose={this.handleHideAnswer6}
                                        style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                        contentLabel="Example Modal">
                                        <div>
                                            <img src={'/src/videos/d-rama.png'} style={{width: '500px'}}/>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div style={{width: '39.5%', display: 'inline-block', position: 'absolute', right: '0', top: '100px'}} id={"rama-view-container"}>
                            {/*
                                // @ts-ignore */}
                                <ramachandran-component pdb-ids='["1cbs"]' chains-to-show='["A"]' models-to-show='["1"]' width="520" id='ramachandran-component-1'/>
                                {/*<ramachandran-component pdb-ids='["1cbs"]' chains-to-show='["A"]' models-to-show='["1"]' width="550" ></ramachandran-component>*/}
                            </div>
                        </div>
                    </ParallaxLayer>

                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={3} speed={-0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Outliers</h2>
                            <div style={{display: 'flex'}}>
                                <div className="text-field-sq" style={{display: 'flex', width: '60%'}}>
                                        <div style={{display: 'block'}}>
                                            <p>Contours for Ramachandran plot was computed using database <a href={"http://kinemage.biochem.duke.edu/databases/top8000.php"}><b>Top8000</b></a>. A residue is marked as Ramachandran outlier, when the dihedral angle is improbable or rare. But that does not mean, that it can't exist. </p>
                                            <p>Ramachandran outliers are common in proteins, and many are likely to simply be errors in the structure. However, some of these outliers will be supported by the structural data and may exist in energetically strained conformations.</p>
                                            <p>The Ramachandran plot on the right side is for annexin protein. Annexins are proteins, which are mostlz found in eukaryotic organisms. This specific one, <a href={"https://www.ebi.ac.uk/pdbe/entry/pdb/2hyv"}><b>2HYV</b></a>, is a human annexin A2 with heparin hexasaccharide bound. You can see, that there is only one residue, which is flagged as outlier.</p>
                                            <p>It is very important to note, that issues highlighted by a validation metri do not necessarily  imply errors in the model. Instead they may point to genuine, albeit unusal, features of structure, which may be of biological interest.</p>
                                            <p>An example is resiude <b>Val50</b> in the annexin protein. It is involved in Ca<sup>2+</sup> ion coordination - but is consistently flagged as a Ramachandran outlier.</p>
                                            <p>Such unusual features should, however, be supported by convincing experimental evidence.</p>
                                        </div>
                                </div>
                                <div style={{width: "39.5%", display: 'inline-flex', position: 'absolute', right: '0',top: '100px'}} id={"ramachandran-2"}>
                                    {/*
                                // @ts-ignore */}
                                    <ramachandran-component pdb-ids='["2hyv"]' chains-to-show='["A"]' models-to-show='["1"]' width="520" id='ramachandran-component-2'/>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={4} speed={-0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Ramachandran principle</h2>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '60%'}}>
                                    <div style={{display: 'flex'}}>
                                        <div className="text-field-sq" style={{display: 'flex'}}>
                                            <div style={{display: 'inline-flex', marginRight: 'auto', width: '87%'}}>
                                                <div style={{display: 'block'}}>
                                                    <p>The Ramachandran Principle says that alpha helices, beta strands, and turns are the most likely conformations for a polypeptide chain to adopt, because most other conformations are impossible due to steric collisions <b>(clashes)</b> between atoms.</p>
                                                    <p>Peptide bonds have a double bonded character. This prevents them from rotating. They have this charachter because they resonate with the adjacent oxygen double bond. As a result of their inability to rotate each peptide bond holds six atoms in a plane.</p>
                                                    <p>Actually most &phi; or &psi; angles are impossible due to clashes between atoms. Atoms in the ball and stick model are much smaller than the true sizes.</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'inline-flex', width: '12%'}}>
                                                <div style={{width: '100%', paddingTop: '50%', paddingBottom: '50%', position: 'relative'}}>
                                                    <ImageZoom
                                                        image={{
                                                            src: '/src/videos/planes.gif',
                                                            alt: 'Phi and Psi',
                                                            className: 'img',
                                                            style: { width: '100%', objectFit: 'contain' }
                                                        }}
                                                        zoomImage={{
                                                            src: '/src/videos/planes.gif',
                                                            alt: 'Phi and Psi'
                                                        }}
                                                        defaultStyles={{
                                                            overlay: {
                                                                opacity: 0.5
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div className="text-field-sq" style={{display: 'flex'}}>
                                            <div style={{display: 'inline-flex', marginRight: 'auto', width: '87%'}}>
                                                <div style={{display: 'block'}}>
                                                    <p>Here are the actual sizes of the atoms in our model. These are the so-called Vander Waals radii.</p>
                                                    <p>Here, the &psi; angle is fixed at 165° and we are rotating the &phi; angle a full through 360°. As the atoms get close to each other and begin to overlap, which would be physically impossible, but is allowed in this model, they clash with each other. These clashes are shown as yellow and red objects that appear and disappear during  rotation.</p>
                                                    <p>Wherever the clashes appear, that angle of &phi; would be impossible when &psi; is 165°. Compare it with the Ramachandran plot. As you can see at the animation, there is only one region, that has no clashes. You can find the region on the Ramachandran plot.</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'inline-flex', width: '12%'}} className={'image-box'}>
                                                <div style={{width: '100%', paddingTop: '50%', paddingBottom: '50%', position: 'relative'}}>
                                                    <ImageZoom
                                                        image={{
                                                            src: '/src/videos/psifixed.gif',
                                                            alt: 'Phi and Psi',
                                                            className: 'img',
                                                            style: { width: '100%', objectFit: 'contain' }
                                                        }}
                                                        zoomImage={{
                                                            src: '/src/videos/psifixed.gif',
                                                            style: {width: ''},
                                                            alt: 'Phi and Psi'
                                                        }}
                                                        defaultStyles={{
                                                            overlay: {
                                                                opacity: 0.5
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div className="text-field-sq" style={{display: 'flex'}}>
                                            <div style={{display: 'inline-flex', width: '12%'}}>
                                                <div style={{width: '100%', paddingBottom: '10%', position: 'relative'}}>
                                                    <ImageZoom
                                                        image={{
                                                            src: '/src/videos/phifixed.gif',
                                                            alt: 'Phi and Psi',
                                                            className: 'img',
                                                            style: { width: '100%', objectFit: 'contain' }
                                                        }}
                                                        zoomImage={{
                                                            src: '/src/videos/phifixed.gif',
                                                            alt: 'Phi and Psi'
                                                        }}
                                                        defaultStyles={{
                                                            overlay: {
                                                                opacity: 0.5
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{display: 'inline-flex', marginRight: 'auto', width: '75%'}}>
                                                <div style={{display: 'block'}}>
                                                    <p>At the left animation we are rotating &psi;. &phi; angle is fixed at -80°. You can detect two regions with no clashes. You can try again identify the region on Ramachandran plot.</p>
                                                    <p>At the right animation the &phi; angle is fixed at 0°. This angle <b>does not </b>occur in real proteins. As you can see, when the &psi; rotates, there are clashes at all &psi; angles. This means, that &phi; of 0° is physically impossible.</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'inline-flex', width: '12%'}}>
                                                <div style={{width: '100%', paddingBottom: '10%', position: 'relative'}}>
                                                    <ImageZoom
                                                        image={{
                                                            src: '/src/videos/phi0.gif',
                                                            alt: 'Phi and Psi',
                                                            className: 'img',
                                                            style: { width: '100%', objectFit: 'contain' }
                                                        }}
                                                        zoomImage={{
                                                            src: '/src/videos/phi0.gif',
                                                            alt: 'Phi and Psi'
                                                        }}
                                                        defaultStyles={{
                                                            overlay: {
                                                                opacity: 0.5
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "39.5%", display: 'inline-flex', position: 'absolute', right: '0',top: '100px'}} id={"ramachandran-3"}>
                                    {/*
                                // @ts-ignore */}
                                    <ramachandran-component pdb-ids='["1tqn"]' chains-to-show='["A"]' models-to-show='["1"]' width="520" id='ramachandran-component-1'/>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>;
    }
}

export default Theory;