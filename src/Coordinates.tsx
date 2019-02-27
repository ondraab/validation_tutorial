import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/addons";



// import Expandable from 'react-expandable';
// import CoopComponents from "./CoopComponents";

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
}

class Coordinates extends React.Component< {}, ValidationStates> {
    private parallax: Parallax | null;
    get pdbId(): string {
        return this._pdbId;
    }

    set pdbId(value: string) {
        this._pdbId = value;
    }

    private _pdbId: string;

    constructor(props : {}) {
        super(props);
        this.state = {pdbId: '1cbs', models: ['1'], chains: ['A']};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._pdbId = '1cbs';

        window.addEventListener('scroll', function() {
            console.log('fafas');
        }
        );
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

    public addClass(scrollTo: number) {
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
                    <NavLink to="/ligands">
                        <h3>
                            Ligands
                        </h3>
                    </NavLink>
                </div>
            </div>
            <div className="page-nav" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active"}
                    onClick={() => this.addClass(0)}>
                </a>
                <a
                    onClick={() => this.addClass(1)}>
                </a>
                <a
                    onClick={() => this.addClass(2)}>
                </a>
                <a
                    onClick={() => this.addClass(3)}>
                </a>

            </div>
            <div>
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
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
                        <img src="/src/protein-icon-2887050_640.png" style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <img src={url('earth')} style={{ width: '60%' }} />
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
                            <div style={{display: 'inline-block', width: '70%'}}>
                            <h2>Coordinates and temperature factors</h2>
                                <div className={"text-field"}><p style={{fontSize: '140%'}}>The majority of model-quality criteria are based on the use of the (X,Y,Z) coordinates of the atoms in the model, their nature (e.g., carboxylate oxygen or aromatic carbon), and their identity (e.g., the main-chain nitrogen atom of residue leucine 64). Often these criteria compare properties of the model against expectations based on chemistry, physics, or analysis of a large collection of (protein) structures (such databases are essentially an embodiment of the underlying chemistry and physics, provided they are unbiased and contain only high-quality structures). Here we shall have a look at some of the criteria that are often used in practice.</p></div>
                                <div className={"text-field"} style={{marginLeft: "auto"}}><p style={{fontSize: '140%'}}>The covalent geometry of a model can be assessed by comparing bond lengths and angles to a library of "ideal" values. In the past, every refinement and modelling program had its own set of "ideal" values. This even made it possible to detect (with 95% accuracy) with which program a model had been refined, simply by inspecting its covalent geometry. Nowadays, standard sets of ideal bond lengths and bond angles, derived from an analysis of small-molecule crystal structures, are available for proteins and nucleic acids. </p></div>
                                <div className={"text-field"}><p style={{fontSize: '140%'}}>For bond lengths, the RMS deviation from ideal values is typically quoted. Deviations from ideality of bond angles can be expressed directly as an angular RMS deviation or in terms of angle distances (i.e., the angle ABC is measured by the 1-3 distance |AC|). Nowadays, RMS-Z-values of bond lengths and bond angles are preferred as they are more informative (but these values are not always provided in papers). Other checks in this class include chirality and planarity tests.</p></div>
                                <div className={"text-field"} style={{marginLeft: "auto"}}><p style={{fontSize: '140%'}}><i>Validation potential of geometric tests: poor. Good scores for these criteria prove little. However, if an entire model scores poorly, this should set off warning bells. Also, gross outliers should always be investigated! Modern refinement programs normally produce models with few (if any) outliers.</i></p></div>
                            </div>

                            <div style={{display: 'inline-block', float: 'right', marginTop: '30px'}}>

                                {/*<ramachandran-component pdb-ids='["3d12"]' chains-to-show='["A", "B", "C", "D", "E"]' models-to-show='["1"]' width="550"></ramachandran-component>*/}
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Protein_backbone_PhiPsiOmega_drawing.svg" style={{height: '550px'}}/>
                            </div>

                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={1}
                        speed={0.1}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <div style={{width: '50%', display: 'inline-block', verticalAlign: 'middle'}}>
                            <h2>Chirality</h2>
                                <div className="panel-group" id="accordion" style={{width: "90%"}}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading" style={{width: '8%', display: 'inline-block', padding: '20px 0 21px 10px', borderRadius: '0', borderRight: '1px solid gray'}}>
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', padding: '10px', display: 'inline-block', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseOne">
                                                    Which amino acids contain chiral carbon atoms? Are there any
                                                    amino acids that contain more than one chiral carbon atom? If so, which one(s)?
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <p style={{fontSize: '140%'}}>
                                                    Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam,
                                                    tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem,
                                                    fermentum vitae, sagittis id, malesuada in, quam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2>Ramachandran plot</h2>
                                <div className={"text-field"}>
                                    <p style={{fontSize: '140%'}}>Ramachandran plot is a way to visualize dihedral angles ψ against φ of amino acid residues in protein structure.
                                    Many combinations of angles in a polypeptide chain are forbidden because of steric collisions between atoms.
                                    This two-dimensional plot shows the allowed and disfavored values of ψ and φ: three-quarters of the possible
                                    combinations are excluded simply by local steric clashes. Steric exclusion is the fact that two atoms cannot be in the same
                                    place at the same time is the powerful organizing principle that propels the use of the Ramachandron plot forward.</p>
                                </div>
                                <div className="panel-group" id="accordion" style={{width: "90%", marginTop: '20px'}}>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" style={{width: '8%', display: 'inline-block', padding: '30px 0 30px 10px', borderRadius: '0', borderRight: '1px solid gray'}}>
                                            <h4 className="panel-title" style={{fontSize:'30px'}}>?</h4>
                                        </div>
                                        <div className="panel-heading" style={{width: '92%', padding: '10px', display: 'inline-block', verticalAlign: 'bottom'}}>
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseTwo">
                                                    The three most-densely populated areas in the Ramachandran plot are
                                                    called the alpha, the beta, and the left-handed helical region. Where
                                                    are these three regions located approximately in the Ramachandran plot?
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <p style={{fontSize: '140%'}}>
                                                    Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam,
                                                    tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem,
                                                    fermentum vitae, sagittis id, malesuada in, quam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '50%', display: 'inline-block', marginTop: '90px'}}>
                                <div className="panel-group" id="accordion" style={{width: "90%", marginTop: '20px'}}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseThree">
                                                    Why do glycine residues have an atypical distribution? And proline residues?
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThree" className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <p style={{fontSize: '140%'}}>
                                                    Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam,
                                                    tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem,
                                                    fermentum vitae, sagittis id, malesuada in, quam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-group" id="accordion" style={{width: "90%", marginTop: '20px'}}>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a className="accordion-toggle" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapseFour">
                                                    Which regions would you expect to be most favourable in the
                                                    Ramachandran plot of a protein that consists entirely of D-amino acids?
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseFour" className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <p style={{fontSize: '140%'}}>
                                                    Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam,
                                                    tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem,
                                                    fermentum vitae, sagittis id, malesuada in, quam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
