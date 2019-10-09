import React, {Component} from 'react';
import {observer} from 'mobx';

const TeamCtView = observer(class TeamCtView extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (<div></div>)
    }
});

const TeamTView = observer(class TeamTView extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (<div></div>)
    }
});

export default {
    TeamCtView,
    TeamTView
}