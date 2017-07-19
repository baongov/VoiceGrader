import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, browserHistory} from 'react-router-dom';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import DemoList from '../../components/demoList/index.js'
import IntonationLesson from '../../components/IntonationLesson/index.js'


const FirstLesson = () => <DemoList/>

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="track-heading">
            <p id="title">Welcome</p>
            <br/>
            <p id="intro">Improve your intonation by practicing following lessons</p>
            <br/>
            <a href="/firstlesson"><Button className="firstChallengeBtn">Solve me first</Button></a>
        </div>
        <Grid className="col-xs-6 col-xs-offset-3">
          <DemoList/>
          <DemoList/>
          <DemoList/>
        </Grid>

        <BrowserRouter history={browserHistory}>
          <div>
            <Route path='/firstlesson' component={FirstLesson}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

module.exports = HomePage;
