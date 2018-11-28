import * as React from 'react';
import './App.css';

import Expandable from 'react-expandable';

class App extends React.Component {
    public render() {
      return <div className="App">
          <Expandable headers={[
              (isOpened: boolean) => (
              <div className={"main-expandable-div"}>
                  <div className={"expandable-element-title"}>
                      <h3>Using torsion angles</h3>
                      <h4>{isOpened ? '+' : '-'}</h4>
                  </div>
              </div>
              ),
              (isOpened: boolean) => (
                  <div className={"main-expandable-div"}>
                      <div className={"expandable-element-title"}>
                          <h3>Tab2</h3>
                          <h4>{isOpened? '+' : '-'}</h4>
                      </div>
                  </div>
              ),
              (isOpened: boolean) => (
                  <div className={"main-expandable-div"}>
                      <div className={"expandable-element-title"}>
                          <h3>Tab3</h3>
                          <h4>{isOpened? '+' : '-'}</h4>
                      </div>
                  </div>
              ),
          ]} enableMultiOpen>
              <div>
                  <div className={"collapsed-div"}>
                      <div>
                    <h4>The conformation of the backbone of every non-terminal amino-acid residue is determined by three torsion angles, called:</h4>
                          <div>
                              <li>phi (C[i-1]-N[i]-CA[i]-C[i])</li>
                              <li>psi (N[i]-CA[i]-C[i]-N[i+1])</li>
                              <li>omega (CA[i]-C[i]-N[i+1]-CA[i+1]) </li>
                          </div>
                      </div>
                      <img src={"/src/backbone.svg"} alt={"flasf"}/>
                  </div>
              </div>
              <div>
                  second item
              </div>
              <div>
                  third item
              </div>
          </Expandable>
      </div>;
  }
}

export default App;
