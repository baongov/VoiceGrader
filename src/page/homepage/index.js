import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'react-bootstrap';
import DemoList from '../../demoList/index.js'

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="track-heading">
            <p id="title">Welcome</p>
            <br/>
            <p id="intro">Improve your intonation by practicing following lessons</p>
            <br/>
            <Button className="firstChallengeBtn">Solve me first</Button>
        </div>
        <div id="mainModule">
          <DemoList/>
            <DemoList/>
              <DemoList/>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;
