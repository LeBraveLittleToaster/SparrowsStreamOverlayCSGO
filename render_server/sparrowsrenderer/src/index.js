import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import EventRenderer from './ingamerender/EventRenderer';
import AdminConsole from './adminconsole/AdminConsole';
import WaitStore from './store/Store';
import 'bootstrap/dist/css/bootstrap.min.css';

const waitStore = new WaitStore();



const routing = (
    <Router>
        <div>
            <Route path="/wait" component={(props) => <App {...props} store={waitStore}/>}/>
            <Route path="/ingame" component={(props)=> <EventRenderer {...props} store={waitStore}/>}/>
            <Route path="/console" component={(props) => <AdminConsole {...props} store={waitStore} />}/>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
