import React, { Component } from 'react';
import Waiting from './components/waitscreen';
import Console from './components/console';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const URL = "ws://" + window.location.host + '/api/simple_data_base/subscription';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ws: null,
      data: null,
    }
    console.log( window.location.host)
  }

  componentDidMount() {
    let ws = new WebSocket(URL);
    this.setState({
      ws
    })

    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = evt => {
      const data = JSON.parse(evt.data)
      //this.addMessage(message)
      this.setState({
        data
      })
    }

    ws.onclose = () => {
      console.log('disconnected')
      
      this.setState({
        ws: new WebSocket(URL),
      })
      
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/wait-preview">
              <Navbar />
              <Waiting />
            </Route>
            <Route path="/wait">
              <Waiting />
            </Route>
            <Route path="/console">
              <Navbar />
              <Console 
                  value={this.state.data}
                  onChange={(e) => {
                    this.setState({data:e});
                    console.log("now send something"+JSON.stringify(e));
                  }}
              />
            </Route>
            <Route path="/">
              <Navbar />
              <p> Home </p>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function Navbar() {
  return (
    <div id="navbar">
      <h1> Sparrows Overlay </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wait-preview">wait Preview</Link>
          </li>
          <li>
            <Link to="/console"> console </Link>
          </li>
        </ul>
      </nav>
    </div>)
}


export default App;
