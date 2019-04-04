import * as React from "react";
import Litemol from "./Litemol";
import Carousel from "nuka-carousel";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

interface DynComponentStates {
    pdbIdField: string;
    chainsField: string;
    modelsField: string;
    checkBoxes: any;
    checkedItems: Map<any, any>;
    ramaComponent: JSX.Element;
    litemolComponent: JSX.Element;
    pdbId: string;
    ligandDrugbank: JSX.Element;
    bindingSiteTable: JSX.Element;
}
interface DynComponentProps {
    pdbId: string;
    chains: string;
    models: any;
}


class DynComponent extends React.Component<DynComponentProps, DynComponentStates> {
    get drugBankData(): any {
        return this._drugBankData;
    }

    set drugBankData(value: any) {
        this._drugBankData = value;
    }
    get modelsField(): string {
        return this._modelsField;
    }

    set modelsField(value: string) {
        this._modelsField = value;
    }
    get chainsField(): string {
        return this._chainsField;
    }

    set chainsField(value: string) {
        this._chainsField = value;
    }
    get pdbIdField(): string {
        return this._pdbIdField;
    }

    set pdbIdField(value: string) {
        this._pdbIdField = value;
    }
    private _pdbIdField: string;
    private _chainsField: string;
    private _modelsField: string;
    private _drugBankData: any;
    constructor(props: DynComponentProps) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        let chItems: any[][] = [['1', true]];
        for (let i = 2; i <= props.models.length; i++) {
            chItems.push([i.toString(), false]);
        }

        this.drugBankData = DynComponent.getDrugbankData(props.pdbId);
        // DynComponent.getDrugbankData(props.pdbId);
        // @ts-ignore
        this.state = {
            pdbIdField: `["${props.pdbId}"]`,
            chainsField: props.chains,
            modelsField: `["${props.models}"]`,
            pdbId: props.pdbId,
            //@ts-ignore
            checkedItems: new Map(chItems),
            //@ts-ignore
            ramaComponent: <ramachandran-component pdb-ids={`["${props.pdbId}"]`} chains-to-show={`${props.chains}`} models-to-show='["1"]' width="550" id="ramachandran-component"/>,
            litemolComponent: <Litemol pdbId={props.pdbId}/>,
            ligandDrugbank: <div/>,
            bindingSiteTable: <div/>};
    }

    static getDrugbankData(pdbId: string) {
        let commonLigands: any[] = [];
        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/drugbank/${pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                const ligandsInBank = data[pdbId];
                fetch(`https://proxy-helper.herokuapp.com/`, {headers: {
                    "target-url": `https://webchem.ncbr.muni.cz/Platform/ValidatorDb/SearchData?structures=${pdbId}`
                    }})
                    .then((response: any) => response.json())
                    .then((data: any) => {
                        data['Models'].forEach((ligand: any) => {
                            ligandsInBank.forEach((inBank: any) => {
                                if (ligand['ModelName'] == Object.keys(inBank)[0]) {
                                    let comLig = ligand;
                                    comLig.drugbankId = inBank[ligand['ModelName']]['drugbank_id'];
                                    comLig.targets = inBank[ligand['ModelName']]['targets'];
                                    commonLigands.push((comLig));
                                }
                            })
                        });
                        return commonLigands;
                    })
            })

    }

    componentDidMount(): void {
        let self = this;
        //@ts-ignore
        let commonLigands: any[] = [];

        function cellFormatter(cell: any, row: any) {
            return (<div><b><a target="_blank" rel="noopener noreferrer" href={`https://www.drugbank.ca/drugs/${cell}`}>{cell}</a></b></div>);
        }

        function lineColor(row: any) {
            switch (row.outliersType.length) {
                case 0:
                    return 'td-column-green';
                case 1:
                    return 'td-column-yellow';
                case 2:
                    return 'td-column-orange';
                default:
                    return 'td-column-red';
            }
        }

        function expandComponent(row: any) {
            return(
                <BootstrapTable data={row.residues} trClassName={lineColor}>
                    <TableHeaderColumn isKey dataField={'authorResNum'}>Author residue name</TableHeaderColumn>
                    <TableHeaderColumn dataField={'chemCompId'}>Chem comp ID</TableHeaderColumn>
                    <TableHeaderColumn dataField={'outliersType'}>Outlier types</TableHeaderColumn>
                    <TableHeaderColumn dataField={'resNum'}>Residue number</TableHeaderColumn>
                </BootstrapTable>
            )
        }

        let bindingSites: any[] = [];
        let editedSites: any[] = [];
        let siteResidues: any[] = [];
        let residues: any[] = [];
        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/drugbank/${self.state.pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                const ligandsInBank = data[self.state.pdbId];
                fetch(`https://proxy-helper.herokuapp.com/`, {headers: {
                        "target-url": `https://webchem.ncbr.muni.cz/Platform/ValidatorDb/SearchData?structures=${self.state.pdbId}`
                    }})
                    .then((response: any) => response.json())
                    .then((data: any) => {
                        data['Models'].forEach((ligand: any) => {
                            ligandsInBank.forEach((inBank: any) => {
                                if (ligand['ModelName'] == Object.keys(inBank)[0]) {
                                    // let comLig = ligand;
                                    // comLig.drugbankId = inBank[ligand['ModelName']]['drugbank_id'];
                                    // comLig.targets = inBank[ligand['ModelName']]['targets'];
                                    commonLigands.push({
                                        'ModelName': ligand['ModelName'],
                                        'drugbankId': inBank[ligand['ModelName']]['drugbank_id'],
                                        'targets': inBank[ligand['ModelName']]['targets'],
                                        'Entries': ligand['Entries'].length,
                                        'MainResidue': ligand['Entries'][0]['MainResidue'],
                                        'MissingAtoms': ligand['Summary']['Missing_Atoms'],
                                        'MissingRings': ligand['Summary']['Missing_Rings'],
                                        'BadChirality': ligand['Summary']['HasAll_BadChirality'],
                                        'Substitutions': ligand['Summary']['HasAll_Substitutions'],
                                        'NameMismatch': ligand['Summary']['HasAll_NameMismatch']
                                    })
                                }
                            })
                        });

                        self.setState({
                            ligandDrugbank: <div>
                                <BootstrapTable data={commonLigands} tableStyle={{fontSize: 'smaller'}}>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='8%' isKey dataField={'ModelName'}>Name</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='11%' dataField={'Entries'}>Number of molecules</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='10%' dataField={'drugbankId'} dataFormat={cellFormatter}>Drugbank ID</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} dataField={'MainResidue'}>Main residue</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='10%' dataField={'MissingAtoms'}>Missing atoms</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='10%' dataField={'MissingRings'}>Missing rings</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='10%' dataField={'BadChirality'}>Bad chirality</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='12%' dataField={'Substitutions'}>Substituion</TableHeaderColumn>
                                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='11%' dataField={'NameMismatch'}>Name mismatch</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        })
                    })
            });

        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/binding_sites/${self.state.pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                bindingSites = data[self.state.pdbId];
                fetch(`https://www.ebi.ac.uk/pdbe/api/validation/residuewise_outlier_summary/entry/${self.state.pdbId}`)
                    .then((response: any) => response.json())
                    .then((data: any) => {
                        bindingSites.forEach((bindingSite: any) => {
                            bindingSite['site_residues'].forEach((residue: any) => {
                                if (residues.length == 0) {
                                    let chain = residue['chain_id'];
                                    let molecules = data[self.state.pdbId]['molecules'];
                                    molecules.forEach((molecule: any) => {
                                        molecule['chains'].forEach((currChain: any) => {
                                            if (currChain['chain_id'] == chain) {
                                                currChain['models'].forEach((model: any) => {
                                                    residues = model['residues'];
                                                })
                                            }
                                        })
                                    });
                                }
                                let finded: any = residues.find(obj => obj.author_residue_number == residue.author_residue_number);
                                typeof finded != 'undefined' ? console.log(finded.outlier_types) : '';
                                siteResidues.push({
                                    authorResNum: residue.author_residue_number,
                                    resNum: residue.residue_number,
                                    chemCompId: residue.chem_comp_id,
                                    outliersType: typeof finded != 'undefined' ? finded.outlier_types : [],
                                })
                            });
                            editedSites.push({
                                details: bindingSite['details'].toLowerCase(),
                                siteId: bindingSite['site_id'],
                                residues: siteResidues});
                            residues = [];
                            siteResidues = [];
                        });
                        self.setState({
                            bindingSiteTable: <div>
                                <BootstrapTable data={editedSites} expandableRow={(row: any) => true} expandComponent={expandComponent}>
                                    <TableHeaderColumn isKey dataField={'siteId'} tdStyle={{cursor: 'pointer'}}>Site ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField={'details'} tdStyle={{cursor: 'pointer'}}>Details</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        })
                    })
            })
    }

    private handleCheckboxChange(event: any) {
        const item = event.target.name;
        const isChecked = event.target.checked;
        //@ts-ignore
        this.setState((prevState: Map<number, boolean>) => ({
            //@ts-ignore
            checkedItems: prevState.checkedItems.set(item, isChecked),
            //@ts-ignore
            ramaComponent: <ramachandran-component pdb-ids={this.state.pdbIdField} chains-to-show={this.state.chainsField} models-to-show={`[${([].concat.apply([], [...prevState.checkedItems].filter(([k, v]) => {return v==true}))).filter((k: any)=> {
                return typeof k != "boolean"
            })}]`} width="540"/>
        }));
    }

    public render() {
        // @ts-ignore
        const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
            <input type={type} name={name} checked={checked} onChange={onChange} style={{verticalAlign: 'middle', marginLeft: '4px'}}/>
        );

        // const columns = [{
        //     dataField: 'id',
        //     text: 'Product ID'
        // }, {
        //     dataField: 'name',
        //     text: 'Product Name'
        // }, {
        //     dataField: 'price',
        //     text: 'Product Price'
        // }];

        // const data: any[] = [];


        let checkBoxes = (
            <div>
                {

                    this.props.models.map((item: any) => {
                        return <label key={item.toString()}>
                            {item}
                            {/*
                            // @ts-ignore */}
                            <Checkbox name={item.toString()} checked={this.state.checkedItems.get(item.toString())} onChange={this.handleCheckboxChange}>{item}</Checkbox>
                        </label>})
                }
            </div>);

        return (
            <div id={"dynamic-comp-container"}>
                <Carousel style={{position: 'absolute', top: '54px'}} dragging={false}>
                    <div style={{margin: '10px'}}>{this.props.models.length > 1 ? checkBoxes: null}
                        <div style={{width: '42%', display: 'inline-block', marginTop: '25px'}} id={"rama-parent-container"}>

                            {this.state.ramaComponent}
                            {/*
                        // @ts-ignore */}
                            {/*<ramachandran-component pdb-ids={this.state.pdbIdField} chains-to-show={this.state.chainsField} models-to-show={this.state.modelsField} width="550" id='ramachandran-component'/>*/}
                        </div>
                        <div style={{width: '57%', display: 'inline-block', position: 'relative', float: 'right', height: '780px', marginTop: '5px', marginRight: '10px'}}>
                            {this.state.litemolComponent}
                        </div>
                    </div>
                    <div style={{margin: '15px'}}>
                        <h3>Ligand/Drugbank</h3>
                        <div style={{width: '65%'}}>
                            {this.state.ligandDrugbank}
                        </div>
                    </div>
                    <div style={{margin: '15px'}}>
                        {this.state.bindingSiteTable};
                    </div>
                    <div></div>
                </Carousel>
            </div>
        );
    }
}

export default DynComponent;