import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'react-bootstrap';
import LessonFullList from '../../lessonFullList/index.js'

class PracticePage extends Component {
  render() {
    return (
      <div>
        <div id="mainModule">
          <LessonFullList/>
          <LessonFullList/>
          <LessonFullList/>
        </div>
      </div>
    );
  }
}

module.exports = PracticePage;
