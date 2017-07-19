import React, {Component} from 'react';
import './index.css';
import {Grid, ProgressBar, Row, Col} from 'react-bootstrap';
import LessonFullList from '../../components/lessonFullList/index.js'

class PracticePage extends Component {
  render() {
    return (
      <Grid className="col-xs-6 col-xs-offset-3">
        <p>Your result:</p>
        <div className="col-xs-7">
          Intonation:<ProgressBar bsStyle="success" now={40} />
          Loudness:<ProgressBar bsStyle="info" now={20} />
          Stableness:<ProgressBar bsStyle="warning" now={60} />
          Sharpness:<ProgressBar bsStyle="danger" now={80} />
        </div>
        <LessonFullList/>
        <LessonFullList/>
        <LessonFullList/>
      </Grid>
    );
  }
}

module.exports = PracticePage;
