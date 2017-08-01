import React, {Component} from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import './index.css';

class LessonFullList extends Component {
  render() {
    return (
      <Grid className="col-xs-11 lessonName">
        <p id="fullLesson">Lesson Name</p>
        <hr id="lineLesson"/>
        <Grid>
          <Row>
            <Col xs={2}>
              <a href="/lesson1"><Button className="vgBtn">Lesson 1</Button></a>
            </Col>
            <Col xs={2}>
              <a href="/lesson2"><Button className="vgBtn">Lesson 2</Button></a>
            </Col>
            <Col xs={2}>
              <a href="/lesson3"><Button className="vgBtn">Lesson 3</Button></a>
            </Col>
            <Col xs={2}>
              <a href="/lesson4"><Button className="vgBtn">Lesson 4</Button></a>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <a href="/lesson5"><Button className="vgBtn">Lesson 5</Button></a>
            </Col>
            <Col xs={2}>
              <a href="/lesson6"><Button className="vgBtn">Lesson 6</Button></a>
            </Col>
            <Col xs={2}>
              <a href="/lesson7"><Button className="vgBtn">Lesson 7</Button></a>
            </Col>
          </Row>
        </Grid>
      </Grid>
    );
  }
}

module.exports = LessonFullList;
