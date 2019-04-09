import * as React from "react";
import Litemol from "./Litemol";
import Carousel from "nuka-carousel";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as Modal from "react-modal";
// @ts-ignore
import ImageZoom from 'react-medium-image-zoom'

interface DynComponentStates {
    pdbIdField: string;
    chainsField: string;
    modelsField: string;
    checkBoxes: any;
    checkedItems: Map<any, any>;
    checkedChainItems: Map<any, any>;
    ramaComponent: JSX.Element;
    litemolComponent: JSX.Element;
    pdbId: string;
    ligandDrugbank: JSX.Element;
    bindingSiteTable: JSX.Element;
    summaryInfo: JSX.Element;
    completnes: JSX.Element;
    modalShown: boolean;
    perResidQuelity: JSX.Element;
    perResidQuelityDetail: JSX.Element;
    showStatsModal: boolean;
}
interface DynComponentProps {
    pdbId: string;
    chains: any;
    models: any;
}


class DynComponent extends React.Component<DynComponentProps, DynComponentStates> {
    get drugBankData(): any {
        return this._drugBankData;
    }

    set drugBankData(value: any) {
        this._drugBankData = value;
    }
    get pdbIdField(): string {
        return this._pdbIdField;
    }

    set pdbIdField(value: string) {
        this._pdbIdField = value;
    }
    private _pdbIdField: string;
    private _drugBankData: any;
    constructor(props: DynComponentProps) {
        super(props);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChainCheckboxChange = this.handleChainCheckboxChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.openModalStats = this.openModalStats.bind(this);
        let chItems: any[][] = [['1', true]];
        for (let i = 2; i <= props.models.length; i++) {
            chItems.push([i.toString(), false]);
        }

        let chainCheckedItems: any[][] = [];
        this.props.chains.forEach((chain: any) => {
            chainCheckedItems.push([chain, true])
        });


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
            ramaComponent: <ramachandran-component pdb-ids={`["${props.pdbId}"]`} chains-to-show={'["' + this.props.chains.join('","') + '"]'} models-to-show='["1"]' width="550" id="ramachandran-component"/>,
            //@ts-ignore
            checkedChainItems: new Map<any, any>(chainCheckedItems),
            litemolComponent: <Litemol pdbId={props.pdbId}/>,
            modalShown: false,
            showStatsModal: false,
            ligandDrugbank: <div/>,
            bindingSiteTable: <div/>,
            summaryInfo: <div/>,
            perResidQuelity: <div/>,
            perResidQuelityDetail: <div/>,
            completnes: <div/>};
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

    public showModal() {
        this.setState({modalShown: true})
    }

    public closeModal() {
        this.setState({modalShown: false, showStatsModal: false})
    }

    public openModalStats() {
        this.setState({showStatsModal: true})
    }

    componentDidMount(): void {
        Modal.setAppElement('body');
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

        function colorTableLine(row: any, rowIdx: number) {
            return rowIdx % 2 === 0 ? 'tr-column-white' : 'tr-column-gray';
        }

        function dataColorTextYellow(cell: any, row: any) {
            return cell == 0 ? (<div style={{color: '#3CA53A'}}>{cell}</div>) : (<div style={{color: '#D6BD42'}}>{cell}</div>);
        }

        function dataColorTextRed(cell: any, row: any) {
            return cell == 0 ? (<div style={{color: '#3CA53A'}}>{cell}</div>) : (<div style={{color: '#DD191D'}}>{cell}</div>);

        }

        //@ts-ignore
        function computeNumberOfSq(residues: any) {
            let elements: any[] = [];
            let className: string = '';
            let width = 100/residues.length;
            residues.forEach((residue: any) => {
                switch (residue.outliersType.length) {
                    case 0:
                        className = 'green-res';
                        break;
                    case 1:
                        className = 'yellow-res';
                        break;
                    case 2:
                        className = 'orange-res';
                        break;
                    default:
                        className = 'red-res'
                }
                elements.push(<div
                    className={`${className} hint--left hint--small color-square`}
                    style={{display: 'inline-block', width: `${width}%`, height: '12px'}}
                    aria-label={`${residue.chemCompId} ${residue.authorResNum} ${residue.chain}`}
                />)
            });
            return elements
        }

        function imageFormatter(cell: any, row: any){
            return  (<div >{cell}
                        <div style={{
                            width: '10%',
                            display: 'inline-block',
                            height: '12px',
                            float: 'right'}}>
                            {computeNumberOfSq(row.residues)}
                        </div>
                    </div>);
        }

        function formatResNumName(cell: any, row: any) {
            return (<div>{row.chemCompId} {row.authorResNum} {row.chain}</div>)
        }

        function expandComponent(row: any) {
            return(
                <div style={{transition: 'height 0.5s'}}>
                    <BootstrapTable data={row.residues} trClassName={lineColor}>
                        <TableHeaderColumn isKey dataField={'authorResNum'} dataFormat={formatResNumName} width={'20%'}>Residue identifier</TableHeaderColumn>
                        <TableHeaderColumn dataField={'outliersType'}>Outlier types</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }

        let chainsArray: any[] = [],
            modelArray: any[] = [],
            moleculesDict: {} = {},
            mols: any = [],
            rsrz: {} = {},
            // @ts-ignore
            clashes: number = 0,
            // @ts-ignore
            sidechainOutl: number = 0,
            // @ts-ignore
            ramaOutl: number = 0,
            rsrzCount: number = 0,
            outlDict: {} = {},
            outliers: any[] = [],
            chainLen: {} = {},
            molecs: {} = {},
            total = 0;

        function translateResName(resName: string) {
            switch (resName) {
                case 'ALA':
                    return 'A';
                case 'ARG':
                    return'R';
                case 'ASN':
                    return'N';
                case 'ASP':
                    return'D';
                case 'CYS':
                    return'C';
                case 'GLN':
                    return'Q';
                case 'GLU':
                    return'E';
                case 'GLY':
                    return'G';
                case 'HIS':
                    return'H';
                case 'ILE':
                    return'I';
                case 'LEU':
                    return'L';
                case 'LYS':
                    return'K';
                case 'MET':
                    return'M';
                case 'PHE':
                    return'F';
                case 'PRO':
                    return'P';
                case 'SER':
                    return'S';
                case 'THR':
                    return'T';
                case 'TRP':
                    return'W';
                case 'TYR':
                    return'Y';
                case 'VAL':
                    return'V';
                default:
                    return '';
            }
        }

        function coputeStatsForChains() {
            let chainStats: any[] = [];
            let oneChain: {} = {};
            //@ts-ignore
            Object.entries(moleculesDict).forEach((arr: any) => {
                arr[1].chains.forEach((chain: any) => {
                    oneChain = {};
                    chain.models.forEach((model: any) => {
                        oneChain[model.model_id] = model.residuesDict;
                        oneChain['chainId'] = chain.chain_id;
                        oneChain['length'] = molecs[arr[0]][chain.chain_id];
                    });
                    chainStats.push(oneChain);
                })
            });

            let tmpElement: any[] = [];
            let result: any[] = [];
            let onCh: any[] = [];
            let modelStats: {
                rsrz:                 number,
                sidechainOutliers:    number,
                ramachandranOutliers: number,
                bondLengths:          number,
                clashes:              number} = {rsrz: 0,
                                                 sidechainOutliers: 0,
                                                 ramachandranOutliers: 0,
                                                 bondLengths: 0, clashes: 0};
            chainStats.forEach((chain: any) => {
                onCh.push(<h5>Chain ID: {chain.chainId}</h5>);
                // @ts-ignore
                Object.entries(chain).forEach((ch: any) => {
                    if (typeof ch[1] == "object") {
                        // @ts-ignore
                        Object.entries(ch[1]).forEach((resid: any) => {
                            let className = '';
                            let rsrz: boolean = false;
                            if (typeof resid[1].outlierTypes == 'undefined') {
                                className = 'aa-green';
                            } else {
                                if (resid[1].outlierTypes.includes('RSRZ')) {
                                    modelStats.rsrz++;
                                    rsrz = true;
                                }
                                if (resid[1].outlierTypes.includes('ramachandran_outliers'))
                                    modelStats.ramachandranOutliers++;
                                if (resid[1].outlierTypes.includes('clashes'))
                                    modelStats.clashes++;
                                if (resid[1].outlierTypes.includes('sidechain_outliers'))
                                    modelStats.sidechainOutliers++;
                                if (resid[1].outlierTypes.includes('bond_lengths'))
                                    modelStats.bondLengths++;
                                switch (resid[1].outlierTypes.length) {
                                    case 1:
                                        className = 'aa-yellow';
                                        break;
                                    case 2:
                                        className = 'aa-orange';
                                        break;
                                    default:
                                        className = 'aa-red';
                                }
                            }
                            if (rsrz) {
                                className = `${className}-rsrz`
                            }
                            tmpElement.push(
                                <div
                                    className={`hint--top`}
                                    aria-label={`${resid[1].residueName} ${resid[1].authorResNum} ${typeof resid[1].outlierTypes != 'undefined' ? resid[1].outlierTypes : ''}`}>
                                    <div className={`aa-rotate-div ${className}`}
                                        style={{display: 'inline-block'}}>
                                        {translateResName(resid[1].residueName)}{resid[1].authorResNum}
                                    </div>
                                </div>);
                        });
                        onCh.push(<div className={"statistic-line"}>
                            <h6>Model: {ch[0]} </h6>
                            <div>Clashes: {modelStats.clashes} </div>
                            <div>Sidechain outliers: {modelStats.sidechainOutliers} </div>
                            <div>Ramachandran outliers: {modelStats.ramachandranOutliers} </div>
                            <div>Bond lengths: {modelStats.bondLengths} </div>
                            <div>RSRZ: {modelStats.rsrz}</div></div>);
                    }
                    onCh.push(tmpElement);
                    tmpElement = [];
                    modelStats = {rsrz: 0, sidechainOutliers: 0, ramachandranOutliers: 0, bondLengths: 0, clashes: 0};
                });
                result.push(onCh);
                onCh = [];
            });
            return (<div id={"perChainsStats"}>{result}</div>)
        }

        function parse(molecules: any){
            let residuesDict: {[id: number]: any};
            let chainsDict: {[id: string]: any};
            let modelsDict: {[id: number]: any};
            for (const mol of molecules.molecules) {
                let chains = [];
                chainsDict = {};
                for (const chain of mol.chains) {
                    let models = [];
                    modelsDict = {};
                    for (const mod of chain.models) {
                        residuesDict = {};
                        if (chainsArray.indexOf(chain.chain_id) === -1) {
                            chainsArray.push(chain.chain_id);
                        }
                        if (modelArray.indexOf(mod.model_id) === -1) {
                            modelArray.push(mod.model_id);
                        }
                        let residues: any[] = [];
                        for (const resid of mod.residues) {
                            const residue = {residueName: resid.residue_name, resNum: resid.residue_number,
                                authorResNum: resid.author_residue_number};
                            if (resid.rama == 'OUTLIER') {
                                outliers.push(residue);
                            }
                            residuesDict[residue.authorResNum] = residue;
                            residues.push(residue);
                        }
                        mod.residuesDict = residuesDict;
                        modelsDict[mod.model_id] = mod;
                        models.push({modelId: mod.model_id, residues: residues, residuesDict: residuesDict})
                    }
                    models.sort((a: any, b: any) => {
                        if (a.modelId < b.modelId)
                            return -1;
                        if (a.modelId > b.modelId)
                            return 1;
                        return 0;
                    });
                    chain.modelsDict = modelsDict;
                    chainsDict[chain.chain_id] = chain;
                    chains.push({chainId: chain.chain_id, models: models});
                }
                chains.sort((a: any, b: any) => {
                    if (a.chainId < b.chainId)
                        return -1;
                    if (a.chainId > b.chainId)
                        return 1;
                    return 0;
                });
                mol.chainsDict = chainsDict;
                moleculesDict[mol.entity_id] = mol;
                mols.push({entityId: mol.entity_id, chains: chains})
            }
            mols.sort((a: any, b: any) => {
                if (a.entityId < b.entityId)
                    return -1;
                if (a.entityId > b.entityId)
                    return 1;
                return 0;
            });
        }

        let bindingSites: any[] = [];
        let editedSites: any[] = [];
        let siteResidues: any[] = [];
        let residues: any[] = [];

        function groupBy2(xs: any, prop: string) {
            var grouped = {};
            for (var i=0; i<xs.length; i++) {
                var p = xs[i][prop];
                if (!grouped[p]) { grouped[p] = []; }
                grouped[p].push(xs[i]);
            }
            return grouped;
        }

        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/binding_sites/${self.state.pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                bindingSites = data[self.state.pdbId];
                fetch(`https://www.ebi.ac.uk/pdbe/api/validation/rama_sidechain_listing/entry/${self.state.pdbId}`)
                    .then((response: any) => response.json())
                    .then((data: any) => {
                        parse(data[self.state.pdbId]);

                        fetch(`https://www.ebi.ac.uk/pdbe/api/validation/residuewise_outlier_summary/entry/${self.state.pdbId}`)
                            .then((response: any) => response.json())
                            .then((data: any) => {
                                data[self.state.pdbId].molecules.forEach((molecule: any) => {
                                    for (const chain of molecule.chains) {
                                        for (const mod of chain.models) {
                                            for (const res of mod.residues) {
                                                let residue = moleculesDict[molecule.entity_id].chainsDict[chain.chain_id].modelsDict[mod.model_id].residuesDict[res.author_residue_number];
                                                if (typeof residue !== 'undefined')
                                                    residue.outlierTypes = res.outlier_types;
                                                if (res.outlier_types.indexOf('RSRZ') != -1) {
                                                    rsrz[res.residue_number] = {outliersType: res.outlier_types};
                                                    rsrzCount++;
                                                }
                                                if (res.outlier_types.indexOf('clashes') != -1)
                                                    clashes++;
                                                if (res.outlier_types.indexOf('ramachandran_outliers') != -1)
                                                    ramaOutl++;
                                                if (res.outlier_types.indexOf('sidechain_outliers') != -1)
                                                    sidechainOutl++;
                                                outlDict[res.residue_number] = {outliersType: res.outlier_types};
                                            }
                                        }
                                    }
                                });

                                fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/polymer_coverage/${self.state.pdbId}`)
                                    .then((response: any) => response.json())
                                    .then((data: any) => {
                                        data[self.state.pdbId].molecules.forEach((molecule: any) => {
                                            for (const chain of molecule.chains) {
                                                chainLen[chain.chain_id] = chain.observed[0].end.author_residue_number - chain.observed[0].start.author_residue_number;
                                                total += chainLen[chain.chain_id];
                                            }
                                            molecs[molecule.entity_id] = Object.assign({}, chainLen);
                                            chainLen = {};
                                        });

                                        self.setState({
                                            perResidQuelity: <div>
                                                <h3>Overall quality:</h3>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <p><b>Clashes: </b>{clashes} ({(clashes/total * 100).toFixed(0)}%)</p>
                                                    <p><b>Ramachandran outliers: </b>{ramaOutl} ({(ramaOutl/total * 100).toFixed(0)}%)</p>
                                                    <p><b>Sidechain outliers: </b>{sidechainOutl} ({(sidechainOutl/total * 100).toFixed(0)}%)</p>
                                                    <p><b>RSRZ outliers: </b>{rsrzCount} ({(rsrzCount/total * 100).toFixed(0)}%)</p>
                                                </div>
                                            </div>,
                                            perResidQuelityDetail: <div>
                                                <h3>Quality of chains:</h3>
                                                {coputeStatsForChains()}
                                            </div>
                                        })
                                    });
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
                                                        });
                                                    }
                                                })
                                            });
                                        }
                                        let finded: any = residues.find(obj => obj.author_residue_number == residue.author_residue_number);
                                        siteResidues.push({
                                            authorResNum: residue.author_residue_number,
                                            resNum: residue.residue_number,
                                            chemCompId: residue.chem_comp_id,
                                            chain: residue.chain_id,
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
                                        <BootstrapTable data={editedSites} expandableRow={(row: any) => true}
                                                        expandComponent={expandComponent}
                                                        trClassName={colorTableLine}
                                                        tableStyle={{fontSize: 'smaller'}}
                                                        maxHeight={'550'}
                                                        scrollTop={'Top'}>
                                            <TableHeaderColumn width='10%' isKey dataField={'siteId'} tdStyle={{cursor: 'pointer'}}>Site ID</TableHeaderColumn>
                                            <TableHeaderColumn dataField={'details'} tdStyle={{cursor: 'pointer'}} dataFormat={imageFormatter}>Details</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>,
                                })
                            })
                    });
            });

        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/${this.state.pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                self.setState({summaryInfo: <div style={{display: 'flex', justifyContent:'space-between', height: '30vh'}}>
                        <div style={{display: 'inline-block', width: '49.5%'}} className={'text-field-sq'}>
                            <h3>Summary info</h3>
                            <div>
                                <b>Name: </b>
                                {data[self.state.pdbId][0]['title']}
                            </div>
                            <div>
                                <b>Release date: </b>
                                {data[self.state.pdbId][0]['release_date'].slice(0,4)}-{data[self.state.pdbId][0]['release_date'].slice(4,6)}-{data[self.state.pdbId][0]['release_date'].slice(6,8)}
                            </div>
                            <div>
                                <b>Experimental method: </b>
                                {data[self.state.pdbId][0]['experimental_method'].toString()}
                            </div>
                            <div>
                                <b>Authors: </b>
                                {data[self.state.pdbId][0]['entry_authors'].toString()}
                            </div>
                        </div>
                        <div style={{display: 'inline-block', width: '49.5%'}} className={'text-field-sq'}>
                            <h3>Validation plot</h3>
                            <ImageZoom
                                image={{
                                    src: `https://www.ebi.ac.uk/pdbe/entry-files/${self.state.pdbId}_multipercentile_validation.svg`,
                                    alt: 'Validation plot',
                                    className: 'img',
                                    style: { maxHeight: '23vh' }
                                }}
                                zoomImage={{
                                    src: `https://www.ebi.ac.uk/pdbe/entry-files/${self.state.pdbId}_multipercentile_validation.svg`,
                                    alt: 'Validation plot'
                                }}
                                defaultStyles={{
                                    overlay: {
                                        opacity: 0.95
                                    }
                                }}
                            />
                        </div>
                    </div>,
                    // completnes: <iframe src={`http://webchem.ncbr.muni.cz/ValTrendsDB/explore.php?embed&xfactor=year+of+release&yfactor=average+ligand+RSCC&plotminor=false&pdbid=${this.state.pdbId}`}/>
                })
            });

        fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/drugbank/${self.state.pdbId}`)
            .then((response: any) => response.json())
            .then((data: any) => {
                const ligandsInBank = data[self.state.pdbId];
                let ebiLigandsObj: {} = {};
                fetch(`https://www.ebi.ac.uk/pdbe/api/pdb/entry/ligand_monomers/${self.state.pdbId}`)
                    .then((response: any) => response.json())
                    .then((ebiLigands: any) => {
                        ebiLigandsObj = groupBy2(ebiLigands[self.state.pdbId], 'chem_comp_id');
                        fetch(`https://proxy-helper.herokuapp.com/`, {headers: {
                                "target-url": `https://webchem.ncbr.muni.cz/Platform/ValidatorDb/SearchData?structures=${self.state.pdbId}`
                            }})
                            .then((response: any) => response.json())
                            .then((data: any) => {
                                console.log(ebiLigandsObj);
                                //@ts-ignore
                                Object.entries(ebiLigandsObj).forEach((obj: any) => {
                                    const specLigand = data['Models'].filter((model: any) => {
                                        return model['ModelName'] == obj[0];
                                    });
                                    console.log(specLigand);
                                })
                                data['Models'].forEach((ligand: any) => {
                                    ligandsInBank.forEach((inBank: any) => {
                                        let tmpLigand = {
                                            'ModelName'    : ligand['ModelName'],
                                            'Entries'      : ligand['Entries'].length,
                                            'MainResidue'  : ligand['Entries'][0]['MainResidue'],
                                            'MissingAtoms' : ligand['Summary']['Missing_Atoms'],
                                            'MissingRings' : ligand['Summary']['Missing_Rings'],
                                            'BadChirality' : ligand['Summary']['HasAll_BadChirality'],
                                            'Substitutions': ligand['Summary']['HasAll_Substitutions'],
                                            'NameMismatch' : ligand['Summary']['HasAll_NameMismatch']
                                        };
                                        if (ligand['ModelName'] == Object.keys(inBank)[0]) {
                                            tmpLigand['drugbankId'] = inBank[ligand['ModelName']]['drugbank_id'];
                                            tmpLigand['targets'] = inBank[ligand['ModelName']]['targets'];
                                            // let comLig = ligand;
                                            // comLig.drugbankId = inBank[ligand['ModelName']]['drugbank_id'];
                                            // comLig.targets = inBank[ligand['ModelName']]['targets'];

                                        }
                                        commonLigands.push(tmpLigand);
                                    });
                                });
                                // commonLigands.forEach((lig: any) => {
                                //     uncomLigands.push(ebiLigands[self.state.pdbId].filter((commLig: any) => {
                                //         return lig['ModelName'] != commLig.chem_comp_id
                                //     }));
                                // });
                                // console.log(uncomLigands);
                                self.setState({
                                    ligandDrugbank: <div>
                                        <BootstrapTable
                                            data={commonLigands}
                                            tableStyle={{fontSize: 'smaller'}}
                                            trClassName={colorTableLine}
                                            maxHeight={'550'}
                                            scrollTop={'Top'}>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='8%' isKey dataField={'ModelName'}>Name</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='11%' dataField={'Entries'}>Number of molecules</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='10%' dataField={'drugbankId'} dataFormat={cellFormatter}>Drugbank ID</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} dataField={'MainResidue'}>Main residue</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} dataFormat={dataColorTextRed} width='10%' dataField={'MissingAtoms'}>Missing atoms</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} dataFormat={dataColorTextRed} width='10%' dataField={'MissingRings'}>Missing rings</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} dataFormat={dataColorTextYellow} width='10%' dataField={'BadChirality'}>Bad chirality</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='12%' dataField={'Substitutions'}>Substituion</TableHeaderColumn>
                                            <TableHeaderColumn thStyle={{ whiteSpace: 'normal'}} width='11%' dataField={'NameMismatch'}>Name mismatch</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                })
                            })
                    });

            });


    }

    private handleCheckboxChange(event: any) {
        const item = event.target.name;
        const isChecked = event.target.checked;

        //@ts-ignore
        this.setState((prevState: Map<number, boolean>) => ({
            //@ts-ignores
            checkedItems: prevState.checkedItems.set(item, isChecked),
            //@ts-ignore
            ramaComponent: <ramachandran-component pdb-ids={this.state.pdbIdField}
                                                   chains-to-show={'["' + Array.from(this.state.checkedChainItems.keys()).join('","') + '"]'}
                                                   //@ts-ignore
                                                   models-to-show={`[${([].concat.apply([], [...prevState.checkedItems]
                .filter(([k, v]) => {
                    return v == true }
                    ))).filter((k: any)=> {
                return typeof k != "boolean"
            })}]`} width="540"/>
        }));
    }

    private handleChainCheckboxChange(event: any) {
        const item = event.target.name;
        const isChecked = event.target.checked;
        //@ts-ignore
        this.setState((prevState: Map<number, boolean>) => ({
            //@ts-ignore
            checkedChainItems: prevState.checkedChainItems.set(item, isChecked),
            //@ts-ignore
            ramaComponent: <ramachandran-component
                pdb-ids={this.state.pdbIdField}
                //@ts-ignore
                chains-to-show={`["${([].concat.apply([], [...prevState.checkedChainItems]
                    .filter(([k, v]) => {return v == true}))).filter((k: any)=> {
                return typeof k != "boolean"
            }).join('","')}"]`} models-to-show={'[' + Array.from(this.state.checkedItems.keys()) + ']'} width="540"/>
        }));
    }

    public render() {
        // @ts-ignore
        const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
            <input type={type} name={name} checked={checked} onChange={onChange} style={{verticalAlign: 'middle', marginLeft: '4px'}}/>
        );

        let checkBoxes = (
            <div style={{display: 'inline-block'}}>
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


        let chainCheckbox = (
            <div style={{display: 'inline-block'}}>
                {
                    this.props.chains.map((item: any) => {
                        return <label key={item.toString()}>
                            {item}
                            {/*
                            // @ts-ignore */}
                            <Checkbox name={item.toString()} checked={this.state.checkedChainItems.get(item.toString())} onChange={this.handleChainCheckboxChange}>{item}</Checkbox>
                        </label>})
                }
            </div>);

        return (
            <div id={"dynamic-comp-container"}>
                <Carousel style={{position: 'absolute', top: '54px', backgroundColor: 'white'}} dragging={false} enableKeyboardControls={true}>
                    <div>
                        <div style={{margin: '15px'}}>
                            {this.state.summaryInfo}
                            <div className={'text-field-sq'} style={{maxHeight: '52vh', overflowY: 'auto', overflowX: 'hidden'}}>
                                {this.state.perResidQuelity}
                                {this.state.perResidQuelityDetail}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{width: '42%', display: 'inline-block', marginTop: '25px'}} id={"rama-parent-container"}>
                            {this.state.ramaComponent}
                            <div style={{margin: '-30px 0 10px 0'}}>
                                <div>{this.props.models.length > 1 ? <div><b>Models: </b>{checkBoxes}</div>: null}</div>
                                <div>{this.props.chains.length > 1 ? <div><b>Chains: </b>{chainCheckbox}</div>: null}</div>
                            </div>
                        </div>
                        <div style={{width: '57%', display: 'inline-block', position: 'relative', float: 'right', height: '84vh', marginTop: '5px', marginRight: '10px'}}>
                            {this.state.litemolComponent}
                        </div>
                    </div>
                    <div style={{margin: '15px'}}>
                        <div style={{width: '49.5%', display: 'inline-block'}}>
                            <h3>Queality of binding sites</h3>
                            {this.state.bindingSiteTable}
                        </div>
                        <div style={{width: '49.5%', display: 'inline-block', verticalAlign: 'top', float: 'right'}}>
                            <h3 style={{display: 'inline-block'}}>Ligands summary</h3>
                            <a style={{display: 'inline-block', float: 'right'}}
                               href={`https://webchem.ncbr.muni.cz/Platform/ValidatorDb/ByStructure/${this.state.pdbId}`}>
                                <b>Data retrieved from ValidatorDB</b>
                            </a>
                            {this.state.ligandDrugbank}
                            {/*<p>*/}
                                {/*On the plot below, you can compare check the quality of specified PDB ligand compared to all ligands over time.*/}
                                {/*As a quality factor, average ligand RSCC (real space correlation coefficient) is used.*/}
                            {/*</p>*/}
                            {/*<div style={{textAlign: 'center'}}>*/}
                                {/*<a href="#" onClick={this.showModal}>*/}
                                    {/*<b>Expand plot</b>*/}
                                {/*</a>*/}
                            {/*</div>*/}
                            <div className={"iframe-parent"}>
                                {this.state.completnes}
                            </div>
                            <Modal
                                isOpen={this.state.modalShown}
                                onAfterOpen={this.showModal}
                                onRequestClose={this.closeModal}
                                style={{content: {
                                        top: '50%',
                                        left: '50%',
                                        right: 'auto',
                                        bottom: 'auto',
                                        transform: 'translate(-50%, -50%)',
                                        width: '95%'}}}
                                contentLabel="Example Modal"
                            >
                                <div className={"modal-parent"}>
                                {this.state.completnes}
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div style={{margin: '15px'}}>

                    </div>

                    <div/>
                </Carousel>
            </div>
        );
    }
}

export default DynComponent;