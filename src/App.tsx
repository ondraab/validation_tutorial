import * as React from 'react';
import './App.css';
import './theme-ebi-research.css'
import {NavLink} from "react-router-dom";
import {Parallax, ParallaxLayer} from "react-spring/addons";

interface ValidationStates {
    pdbId: string;
    chains: string[];
    models: string[];
}

class App extends React.Component< {}, ValidationStates> {
    // @ts-ignore
    private parallax: Parallax | null;
    get pdbId(): string {
        return this._pdbId;
    }

    set pdbId(value: string) {
        this._pdbId = value;
    }

    private _pdbId: string;

    // private parallax: any;

    constructor(props : {}) {
        super(props);
        this.state = {pdbId: '1cbs', models: ['1'], chains: ['A']};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._pdbId = '1cbs';
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
                </div>
            </div>
            <div className="page-nav" style={{width: '10px', height: '95%', top: '54px', position: 'fixed', right: '17px', zIndex: 1}}>
                <a className={"active grow"} style={{position: 'absolute', top: 0, right: 0}}
                   onClick={() => this.addClass(0)}>
                    <h2 style={{color: 'white', position: 'absolute', top: 90}}>Introduction</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/4)-9, right: 0}}
                    onClick={() => this.addClass(1)}>
                    <h2 style={{color: 'white', position: 'absolute', top: window.innerHeight/6}}>Review</h2>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/2)-18, right: 0}}
                    onClick={() => this.addClass(2)}>
                </a>
                <a className={"grow"} style={{position: 'absolute', top: (window.innerHeight/4 * 3)-27, right: 0}}
                    onClick={() => this.addClass(3)}>
                </a>

            </div>
            <div>
                <Parallax ref={ref => (this.parallax = ref)} pages={3}>
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
                        style={{
                            backgroundSize: '80%',
                            backgroundPosition: 'center',
                            backgroundImage: url('clients', true)
                        }}
                    />

                    <ParallaxLayer
                        offset={0}
                        speed={0.1}
                       // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%', marginTop:'50px'}}>
                            <div style={{width: '100%', display: 'inline-block'}}>
                            <h2>Introduction</h2>
                                <div className={"text-field-sq"}>
                                    <p style={{fontSize: '140%'}}>
                                        Welcome to this practical about structure validation using publicly available resources.
                                        The emphasis in this practical is on validation of crystal structures of proteins,
                                        but some of the lessons extend to structures determined by other methods,
                                        and to structures of biomacromolecules other than proteins.
                                    </p>
                                    <p style={{fontSize: '140%'}}>
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
                                    <ol style={{fontSize: '140%'}}>
                                        <li>Read papers about protein crystal structures (errr, models) and understand the discussion of the model's quality (and ask relevant questions on this subject after hearing a protein crystallographer give a talk on a particular structure, or after reading a manuscript that you are asked to referee).</li>
                                        <li>Find or generate quality-related information on a given protein model using web-based databases and servers.</li>
                                        <li>Use this information to form a general opinion as to the overall quality of the model, as well as of certain aspects of it (e.g., the extent to which the presence or conformation of a bound ligand is supported by the crystallographic data).</li>
                                        <li>Select the better of a set of related models (assuming there are noticeable differences in the quality of these models), e.g. for purposes of homology modelling, ligand design, mutant design, or molecular replacement calculations.</li>
                                    </ol>
                                </div>
                                <div className={"text-field-sq"}>

                                    <h3>The following are useful links that you may want to explore:</h3>
                                    <ul style={{fontSize: '140%'}}>
                                        <li><a href={"http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html"}>A glossary of terms related to structural quality</a></li>
                                        <li><a href={" http://www.ruppweb.org/Xray/101index.html"}>An introduction to protein crystallography</a></li>
                                        <li><a href={"https://wwpdb.org/validation/validation-reports"}>List of wwPDB documents and resources related to validation and validation reports</a></li>
                                        <li><a href={"https://wwpdb.org/task/validation-task-forces"}>Overview of wwPDB Validation Task Forces (VTFs) and their published recommendations</a></li>
                                        <li>The websites of the wwPDB partners, <a href={"http://pdbe.org"}>PDBe</a>, <a href={"http://pdbj.org"}>PDBj</a> and <a href={"https://rcsb.org"}>RCSB PDB</a></li>
                                        <li><a href={"http://scripts.iucr.org/cgi-bin/paper?S0907444999016364"}>An extensive review of validation in protein crystallography</a></li>
                                    </ul>
                                </div>

                            </div>
                            <div style={{width: '50%', display: 'inline-block'}}>
                                {/*<div style={{width: '50%', display: 'inline-block'}}>*/}
                                    {/*<h4>Useful links</h4>*/}
                                    {/*<ul>*/}
                                        {/*<li>A glossary of terms related to structural quality: <u><a href="http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html">http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html</a></u></li>*/}
                                        {/*<li>An introduction to protein crystallography: <u><a href="http://www.ruppweb.org/Xray/101index.html">http://www.ruppweb.org/Xray/101index.html</a></u></li>*/}
                                        {/*<li>List of wwPDB documents and resources related to validation and validation reports: <u><a href="http://wwpdb.org/validation/validation-reports">https://wwpdb.org/validation/validation-reports</a></u></li>*/}
                                        {/*<li>Overview of wwPDB Validation Task Forces (VTFs) and their published recommendations: <u><a href="http://wwpdb.org/task/validation-task-forces">https://wwpdb.org/task/validation-task-forces</a></u></li>*/}
                                        {/*<li>The websites of the wwPDB partners, PDBe (<u><a href="http://pdbe.org">http://pdbe.org</a></u>), PDBj (<u><a href="http://pdbj.org">http://pdbj.org</a></u>) and RCSB PDB (<u><a href="http://rcsb.org">https://rcsb.org</a></u>)</li>*/}
                                        {/*<li><a href="http://swift.cmbi.ru.nl/gv/pdbreport/">PDBReport</a>, a collection of quality reports, generated by the program WHAT IF, for all models that have been deposited in the PDB, and an&nbsp;<u><a href="http://swift.cmbi.ru.nl/gv/whatcheck/">explanation of the WHAT IF output</a></u></li>*/}
                                        {/*<li>An extensive review of validation in protein crystallography:&nbsp;<u><a href="http://scripts.iucr.org/cgi-bin/paper?S0907444999016364">http://scripts.iucr.org/cgi-bin/paper?S0907444999016364</a></u></li>*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
                            </div>

                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={1}
                        speed={0.1}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '95%'}}>
                            <h2>Before we start, let's review some important facts</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam faucibus mi quis velit. Maecenas sollicitudin. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Integer lacinia. Et harum quidem rerum facilis est et expedita distinctio. Vivamus luctus egestas leo. Aliquam erat volutpat. Aliquam in lorem sit amet leo accumsan lacinia. Phasellus faucibus molestie nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.</p>

                            <p>Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Quisque tincidunt scelerisque libero. Etiam posuere lacus quis dolor. Integer pellentesque quam vel velit. Aenean vel massa quis mauris vehicula lacinia. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Aliquam ornare wisi eu metus. Nam sed tellus id magna elementum tincidunt. Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.</p>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={2}
                        speed={-0}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={url('clients-main')} style={{ width: '40%' }} />
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
