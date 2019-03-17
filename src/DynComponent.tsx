import * as React from "react";
import Litemol from "./Litemol";

interface DynComponentStates {
    pdbIdField: string;
    chainsField: string;
    modelsField: string;
}
interface DynComponentProps {
    pdbId: string;
    chains: string;
    models: string;
}


class DynComponent extends React.Component<DynComponentProps, DynComponentStates> {
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
    constructor(props: DynComponentProps) {
        super(props);
        this.state = {pdbIdField: `["${props.pdbId}"]`, chainsField: `["${props.chains}"]`, modelsField: `["${props.models}"]`};
    }

    static getChains(pdbId: string): any {
        let ajaxGet = function (callback: any) {
            var callback = (typeof callback == 'function' ? callback : false), xhr: XMLHttpRequest;
                xhr = new XMLHttpRequest();
            if (!xhr)
                return null;
            xhr.open("GET", "https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/" + pdbId,true);
            xhr.onreadystatechange=function() {
                if (xhr.readyState==4 && callback) {
                    callback(xhr.responseText)
                }
            };
            xhr.send(null);
            return xhr;
        };

        let sorted: string[] = [];

        ajaxGet(
            function (response: any) {
                let c: string[] = [];
                response = JSON.parse(response);
                if (!response)
                    return;
                response[pdbId].forEach((e: string) => {
                    e['in_chains'].forEach((x: string) => {
                        c.push(x)
                    })
                });
                sorted = Array.from(new Set(c)).sort();
                return '["' + sorted.join('","') + '"]';
            });

        // let sorted: string[] = [];
        // $.getJSON("https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/" + pdbId, function (data) {
        //     let c: string[] = [];
        //     data[pdbId].forEach((e: string) => {
        //         e['in_chains'].forEach((x: string) => {
        //             c.push(x)
        //         })
        //     });
        //     sorted = Array.from(new Set(c)).sort();
        // });
        // return '["' + sorted.join('","') + '"]';
    }

    static getDerivedStateFromProps(props: DynComponentProps, state: DynComponentStates) {
        state.modelsField = `["${props.models}"]`;
        state.pdbIdField = `["${props.pdbId}"]`;
        $.getJSON("https://www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/" + props.pdbId, function (data) {
            let c: string[] = [];
            data[props.pdbId].forEach((e: string) => {
                e['in_chains'].forEach((x: string) => {
                    c.push(x)
                })
            });
            let sorted = Array.from(new Set(c)).sort();
            state.chainsField = '["' + sorted.join('","') + '"]';
        });
        return state;
    }

    public render() {
        $('#litemol-1').remove();
        $('#ramachandran-component').remove();
        return (
            <div>
                <div style={{width: '42%', display: 'inline-block', marginTop: '20px'}}>
                    {/*
               // @ts-ignore */}
                    <ramachandran-component pdb-ids={this.state.pdbIdField} chains-to-show={this.state.chainsField} models-to-show={this.state.modelsField} width="550" id='ramachandran-component'/>
                </div>
                <div style={{width: '57%', display: 'inline-block', position: 'relative', float: 'right', height: '800px'}}>
                    <Litemol pdbId={this.props.pdbId}/>
                </div>
            </div>
        );
    }
}

export default DynComponent;