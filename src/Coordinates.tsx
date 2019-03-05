import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/addons";
import * as $ from "jquery";
import ReactTooltip from 'react-tooltip'

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
}

class Coordinates extends React.Component< {}, ValidationStates> {
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

    constructor(props : {}) {
        super(props);
        this.state = {pdbId: '1cbs', models: ['1'], chains: ['A']};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        return <div className="CoordinateApp">
            <script>
                (function () {
                // @ts-ignore
                // @ts-ignore
                angular.element(document).ready(function () {
                // @ts-ignore
                angular.bootstrap(document, ['pdb.litemol'])
            })
            }());
            </script>
            <ReactTooltip />
            <div className="main-title masthead">
                <h1 className="white-color">Validation tutorial</h1>
                <div className="navbar">
                    <NavLink to="/">
                        <h3>
                            Validation
                        </h3>
                    </NavLink>
                    <NavLink to="/coordinates" activeClassName="nav-active">
                        <h3>
                            Coordinates
                        </h3>
                    </NavLink>
                </div>
            </div>
            <div className="page-nav" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active grow"} style={{position: 'absolute', top: 0, right: 0}}
                   onClick={() => this.addClass(0)}>
                    <h2 style={{color: 'white', position: 'absolute', top: 50}}>Introduction</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/4)-9, right: 0}}
                   onClick={() => this.addClass(1)}>
                    <h2 style={{color: 'white', position: 'absolute', top: 50}}>Review I</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/2)-18, right: 0}}
                   onClick={() => this.addClass(2)}>
                    <h2 style={{color: 'white', position: 'absolute', top: 50}}>Review II</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/4 * 3)-27, right: 0}}
                   onClick={() => this.addClass(3)}>
                    <h2 style={{color: 'white', position: 'absolute', top: 50}}>Review III</h2>
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
                        {/*<img src="/src/2018-11-19.png" style={{ width: '15%', marginLeft: '70%' }} />*/}
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

                    <ParallaxLayer
                        offset={2}
                        speed={-0.3}
                        // @ts-ignore
                    />

                    <ParallaxLayer
                        offset={0}
                        speed={0.1}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%', marginTop:'50px'}}>
                            <div style={{width: '100%', display: 'inline-block'}}>
                                <h2>Coordinates and temperature factors</h2>
                                <div style={{display: 'flex'}}>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%', marginRight: 'auto'}}>
                                        <h3>Refresher</h3>
                                        <ul style={{fontSize: '140%'}}>
                                            <li>If you have forgotten what amino acids are, look <b><a href={"http://www.biology.arizona.edu/biochemistry/problem_sets/aa/aa.html"}>here</a></b> or <b><a href={"http://en.wikipedia.org/wiki/Amino_acid"}>here</a></b></li>
                                            <li>If you have forgotten what molecular geometry is, look <b><a href={"http://en.wikipedia.org/wiki/Molecular_geometry"}>here</a></b></li>
                                            <li>If you have forgotten what dihedral or torsion angles are, look <b><a href={"http://en.wikipedia.org/wiki/Dihedral_angle"}>here</a></b></li>
                                            <li>If you have forgotten what eclipsed and staggered conformations are, look <b><a href={"http://en.wikipedia.org/wiki/Rotamer"}>here</a></b></li>
                                            <li>If you have forgotten what chiral carbon atoms are, look <b><a href={"https://en.wikipedia.org/wiki/Asymmetric_carbon"}>here</a></b></li>
                                            <li>If you have forgotten what phi and psi are, look <b><a href={"http://employees.csbsju.edu/hjakubowski/classes/ch331/protstructure/phipsi.gif"}>here</a></b> or <b><a href={"http://www.msg.ucsf.edu/local/programs/garlic/commands/phipsi.gif"}>here</a></b></li>
                                            <li>If you have forgotten what chi-1, chi-2 etc. are, look <b><a href={"http://dunbrack.fccc.edu/bbdep2010/Images/Chi1Chi2Chi3Chi4.PNG"}>here</a></b> or <b><a href={"http://www.msg.ucsf.edu/local/programs/garlic/commands/chi_angles.gif"}>here</a></b></li>
                                        </ul>
                                    </div>
                                    <div className={"text-field-sq"} style={{display: 'inline-block', width: '49.5%'}}>
                                        <p style={{fontSize: '140%'}}>
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
                                <div className={"text-field-sq"}>
                                    <p style={{fontSize: '140%'}}>
                                        The covalent geometry of a model can be assessed by comparing bond lengths and
                                        angles to a library of "ideal" values. In the past, every refinement and modelling
                                        program had its own set of "ideal" values. This even made it possible to detect
                                        (with 95% accuracy) with which program a model had been refined, simply by inspecting
                                        its covalent geometry. Nowadays, standard sets of ideal bond lengths and bond angles,
                                        derived from an analysis of small-molecule crystal structures, are available
                                        for proteins and nucleic acids.
                                    </p>
                                    <p style={{fontSize: '140%'}}>
                                        For bond lengths, the RMS deviation from ideal values is typically quoted.
                                        Deviations from ideality of bond angles can be expressed directly as an angular
                                        RMS deviation or in terms of angle distances (i.e., the angle ABC is measured by
                                        the 1-3 distance |AC|).  Nowadays, RMS-Z-values of bond lengths and bond angles are
                                        preferred as they are more informative (but these values are not always provided in papers).
                                        Other checks in this class include chirality and planarity tests.
                                    </p>
                                    <p style={{fontSize: '140%', borderTop: 'black solid 1px'}}><i>
                                        Validation potential of geometric tests: poor. Good scores for these criteria
                                        prove little. However, if an entire model scores poorly, this should set off
                                        warning bells. Also, gross outliers should always be investigated!
                                        Modern refinement programs normally produce models with few (if any) outliers
                                    </i></p>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={1}
                        speed={0.1}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Chirality</h2>
                            <div style={{display: 'flex'}}>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex', marginRight: 'auto'}}>
                                    <div className="text-field-sq">
                                        <div className="panel-heading" style={{width: '8%', display: 'table-cell', verticalAlign: 'middle', borderRight: '1px solid gray'}}>
                                            <h4 data-tip="hello world" className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseOne">
                                                    Which amino acids contain chiral carbon atoms? Are there any
                                                    amino acids that contain more than one chiral carbon atom? If so, which one(s)?
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex'}}>
                                    <div className="text-field-sq">
                                        <div className="panel-heading" style={{width: '8%', display: 'table-cell', borderRight: '1px solid gray'}}>
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseTwo">
                                                    Currently there are 22 (rather than 20) known naturally occurring, genetically encoded amino acids. Number 21 has one-letter code U and number 22 has one-letter code O. What are the names and three-letter codes of these two amino acids? How many PDB entries contain at least one of them?
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex', marginRight: 'auto'}}>
                                    <div className="text-field-sq">
                                        <div className="panel-heading" style={{width: '8%', display: 'table-cell', verticalAlign: 'middle', borderRight: '1px solid gray'}}>
                                            <h4 data-tip="hello world" className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseThree">
                                                    Do you expect the CB atom of a tyrosine residue to lie in the same plane as the aromatic ring?
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex'}}>
                                    <div className="text-field-sq">
                                        <div className="panel-heading" style={{width: '8%', display: 'table-cell', borderRight: '1px solid gray'}}>
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseTwo">
                                                    Using your favourite graphics program or web-based 3D viewer, have a look at residue TRP D67 in PDB entry 7GPB. Does anything strike you as odd?
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"text-field-sq"}>
                                <p style={{fontSize: '140%'}}>
                                    The conformation of the backbone of every non-terminal amino-acid residue is determined by three torsion angles, called:
                                </p>
                                <ul style={{fontSize: '140%'}}>
                                    <li>&phi; (phi) &rarr; (C<sub>[i-1]</sub>-N<sub>[i]</sub>-C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>)</li>
                                    <li>&psi; (psi) &rarr; (N<sub>[i]</sub>-C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>-N<sub>[i+1]</sub>)</li>
                                    <li>&omega; (omega) &rarr; (C&alpha;<sub>[i]</sub>-C<sub>[i]</sub>-N<sub>[i+1]</sub>-C&alpha;<sub>[i+1]</sub>)</li>
                                </ul>
                                <p style={{fontSize: '140%', borderBottom: 'gray solid 1px'}}>
                                    Due to resonance, the peptide bond has partial double-bond character. Therefore, the omega torsion angle is restrained to values near 0 (cis-peptide) and 180 degrees (trans-peptide). Cis-peptides are relatively rare and usually (but not always) occur if the next residue is a proline. The omega angle therefore offers little in the way of validation checks, although values in the range of ±20 to ±160 degrees should be treated with caution in anything but very high-resolution models.
                                </p>
                                <p style={{fontSize: '140%'}}><i>
                                    Validation potential of omega: poor.
                                </i></p>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={3}
                        speed={-0}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '100%'}}>
                            <div style={{width: '50%', display: 'inline-block', marginTop: '95px'}}>
                                {/*
                                // @ts-ignore */}
                                {/*<ramachandran-component pdb-ids='["2gwx", "2baw"]' chains-to-show='["A", "B"]' models-to-show='["1"]' width="550"></ramachandran-component>*/}
                            </div>
                            <div style={{width: '50%', height: '360px', position: 'relative', marginTop: '75px', float: 'right'}}>
                                {/*
                                // @ts-ignore */}
                                {/*<pdb-lite-mol pdb-id="'2gwx'" is-expanded="false"></pdb-lite-mol>*/}
                            </div>

                            {/*<div style={{width: '50%', display: 'inline-block'}}>*/}
                                {/*/!**/}
                                {/*// @ts-ignore *!/*/}
                                {/*<pdb-lite-mol pdb-id="'1cbs'"></pdb-lite-mol>*/}
                            {/*</div>*/}
                            {/*<div style={{width: '50%', display: 'inline-block'}}>*/}
                                {/*/!**/}
                                {/*// @ts-ignore *!/*/}
                                {/*/!*<ramachandran-component pdb-ids='["3d12"]' chains-to-show='["A", "B", "C", "D", "E"]' models-to-show='["1"]' width="550"></ramachandran-component>*!/*/}
                            {/*</div>*/}
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={2}
                        speed={-0}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '100%'}}>
                            <div style={{width: '50%', display: 'inline-block', marginTop: '95px'}}>
                                {/*
                                // @ts-ignore */}
                                <ramachandran-component pdb-ids='["2gwx", "2baw"]' chains-to-show='["A", "B"]' models-to-show='["1"]' width="550"></ramachandran-component>
                            </div>
                            <div style={{width: '50%', height: '360px', position: 'relative', marginTop: '75px', float: 'right'}}>
                                {/*
                                // @ts-ignore */}
                                <pdb-lite-mol pdb-id="'2gwx'" is-expanded="false"></pdb-lite-mol>
                            </div>

                            {/*<div style={{width: '50%', display: 'inline-block'}}>*/}
                            {/*/!**/}
                            {/*// @ts-ignore *!/*/}
                            {/*<pdb-lite-mol pdb-id="'1cbs'"></pdb-lite-mol>*/}
                            {/*</div>*/}
                            {/*<div style={{width: '50%', display: 'inline-block'}}>*/}
                            {/*/!**/}
                            {/*// @ts-ignore *!/*/}
                            {/*/!*<ramachandran-component pdb-ids='["3d12"]' chains-to-show='["A", "B", "C", "D", "E"]' models-to-show='["1"]' width="550"></ramachandran-component>*!/*/}
                            {/*</div>*/}
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>;
    }
}

export default Coordinates;
