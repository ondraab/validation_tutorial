import * as React from "react";
import Litemol from "./Litemol";
import Carousel from "nuka-carousel";
import Table, {TableColumn} from 'tyble';

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
            ligandDrugbank: <div/>};
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
                                    let comLig = ligand;
                                    comLig.drugbankId = inBank[ligand['ModelName']]['drugbank_id'];
                                    comLig.targets = inBank[ligand['ModelName']]['targets'];
                                    commonLigands.push((comLig));
                                }
                            })
                        });

                        const columns: Array<TableColumn<any>> = [
                            {
                                heading: { content: 'Name' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['ModelName']}</span>
                            },
                            {
                                heading: { content: 'Number of molecules' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Entries'].length}</span>
                            },
                            {
                                heading: { content: 'Drugbank Id' },
                                //@ts-ignore
                                cells: (props: any) => <span>
                                    <b>
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.drugbank.ca/drugs/${props['drugbankId']}`}>{props['drugbankId']}
                                        </a>
                                    </b>
                                </span>
                            },
                            {
                                heading: { content: 'Has missing atoms' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Summary']['Missing_Atoms']}</span>
                            },
                            {
                                heading: { content: 'Has missing rings' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Summary']['Missing_Rings']}</span>
                            },
                            {
                                heading: { content: 'Has chirality error' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Summary']['HasAll_BadChirality']}</span>
                            },
                            {
                                heading: { content: 'Has substitution' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Summary']['HasAll_Substitutions']}</span>
                            },
                            {
                                heading: { content: 'Has name mismatch' },
                                //@ts-ignore
                                cells: (props: any) => <span>{props['Summary']['HasAll_NameMismatch']}</span>
                            },
                        ];

                        self.setState({
                            ligandDrugbank: <div>
                                <Table columns={columns} data={commonLigands} theme={{headingTextTransform: 'none', headingFontSize: '12px', headingFontWeight: 'bold',
                                    headingFontFamily: 'Trocchi'}}>
                                </Table></div>
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
                        <div style={{width: '55%'}}>
                            {this.state.ligandDrugbank}
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </Carousel>
            </div>
        );
    }
}

export default DynComponent;