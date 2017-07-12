import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import './index.css';

class DemoList extends Component {
  render() {
    return (
      <div>
        <p id="lessonName">Lesson Name</p>
        <hr/>

        <ul className="nav navbar-nav lessonList">
          <li><a href="/lesson1"><Button>Lesson 1</Button></a></li>
          <li><a href="/lesson2"><Button>Lesson 2</Button></a></li>
          <li><a href="/lesson3"><Button>Lesson 3</Button></a></li>
          <li><a href="/lesson4"><Button>Lesson 4</Button></a></li>
          <li><a href="/lesson5"><Button>Lesson 5</Button></a></li>
        </ul>

      </div>
    );
  }
}

module.exports = DemoList;
