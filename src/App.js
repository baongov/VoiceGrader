import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import MainDropDown from './dropdown/main.js';
import HomePage from './page/homepage/index.js';
import PracticePage from './page/practice/index.js';
import {BrowserRouter, Route, browserHistory} from 'react-router-dom';

//var ReactRouter = require('react-router');

import './App.css';


const Home = () => <HomePage/>
const Practice = () => <PracticePage/>
const Challenge = () => <HomePage/>
const Leaderboard = () => <HomePage/>
const Guideline = () => <HomePage/>
const Signin = () => <HomePage/>

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse App">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand App-header" href="/home">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav App-topic">
                <li><a href="/practice">Practice</a></li>
                <li><a href="/challenge">Challenge</a></li>
                <li><a href="/leaderboard">Leaderboard</a></li>
                <li><a href="/guideline">Guideline</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right className">
                <li><a href="/signin">
                  <Button className="ButtonSignIn">Sign In</Button></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <BrowserRouter history={browserHistory}>
          <div>
            <Route path='/home' component={Home} />
            <Route path='/practice' component={Practice} />
            <Route path='/challenge' component={Challenge} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/guideline' component={Forum} />
            <Route path='/signin' component={Signin} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
