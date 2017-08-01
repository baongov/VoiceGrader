import React, { Component } from 'react';
import logo from './logo.svg';
import HomePage from './page/homepage/index.js';
import PracticePage from './page/practice/index.js';
import GuidelinePage from './page/guideline/index.js';
import Result from './page/result/index.js';
import UploadUI from './page/upload/index.js';
import DraftComp from './page/draft/index.js';
import {BrowserRouter, Switch, Route, browserHistory, Link} from 'react-router-dom';
import {Modal, Popup, Popover, Tooltip, ControlLabel,Button, FormGroup, FormControl} from 'react-bootstrap';
import IntonationLesson from './components/IntonationLesson/index.js'
import DialogChallenge from './components/dialogVideoLesson/index.js'

//var ReactRouter = require('react-router');

import './App.css';

const FirstLesson = () => <IntonationLesson/>
const Home = () => <HomePage/>
const Practice = () => <PracticePage/>
const Challenge = () => <DialogChallenge/>
const Leaderboard = () => <HomePage/>
const Guideline = () => <GuidelinePage/>
const Signin = () => <Popup/>
const ResultPage = () => <Result/>
const UploadPage = () => <UploadUI/>
const DraftPage = () => <DraftComp/>

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
    return (
      <div>
        <Button
          id="signIn"
          className="AppBtn"
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
      <BrowserRouter history={browserHistory}>
        <div>
          <nav className="navbar navbar-inverse App">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand App-header" to="/">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav App-topic">
                  <li><Link to="/practice">Practice</Link></li>
                  <li><Link to="/challenge">Challenge</Link></li>
                  <li><Link to="/leaderboard">Leaderboard</Link></li>
                  <li><Link to="/guideline">Guideline</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/upload"><Button id="upload" className="AppBtn">Upload</Button></a></li>
                  <li><a href="#">
                    <SignInPopup/></a></li>
                </ul>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/practice' component={Practice} />
            <Route path='/challenge' component={Challenge} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/guideline' component={Guideline} />
            <Route path='/signin' component={Signin} />
            <Route path='/firstlesson' component={FirstLesson}/>
            <Route path='/result' component={ResultPage}/>
            <Route path='/upload' component={UploadPage}/>
            <Route path='/draft' component={DraftPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
