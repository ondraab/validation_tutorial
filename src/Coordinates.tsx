import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
// @ts-ignore
import ImageZoom from 'react-medium-image-zoom'
import * as $ from "jquery";
import ReactTooltip from 'react-tooltip';

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
}

class Coordinates extends React.Component< {}, ValidationStates> {
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
        if (currPos >= 1 && currPos <=2.5) {
            if (!this.displayed) {
                $('#rama-view-container').append("<ramachandran-component pdb-ids='[\"1cbs\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-1'/>");
                this.displayed = true;
            }
        } else {
            this.displayed = false;
            $('#ramachandran-component-1').remove();
        }

        if (currPos > 2.5 && currPos < 3.19) {
            if (!this.displayed2) {
                $('#ramachandran-2').append("<ramachandran-component pdb-ids='[\"1tqn\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-2'/>");
                this.displayed2 = true;
            }
        } else {
            this.displayed2 = false;
            $('#ramachandran-component-2').remove();
        }

        if (currPos > 3.2) {
            if (!this._displayed3) {
                $('#ramachandran-3').append("<ramachandran-component pdb-ids='[\"1tqn\"]' chains-to-show='[\"A\"]' models-to-show='[\"1\"]' width=\"550\" id='ramachandran-component-3'/>");
                this.displayed3 = true;
            }
        } else {
            this._displayed3 = false;
            $('#ramachandran-component-3').remove();
        }
    }

    public render() {
        const url = (name: any, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;

        // @ts-ignore
        return <div className="CoordinateApp">
            <ReactTooltip />
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
            <div className="page-nav long-5" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active grow"} style={{position: 'absolute', top: 0, right: 0}}
                   onClick={() => this.addClass(0)}>
                    <h2 style={{color: 'white'}}>Introduction</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/5)-7.5, right: 0}}
                   onClick={() => this.addClass(1)}>
                    <h2 style={{color: 'white'}}>Review I</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/5*2)-14.5, right: 0}}
                   onClick={() => this.addClass(2)}>
                    <h2 style={{color: 'white'}}>Review II</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/5 * 3)-21.5, right: 0}}
                   onClick={() => this.addClass(3)}>
                    <h2 style={{color: 'white'}}>Outliers</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/5 * 4)-28.5, right: 0}}
                   onClick={() => this.addClass(4)}>
                    <h2 style={{color: 'white'}}>Ramachandran principle</h2>
                </a>

            </div>
            <div id={"main-content"} onScroll={this.listenScrollEvent.bind(this)}>
                <Parallax ref={ref => (this.parallax = ref)} pages={5}>
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
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={4} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />

                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={2}
                        speed={-0.3}
                    />
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={0} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                            <li>If you have forgotten what &phi; and &psi; are, look <b><a href={"http://employees.csbsju.edu/hjakubowski/classes/ch331/protstructure/phipsi.gif"}>here</a></b> or <b><a href={"http://www.msg.ucsf.edu/local/programs/garlic/commands/phipsi.gif"}>here</a></b></li>
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

                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Chirality</h2>
                            <div style={{display: 'flex'}}>
                                <div className="panel-group-sq" id="accordion" style={{width: "49.5%", display: 'inline-flex', marginRight: 'auto'}}>
                                    <div className="text-field-sq">
                                        <div className="panel-heading" style={{width: '8%', display: 'table-cell', verticalAlign: 'middle', borderRight: '1px solid gray'}}>
                                            <h4 data-tip="hello world" className="panel-title hint--bottom-right hint--large" style={{fontSize:'30px'}}
                                            aria-label={"All amino acids but glycine have at least one chiral center at C\u03B1. Aminoacids" +
                                            "with with more than one chiral center are Isoleucine and Threonine."}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion">
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
                                            <h4 className="panel-title hint--bottom-right hint--large" style={{fontSize:'30px'}}
                                            aria-label={"U - Selenocysteine (Seq), O - Pyrrolysine (Pyl), for actual answer about the number of entries, try use PDBe service."}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion">
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
                                            <h4 className="panel-title hint--bottom-right hint--large" style={{fontSize:'30px'}}
                                                aria-label={""}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion">
                                                    Do you expect the C&beta; atom of a tyrosine residue to lie in the same plane as the aromatic ring?
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
                                                   data-parent="#accordion">
                                                    Using your favourite graphics program or web-based 3D viewer, have a look at residue TRP D67 in PDB entry 7GPB. Does anything strike you as odd?
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"text-field-sq"}>
                                <div style={{display: 'flex'}}>
                                    <div style={{display: 'inline-flex', width: '80%', marginRight: 'auto'}}>
                                        <div style={{display: 'block'}}>
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
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p style={{fontSize: '140%'}}><i>
                                    Validation potential of omega: poor.
                                </i></p>
                            </div>
                        </div>
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2} speed={0.1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <div className={"text-field-sq"} style={{width: '55%', top: '80px'}}>
                                <p style={{fontSize: '140%'}}>
                                    The &phi; and &psi; torsion angles, on the other hand, are much less restricted, but it has been known for a long time that, due to steric hindrance, there are several clearly preferred combinations of &phi;, &psi; values (a scatter plot of &phi;, &psi; values for all residues in a protein model is called a Ramachandran plot). This is true even for proline and glycine residues, although their distributions are atypical. Also, the overwhelming majority of residues that are not in regular secondary structure elements are found to have favourable &phi;, &psi; torsion-angle combinations. For these reasons, the Ramachandran plot is an extremely simple, useful and sensitive indicator of model quality. Residues that have unusual &phi;, &psi; torsion-angle combinations should be scrutinised by the crystallographer. If they have convincing electron density, there is probably a good structural or functional reason for the protein to tolerate the energetic strain that is associated with the unusual conformation. The quality of a model's Ramachandran plot is most convincingly illustrated with a figure. Alternatively, the fraction of residues in certain predefined areas of the plot (e.g., core regions) can be quoted, but in that case it is important to indicate which definition of such areas was used.
                                </p>
                                <p style={{fontSize: '140%'}}>
                                    If you are interested in finding out which specific steric clashes put restrictions on &phi; and/or &psi;, read the 2003 paper by Ho et al. They found that O<sub>(i-1)</sub>...C&beta;<sub>(i)</sub> restricts &phi; of residue i, C&beta;<sub>(i)</sub>...O<sub>(i)</sub> and C&beta;<sub>(i)</sub>...N<sub>(i+1)</sub> restrict &psi;, and O<sub>(i-1)</sub>...O<sub>(i)</sub> and O<sub>(i-1)</sub>...N<sub>(i+1)</sub> restrict both &phi; and &psi;.
                                </p>
                                <p style={{fontSize: '140%', borderTop: 'black solid 1px'}}><i>
                                    Validation potential of &phi;, &psi; combinations: excellent. A quick look at the Ramachandran plot will tell you a lot about the quality of a model. Good models have most residues tightly clustered in the most-favoured regions with relatively few outliers. Good, but low-resolution models may have less pronounced clustering, but will still have few outliers. Models that show poor clustering and many outliers are bound to be poor.
                                </i></p>
                            </div>
                            <div style={{width: '55%'}}>
                                <div className="text-field-sq">
                                    <div className="panel-heading" style={{width: '8%', display: 'table-cell', verticalAlign: 'middle', borderRight: '1px solid gray'}}>
                                        <h4 data-tip="hello world" className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                    </div>
                                    <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                        <h4 className="panel-title">
                                            <a className="accordion-toggle" data-toggle="collapse"
                                               data-parent="#accordion">
                                                The three most-densely populated areas in the Ramachandran plot are called the alpha, the beta, and the left-handed helical region. Where are these three regions located approximately in the Ramachandran plot?
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                                {/*<div className="text-field-sq">*/}
                                    {/*<div className="panel-heading" style={{width: '8%', display: 'table-cell', borderRight: '1px solid gray'}}>*/}
                                        {/*<h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>*/}
                                    {/*</div>*/}
                                    {/*<div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>*/}
                                        {/*<h4 className="panel-title">*/}
                                            {/*<a className="accordion-toggle" data-toggle="collapse"*/}
                                               {/*data-parent="#accordion">*/}
                                                {/*Why do glycine residues have an atypical distribution? And proline residues?*/}
                                            {/*</a>*/}
                                        {/*</h4>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                <div className="text-field-sq">
                                    <div className="panel-heading" style={{width: '8%', display: 'table-cell', borderRight: '1px solid gray'}}>
                                        <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                    </div>
                                    <div className="panel-heading" style={{width: '92%', display: 'table-cell', verticalAlign: 'bottom'}}>
                                        <h4 className="panel-title">
                                            <a className="accordion-toggle" data-toggle="collapse"
                                               data-parent="#accordion">
                                                Which regions would you expect to be most favourable in the Ramachandran plot of a protein that consists entirely of D-amino acids?
                                            </a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '39.5%', display: 'inline-block', position: 'absolute', right: '0', top: '80px'}} id={"rama-view-container"}>
                            {/*
                                // @ts-ignore */}
                                {/*<ramachandran-component pdb-ids='["1cbs"]' chains-to-show='["A"]' models-to-show='["1"]' width="550" ></ramachandran-component>*/}
                            </div>
                        </div>
                    </ParallaxLayer>

                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={3} speed={-0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <div style={{display: 'flex'}}>
                                <div className="text-field-sq" style={{display: 'flex', width: '60%'}}>
                                        <div style={{display: 'block'}}>
                                            <p style={{fontSize: '140%'}}>Contours for Ramachandran plot was computed using database Top8000. A residue is marked as Ramachandran outlier, when the dihedral angle is improbable or rare. But that does not mean, that it can't exist. </p>
                                            <p style={{fontSize: '140%'}}>Ramachandran outliers are common in proteins, and many are likely to simply be errors in the structure. However, some of these outliers will be supported by the structural data and may exist in energetically strained conformations.</p>
                                        </div>
                                </div>
                                <div style={{width: "39.5%", display: 'inline-flex', position: 'absolute', right: '0',top: '80px'}} id={"ramachandran-2"}>

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
                                                    <p style={{fontSize: '140%'}}>The Ramachandran Principle says that alpha helices, beta strands, and turns are the most likely conformations for a polypeptide chain to adopt, because most other conformations are impossible due to steric collisions <b>(clashes)</b> between atoms.</p>
                                                    <p style={{fontSize: '140%'}}>Peptide bonds have a double bonded character. This prevents them from rotating. They have this charachter because they resonate with the adjacent oxygen double bond. As a result of their inability to rotate each peptide bond holds six atoms in a plane.</p>
                                                    <p style={{fontSize: '140%'}}>Actually most &phi; or &psi; angles are impossible due to clashes between atoms. Atoms in the ball and stick model are much smaller than the true sizes.</p>
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
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div className="text-field-sq" style={{display: 'flex'}}>
                                            <div style={{display: 'inline-flex', marginRight: 'auto', width: '87%'}}>
                                                <div style={{display: 'block'}}>
                                                    <p style={{fontSize: '140%'}}>Here are the actual sizes of the atoms in our model. These are the so-called Vander Waals radii.</p>
                                                    <p style={{fontSize: '140%'}}>Here, the &psi; angle is fixed at 165° and we are rotating the &phi; angle a full through 360°. As the atoms get close to each other and begin to overlap, which would be physically impossible, but is allowed in this model, they clash with each other. These clashes are shown as yellow and red objects that appear and disappear during  rotation.</p>
                                                    <p style={{fontSize: '140%'}}>Wherever the clashes appear, that angle of &phi; would be impossible when &psi; is 165°. Compare it with the Ramachandran plot. As you can see at the animation, there is only one region, that has no clashes. You can find the region on the Ramachandran plot.</p>
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

                                                    />
                                                </div>
                                            </div>
                                            <div style={{display: 'inline-flex', marginRight: 'auto', width: '75%'}}>
                                                <div style={{display: 'block'}}>
                                                    <p style={{fontSize: '140%'}}>At the left animation we are rotating &psi;. &phi; angle is fixed at -80°. You can detect two regions with no clashes. You can try again identify the region on Ramachandran plot.</p>
                                                    <p style={{fontSize: '140%'}}>At the right animation the &phi; angle is fixed at 0°. This angle <b>does not </b>occur in real proteins. As you can see, when the &psi; rotates, there are clashes at all &psi; angles. This means, that &phi; of 0° is physically impossible.</p>
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

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "39.5%", display: 'inline-flex', position: 'absolute', right: '0',top: '80px'}} id={"ramachandran-3"}>

                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>;
    }
}

export default Coordinates;