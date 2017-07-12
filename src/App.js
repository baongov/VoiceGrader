import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import MainDropDown from './components/dropdown/main.js';
import HomePage from './page/homepage/index.js';
import PracticePage from './page/practice/index.js';
import GuidelinePage from './page/guideline/index.js';
import {BrowserRouter, Route, browserHistory} from 'react-router-dom';
import {Modal, Popup, Popover, Tooltip, popup, OverlayTrigger, ControlLabel,Button, Navbar, FormGroup, FormControl} from 'react-bootstrap';

//var ReactRouter = require('react-router');

import './App.css';


const Home = () => <HomePage/>
const Practice = () => <PracticePage/>
const Challenge = () => <HomePage/>
const Leaderboard = () => <HomePage/>
const Guideline = () => <GuidelinePage/>
const Signin = () => <Popup/>

const SignInForm = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },
  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>ID Account</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="ID Account"
            onChange={this.handleChange}
          />
          <br/>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.value}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
});

const SignInPopup = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Button
          id="signIn"
          onClick={this.open}
        >
          Sign In
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter login information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignInForm/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

class App extends Component {
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

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
                <li><a href="#">
                  <SignInPopup/></a></li>
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
            <Route path='/guideline' component={Guideline} />
            <Route path='/signin' component={Signin} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
