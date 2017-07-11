import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import './index.css';

class LessonFullList extends Component {
  render() {
    return (
      <div>
        <p id="lessonName">Lesson Name</p>
        <hr/>

        <ul className="nav navbar-nav lessonFullList">
          <li><a href="/lesson1"><Button>Lesson 1</Button></a></li>
          <li><a href="/lesson2"><Button>Lesson 2</Button></a></li>
          <li><a href="/lesson3"><Button>Lesson 3</Button></a></li>
          <li><a href="/lesson4"><Button>Lesson 4</Button></a></li>
          <li><a href="/lesson5"><Button>Lesson 5</Button></a></li>
          <li><a href="/lesson6"><Button>Lesson 6</Button></a></li>
          <li><a href="/lesson7"><Button>Lesson 7</Button></a></li>
          <li><a href="/lesson8"><Button>Lesson 8</Button></a></li>
          <li><a href="/lesson9"><Button>Lesson 9</Button></a></li>
        </ul>

      </div>
    );
  }
}

module.exports = LessonFullList;
