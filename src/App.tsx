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
        this._pdbId = '1cbs'
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



    public render() {
        const url = (name: any, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;

        return <div className="App">
            <div className="main-title masthead">
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
                    <NavLink to="/ligands">
                        <h3>
                            Ligands
                        </h3>
                    </NavLink>
                </div>
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
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
                    </ParallaxLayer>
                    {/*
                       // @ts-ignore */}
                    <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
                        <img src="http://www.ebi.ac.uk/pdbe/sites/ebi.ac.uk.pdbe/files/images/logos/PDBe-logo-RGB_2013.png" style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
                        <img src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png" style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
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
                        onClick={() => this.parallax.scrollTo(1)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '80%'}}>
                            <h2>What is validation and why to validate?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam faucibus mi quis velit. Maecenas sollicitudin. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Integer lacinia. Et harum quidem rerum facilis est et expedita distinctio. Vivamus luctus egestas leo. Aliquam erat volutpat. Aliquam in lorem sit amet leo accumsan lacinia. Phasellus faucibus molestie nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.</p>

                            <p>Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Quisque tincidunt scelerisque libero. Etiam posuere lacus quis dolor. Integer pellentesque quam vel velit. Aenean vel massa quis mauris vehicula lacinia. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Aliquam ornare wisi eu metus. Nam sed tellus id magna elementum tincidunt. Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.</p>
                            <div>
                                <img src="/src/2r4r_multipercentile_validation.svg" style={{width: '50%', display: 'inline-block', verticalAlign: 'top'}}/>
                                <div style={{width: '50%', display: 'inline-block'}}>
                                    <h4>Useful links</h4>
                                    <ul>
                                        <li>A glossary of terms related to structural quality: <u><a href="http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html">http://spdbv.vital-it.ch/TheMolecularLevel/ModQual/index.html</a></u></li>
                                        <li>An introduction to protein crystallography: <u><a href="http://www.ruppweb.org/Xray/101index.html">http://www.ruppweb.org/Xray/101index.html</a></u></li>
                                        <li>List of wwPDB documents and resources related to validation and validation reports: <u><a href="http://wwpdb.org/validation/validation-reports">https://wwpdb.org/validation/validation-reports</a></u></li>
                                        <li>Overview of wwPDB Validation Task Forces (VTFs) and their published recommendations: <u><a href="http://wwpdb.org/task/validation-task-forces">https://wwpdb.org/task/validation-task-forces</a></u></li>
                                        <li>The websites of the wwPDB partners, PDBe (<u><a href="http://pdbe.org">http://pdbe.org</a></u>), PDBj (<u><a href="http://pdbj.org">http://pdbj.org</a></u>) and RCSB PDB (<u><a href="http://rcsb.org">https://rcsb.org</a></u>)</li>
                                        <li><a href="http://swift.cmbi.ru.nl/gv/pdbreport/">PDBReport</a>, a collection of quality reports, generated by the program WHAT IF, for all models that have been deposited in the PDB, and an&nbsp;<u><a href="http://swift.cmbi.ru.nl/gv/whatcheck/">explanation of the WHAT IF output</a></u></li>
                                        <li>An extensive review of validation in protein crystallography:&nbsp;<u><a href="http://scripts.iucr.org/cgi-bin/paper?S0907444999016364">http://scripts.iucr.org/cgi-bin/paper?S0907444999016364</a></u></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={1}
                        speed={0.1}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{width: '60%', margin: '0 auto 0 10%'}}>
                            <h2>Before we start, let's review some important facts</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam faucibus mi quis velit. Maecenas sollicitudin. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Integer lacinia. Et harum quidem rerum facilis est et expedita distinctio. Vivamus luctus egestas leo. Aliquam erat volutpat. Aliquam in lorem sit amet leo accumsan lacinia. Phasellus faucibus molestie nisl. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.</p>

                            <p>Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam erat volutpat. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Quisque tincidunt scelerisque libero. Etiam posuere lacus quis dolor. Integer pellentesque quam vel velit. Aenean vel massa quis mauris vehicula lacinia. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Aliquam ornare wisi eu metus. Nam sed tellus id magna elementum tincidunt. Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.</p>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={2}
                        speed={-0}
                        // @ts-ignore
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        // @ts-ignore
                        onClick={() => this.parallax.scrollTo(0)}>
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
