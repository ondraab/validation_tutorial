import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import * as $ from 'jquery';
import * as Modal from "react-modal";

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
    modalVideo1: boolean;
    modalVideo2: boolean;
    modalVideo3: boolean;
    showModal: boolean;
}


class App extends React.Component< {}, ValidationStates> {
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
            pdbId: '1cbs',
            models: ['1'],
            chains: ['A'],
            modalVideo1: false,
            modalVideo2: false,
            modalVideo3: false,
            showModal: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._pdbId = '1cbs';
        this.activeTab = 0;

        this.closeModals = this.closeModals.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.openModal2 = this.openModal2.bind(this);
        this.openModal3 = this.openModal3.bind(this);
    }

    public closeModals() {
        this.setState({ modalVideo1: false,
        modalVideo2: false,
        modalVideo3: false});
    }

    public openModal1() {
        this.setState({ modalVideo1: true });
    }

    public openModal2() {
        this.setState({ modalVideo2: true });
    }

    public openModal3() {
        this.setState({ modalVideo3: true });
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
        const url = (name: any, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;


        return <div className="App">
            <div className="main-title masthead" style={{height: '54px'}}>
                <h1 className="white-color">Validation tutorial</h1>
                <div className="navbar">
                    <NavLink to="/" activeClassName="nav-active">
                        <h3>
                            Validation
                        </h3>
                    </NavLink>
                    <NavLink to="/coordinates">
                        <h3>
                            Coordinates
                        </h3>
                    </NavLink>
                    <div className={"expandable-div"}>
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
            <div className="page-nav long-4" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active grow"} style={{position: 'absolute', top: 0, right: 0}}
                   onClick={() => this.addClass(0)}>
                    <h2 style={{color: 'white'}}>Introduction</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '24vh', right: 0}}
                    onClick={() => this.addClass(1)}>
                    <h2 style={{color: 'white'}}>Review some facts</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '48vh', right: 0}}
                    onClick={() => this.addClass(2)}>
                    <h2 style={{color: 'white'}}>Validation methods I</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: '72vh', right: 0}}
                    onClick={() => this.addClass(3)}>
                    <h2 style={{color: 'white'}}>Validation methods II</h2>
                </a>

            </div>
            <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>
                <Parallax ref={ref => (this.parallax = ref)} pages={4}>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#aeaeae' }} />
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#7c827e' }} />
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2} speed={-0.3} style={{backgroundSize: '80%', backgroundPosition: 'center'}}/>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={0} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%', marginTop:'50px'}}>
                            <div style={{width: '100%', display: 'inline-block'}}>
                            <h2>Introduction</h2>
                                <div className={"text-field-sq"}>
                                    <p>
                                        Welcome to this practical about structure validation using publicly available resources.
                                        The emphasis in this practical is on validation of crystal structures of proteins,
                                        but some of the lessons extend to structures determined by other methods,
                                        and to structures of biomacromolecules other than proteins.
                                    </p>
                                    <p>
                                        Assessing the quality of a model is called validation. Validation is something
                                        that needs to be done both by producers (crystallographers, NMR spectroscopists,
                                        electron microscopists, etc.) and users (biologists, enzymologists, medicinal chemists, etc.)
                                        of models. Note that we talk of models rather than structures, since a model is just a simplified
                                        representation of a human being's hypothesis of what a molecule looks like
                                        (a collection of point atoms, often even ignoring hydrogen atoms).
                                    </p>
                                </div>
                                <div className={"text-field-sq"}>

                                    <h3>This practical and the resources it covers should help you to:</h3>
                                    <ol>
                                        <li>Read papers about protein crystal structures (errr, models) and understand the discussion of the model's quality (and ask relevant questions on this subject after hearing a protein crystallographer give a talk on a particular structure, or after reading a manuscript that you are asked to referee).</li>
                                        <li>Find or generate quality-related information on a given protein model using web-based databases and servers.</li>
                                        <li>Use this information to form a general opinion as to the overall quality of the model, as well as of certain aspects of it (e.g., the extent to which the presence or conformation of a bound ligand is supported by the crystallographic data).</li>
                                        <li>Select the better of a set of related models (assuming there are noticeable differences in the quality of these models), e.g. for purposes of homology modelling, ligand design, mutant design, or molecular replacement calculations.</li>
                                    </ol>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                        <h3>The following are useful links that you may want to explore:</h3>
                                        <ul>
                                            <li><a href={"http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html"}>A glossary of terms related to structural quality</a></li>
                                            <li><a href={" http://www.ruppweb.org/Xray/101index.html"}>An introduction to protein crystallography</a></li>
                                            <li><a href={"https://wwpdb.org/validation/validation-reports"}>List of wwPDB documents and resources related to validation and validation reports</a></li>
                                            <li><a href={"https://wwpdb.org/task/validation-task-forces"}>Overview of wwPDB Validation Task Forces (VTFs) and their published recommendations</a></li>
                                            <li>The websites of the wwPDB partners, <a href={"http://pdbe.org"}>PDBe</a>, <a href={"http://pdbj.org"}>PDBj</a> and <a href={"https://rcsb.org"}>RCSB PDB</a></li>
                                            <li><a href={"http://scripts.iucr.org/cgi-bin/paper?S0907444999016364"}>An extensive review of validation in protein crystallography</a></li>
                                        </ul>
                                    </div>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                        <p>
                                            <b><a href={"http://profiles.ucsf.edu/james.holton"}>James Holton</a></b>,
                                            while at Berkeley, produced a number of movies that demonstrate the
                                            importance of resolution, amplitudes and phases for the quality of the resulting
                                            electron-density map. James has kindly given permission to incorporate a couple of his
                                            movies into this practical. You will find them at next page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Before we start, let's review some important facts</h2>
                            <div style={{display: 'flex'}}>
                                <div className={"text-field-sq"}>
                                    {/*
                                        // @ts-ignore */}
                                    <Modal
                                        isOpen={this.state.modalVideo1}
                                        onAfterOpen={this.openModal1}
                                        onRequestClose={this.closeModals}
                                        style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                        contentLabel="Example Modal"
                                    >
                                        <div>
                                            <video controls style={{display: 'flex'}} className={"modal-video"}>
                                                <source src={"/src/videos/jh_resol.mp4"} type={"video/mp4"}/>
                                            </video>
                                            <p style={{display: "block"}}>
                                                This movie displays a calculated electron density map, contoured at 1 sigma,
                                                as the resolution limit is adjusted slowly from 0.5Å to 6Å. [...] The phases are
                                                perfect, and so are the amplitudes (R-factor = 0.0%) for all the resolutions displayed.
                                                Note that, even for a perfect map, you expect side chains to poke out of density at 3.5Å.
                                            </p>
                                        </div>
                                    </Modal>
                                    <p style={{display: 'flex', verticalAlign: 'top', marginRight: '15px'}}>
                                        This movie displays a calculated electron density map, contoured at 1 sigma,
                                        as the resolution limit is adjusted slowly from 0.5Å to 6Å. [...] The phases are
                                        perfect, and so are the amplitudes (R-factor = 0.0%) for all the resolutions displayed.
                                        Note that, even for a perfect map, you expect side chains to poke out of density at 3.5Å.
                                    </p>
                                    <a href={"#"} onClick={this.openModal1}>
                                        <video style={{display: 'flex', marginLeft: 'auto', marginRight: '0'}} id={"video1"}>
                                            <source src={"/src/videos/jh_resol.mp4"} type={"video/mp4"}/>
                                        </video>
                                    </a>
                                </div>
                            </div>
                            <div className={"text-field-sq video-field"}>
                                <Modal
                                    isOpen={this.state.modalVideo2}
                                    onAfterOpen={this.openModal2}
                                    onRequestClose={this.closeModals}
                                    style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                    contentLabel="Example Modal"
                                >
                                    <div>
                                        <video controls style={{display: 'flex'}} className={"modal-video"}>
                                            <source src={"/src/videos/jh_ampli.mp4"} type={"video/mp4"}/>
                                        </video>
                                        <p style={{display: "block"}}>
                                            This movie displays the effect of calculating a map with "wrong" amplitudes. [...]
                                            The images in this movie represent the slow changing of all the amplitudes to a different
                                            set of randomly selected values while holding the phases constant. It is interesting to
                                            note that the map hardly changes at all until the R-factor gets higher than 30%.
                                            The maximum R-factor you can get for two random data sets is 75%, which is the end of
                                            the movie. Kinda spookey how it still looks traceable, isn't it? The resolution here is
                                            1.5Å, and the phases are always perfect.
                                        </p>
                                    </div>
                                </Modal>
                                <p style={{display: 'inline-block', verticalAlign: 'top'}}>
                                    This movie displays the effect of calculating a map with "wrong" amplitudes. [...]
                                    The images in this movie represent the slow changing of all the amplitudes to a different
                                    set of randomly selected values while holding the phases constant. It is interesting to
                                    note that the map hardly changes at all until the R-factor gets higher than 30%.
                                    The maximum R-factor you can get for two random data sets is 75%, which is the end of
                                    the movie. Kinda spookey how it still looks traceable, isn't it? The resolution here is
                                    1.5Å, and the phases are always perfect.
                                </p>
                                <a href={"#"} onClick={this.openModal2}>
                                    <video style={{display: 'inline-block', marginLeft: '20px'}} id="video2">
                                        <source src={"/src/videos/jh_ampli.mp4"} type={"video/mp4"}/>
                                    </video>
                                </a>
                            </div>
                            <div className={"text-field-sq video-field"}>
                                <Modal
                                    isOpen={this.state.modalVideo3}
                                    onAfterOpen={this.openModal3}
                                    onRequestClose={this.closeModals}
                                    style={{content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)'}}}
                                    contentLabel="Example Modal"
                                >
                                    <div>
                                        <video controls style={{display: 'flex'}} className={"modal-video"}>
                                            <source src={"/src/videos/jh_phase.mp4"} type={"video/mp4"}/>
                                        </video>
                                        <p style={{display: "block"}}>
                                            This movie displays the effect of calculating a map with "wrong" phases. The "figure of merit" (
                                            cosine of the error in the phase) is displayed as "m". The images in this movie were calculated by
                                            merging a perfect calculated map with another map, calculated with the same amplitudes, but with phases
                                            obtained from a model with randomly positioned atoms. Merging these two maps always preserves the amplitudes,
                                            but changes the phases slowly to a new set of values. At what point do you think the map becomes untraceable?
                                            The resolution here is 1.5Å, and the R-factor is always 0.0%.
                                        </p>
                                    </div>
                                </Modal>
                                <p style={{display: 'inline-block', verticalAlign: 'top'}}>
                                    This movie displays the effect of calculating a map with "wrong" phases. The "figure of merit" (
                                    cosine of the error in the phase) is displayed as "m". The images in this movie were calculated by
                                    merging a perfect calculated map with another map, calculated with the same amplitudes, but with phases
                                    obtained from a model with randomly positioned atoms. Merging these two maps always preserves the amplitudes,
                                    but changes the phases slowly to a new set of values. At what point do you think the map becomes untraceable?
                                    The resolution here is 1.5Å, and the R-factor is always 0.0%.
                                </p>
                                <a href={"#"} onClick={this.openModal3}>
                                    <video style={{display: 'inline-block', marginLeft: '20px'}} id="video3">
                                        <source src={"/src/videos/jh_phase.mp4"} type={"video/mp4"}/>
                                    </video>
                                </a>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2} speed={-0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Validation methods I</h2>
                            <div style={{display: 'flex'}}>
                                <div className={"text-field-sq"}>
                                    <p>
                                        <b>If you look it up in a dictionary, "validation" is defined as:</b>
                                    </p>
                                    <ul>
                                        <li>to declare or make legally valid</li>
                                        <li>to mark with an indication of official sanction</li>
                                        <li>to substantiate or verify</li>
                                    </ul>
                                    <p style={{display: 'inline-block', verticalAlign: 'top'}}>
                                        Many statistics, methods, and programs were developed from the 1990s onward to help identify
                                        errors in protein models. These methods generally fall into two classes: one in which only
                                        coordinates are considered (such methods often entail comparison of a model to information derived from structural databases),
                                        and another in which both the model and the crystallographic data are taken into account.
                                    </p>
                                </div>
                            </div>
                            <div className={"text-field-sq"}>
                                <p style={{verticalAlign: 'top'}}>
                                    Alternatively, one can distinguish between "weak" methods that essentially measure
                                    how well the refinement program has succeeded in imposing restraints (e.g.,
                                    deviations from ideal geometry, conventional R-value) and "strong" ones that assess
                                    aspects of the model that are "orthogonal" to the information used in refinement
                                    (e.g., free R-value, patterns of non-bonded interactions, conformational torsion-angle distributions).
                                </p>
                                <p style={{verticalAlign: 'top'}}>
                                    An additional distinction can be made between methods that provide overall (global) statistics for a
                                    model (such methods are suitable for monitoring the progress of the refinement and rebuilding process)
                                    and those that provide information at the level of residues or atoms (such methods are more
                                    useful for detecting local problems in a model).
                                </p>
                                <p style={{verticalAlign: 'top'}}>
                                    It is important to realise that almost all coordinate-based validation methods
                                    detect outliers (i.e., atoms, residues or ligands with unusual properties): to
                                    assess whether an outlier is an error in the model or whether it is a genuine,
                                    but unusual, feature of the structure, one must inspect the (preferably unbiased)
                                    electron-density maps! If an outlier is most likely an error in your model,
                                    you probably want to try and fix it before depositing the model and submitting
                                    your paper. If, on the other hand, it appears to be a genuine feature of your structure,
                                    convincingly supported by the experimental data, you may even want to mention it in your paper.
                                </p>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                    <p>
                                        If you are interested in the overall quality of a model (e.g., to decide if
                                            it's good enough to use as a starting point for comparative modelling),
                                            strong and global quality indicators are most useful. <b>Examples of such criteria are:</b>
                                    </p>
                                    <ul>
                                        <li>Free R-value</li>
                                        <li>Packing or clash score</li>
                                        <li>Ramachandran plot</li>
                                    </ul>
                                </div>
                                <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%'}}>
                                    <p style={{display: 'inline-block', verticalAlign: 'top'}}>
                                        If, on the other hand, you are interested in finding the local errors
                                        (to decide if the active site of a protein has been modeled reliably enough
                                        to use it for the design of ligands), strong and local methods are most suitable. <b>Examples of these are:</b>
                                    </p>
                                    <ul>
                                        <li>Real-space fit</li>
                                        <li>Main-chain torsion-angle combinations (Ramachandran)</li>
                                        <li>Side-chain torsion-angle combinations (rotamers)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={3} speed={-0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Validation methods II</h2>
                            <div style={{display: 'flex'}}>
                                <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                    <p>
                                        Unfortunately, in many (especially older) papers that describe macromolecular
                                        crystal structures, "quality criteria" are quoted that do not necessarily
                                        provide any indication whatsoever of the actual quality of the model. <b>Examples are:</b>
                                    </p>
                                    <ul>
                                        <li>Conventional R-value</li>
                                        <li>RMS deviation of bond lengths and angles from "ideal" values</li>
                                        <li>Average temperature factor of the atoms in the model</li>
                                    </ul>
                                </div>
                                <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%'}}>
                                    <p style={{verticalAlign: 'top'}}>
                                        It is also important to realise that every quality check that a model
                                        passes provides a necessary but insufficient indication of the model's correctness:
                                        a good model makes sense in just about every respect.
                                    </p>
                                    <p style={{verticalAlign: 'top'}}>
                                        Fortunately, nowadays there are sensible validation reports available
                                        for all structures in the PDB to help you assess their quality
                                        (we will come back to these reports later in the practical).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
            {/*<div>*/}
                {/*<p><b>The conformation of the backbone of every non-terminal amino-acid residue is determined by three torsion angles, called:</b></p>*/}
                {/*<div>*/}
                    {/*<li>phi <b>(&phi;)</b> (C<sub>(-1)</sub>&mdash;N&mdash;C<sub>&alpha;</sub>&mdash;C)</li>*/}
                    {/*<li>psi <b>(&psi;)</b> (N&mdash;C<sub>&alpha;</sub>&mdash;C&mdash;N<sub>(+1)</sub>)</li>*/}
                    {/*<li>omega <b>(&omega;)</b> (C<sub>&alpha;(-1)</sub>&mdash;C<sub>(-1)</sub>&mdash;N&mdash;C<sub>&alpha;</sub>) </li>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<p>*/}
                        {/*Due to resonance, the peptide bond has partial double-bond character.*/}
                        {/*Therefore, the omega torsion angle is restrained to values near 0 <i>(cis-peptide)</i> and*/}
                        {/*180° <i>(trans-peptide)</i>. Cis-peptides are relatively rare and usually (but not always)*/}
                        {/*occur if the next residue is a proline. The &omega; angle therefore offers little in the way*/}
                        {/*of validation checks, although values in the range of ±20° to ±160° should be treated with*/}
                        {/*caution in anything but very high-resolution models.*/}
                    {/*</p>*/}
                    {/*<p><i>Validation potential of omega: poor.</i></p>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<img src={"/src/backbone.svg"} alt={"backbone"}/>*/}
            {/*<Expandable headers={[*/}
              {/*(isOpened: boolean) => (*/}
              {/*<div className={"main-expandable-div"}>*/}
                  {/*<div className={"expandable-element-title"}>*/}
                      {/*<h3>About the torsion angles</h3>*/}
                      {/*<h4>{isOpened ? '+' : '-'}</h4>*/}
                  {/*</div>*/}
              {/*</div>*/}
              {/*),*/}
              {/*(isOpened: boolean) => (*/}
                  {/*<div className={"main-expandable-div"}>*/}
                      {/*<div className={"expandable-element-title"}>*/}
                          {/*<h3>Ramachandran plot - simple and useful model quality indicator</h3>*/}
                          {/*<h4>{isOpened? '+' : '-'}</h4>*/}
                      {/*</div>*/}
                  {/*</div>*/}
              {/*),*/}
              {/*(isOpened: boolean) => (*/}
                  {/*<div className={"main-expandable-div"}>*/}
                      {/*<div className={"expandable-element-title"}>*/}
                          {/*<h3>Tab3</h3>*/}
                          {/*<h4>{isOpened? '+' : '-'}</h4>*/}
                      {/*</div>*/}
                  {/*</div>*/}
              {/*),*/}
          {/*]} enableMultiOpen>*/}
              {/*<div>*/}
                  {/*<div className={"collapsed-div"}>*/}
                      {/*<div>*/}
                          {/*<p><b>The conformation of the backbone of every non-terminal amino-acid residue is determined by three torsion angles, called:</b></p>*/}
                          {/*<div>*/}
                              {/*<li>phi <b>(&phi;)</b> (C<sub>(-1)</sub>&mdash;N&mdash;C<sub>&alpha;</sub>&mdash;C)</li>*/}
                              {/*<li>psi <b>(&psi;)</b> (N&mdash;C<sub>&alpha;</sub>&mdash;C&mdash;N<sub>(+1)</sub>)</li>*/}
                              {/*<li>omega <b>(&omega;)</b> (C<sub>&alpha;(-1)</sub>&mdash;C<sub>(-1)</sub>&mdash;N&mdash;C<sub>&alpha;</sub>) </li>*/}
                          {/*</div>*/}
                          {/*<div>*/}
                          {/*<p>*/}
                              {/*Due to resonance, the peptide bond has partial double-bond character.*/}
                              {/*Therefore, the omega torsion angle is restrained to values near 0 <i>(cis-peptide)</i> and*/}
                              {/*180° <i>(trans-peptide)</i>. Cis-peptides are relatively rare and usually (but not always)*/}
                              {/*occur if the next residue is a proline. The &omega; angle therefore offers little in the way*/}
                              {/*of validation checks, although values in the range of ±20° to ±160° should be treated with*/}
                              {/*caution in anything but very high-resolution models.*/}
                          {/*</p>*/}
                              {/*<p><i>Validation potential of omega: poor.</i></p>*/}
                          {/*</div>*/}
                      {/*</div>*/}
                      {/*<img src={"/src/backbone.svg"} alt={"backbone"}/>*/}
                  {/*</div>*/}
              {/*</div>*/}
                {/*<div className={"collapsed-div"} id={"component-main-div"}>*/}
                    {/*<div className={"form-div"}>*/}
                        {/*<form className={"form-inline"} onSubmit={this.handleSubmit}>*/}
                            {/*<input type="pdbId" className="form-control" id="inputPDB" placeholder="PDBid" onChange={this.handleChange}/>*/}
                            {/*<button type="submit" className="btn btn-primary mb-2">Submit</button>*/}
                        {/*</form>*/}
                    {/*</div>*/}
                    {/*<CoopComponents pdbId={[this.state.pdbId]} chains={this.state.chains} models={this.state.models}/>*/}
                {/*</div>*/}
              {/*<div>*/}
                  {/*third item*/}
              {/*</div>*/}
          {/*</Expandable>*/}
      </div>;
  }

}

export default App;
