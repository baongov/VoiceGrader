import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, Grid, Row, Col, ProgressBar} from 'react-bootstrap';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import Recorder from '../../../lib/Recorderjs/dist/recorder.js';

var dataChart = require('../../data/en-us-1-pd.json');
var userChart = require('../../data/en-us-2-pd.json');
var audioContext = new AudioContext();
//dataPoint = dataChart.
var input, recorder;
var userBlob, userRecUrl;

const LChart = React.createClass({
  render() {
      const data = [
          {
              color: "steelblue",
              points: this.props.lchartData
          },
          {
              color: "red",
              points: this.props.uchartData
          }
      ];
      return (
          <div>
              <div className="App">
                  <h1>Voice Comparison Graph</h1>
                  <LineChart
                      xLabel="Time (s)"
                      yLabel="Pitch (Hz)"
                      width={800}
                      height={400}
                      data={data}
                  />
              </div>
          </div>
      );
  }
});

function getSoundFile(url) {
  var textRep = fetch(url)
      .then((response) => {
        return response.arrayBuffer()
      })
      .then((responseJson) => {
          audioContext.decodeAudioData(responseJson, function(audioBuffer) {
              var source = audioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContext.destination);
              source.start(0);
          });
      })
      .catch((error) => {return error})
  return textRep;
}

var handleRecord = function () {
  var exID = "en-us-1"
  var recLength = 3.1
   if (true) {
        startRecord(exID, recLength);
        setTimeout(function () {
        stopRecord(exID);
        }, (recLength * 1000));
    } else {
        stopRecord(exID);
    }
};

var startRecord = function (exID, recLength) {
  console.log("Recording.....")
    recorder.clear();
    recorder.record();
};

var stopRecord = function (exID) {
  recorder.stop();
  recorder.exportWAV(function (blob) {
      userBlob = blob;
      userRecUrl = (window.URL || window.webkitURL).createObjectURL(blob);
  });
};

var playBack = function () {
  getSoundFile(userRecUrl);
}

class IntonationLesson extends Component {
  constructor(props) {
    super(props);
    navigator.mediaDevices.getUserMedia ({audio: true})
      .then(function(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);
      });
  };

  render() {
    return (
      <div>
        <Grid className="col-xs-8 col-xs-offset-2 LessonGrid">
          <p id="LessonStyle">The most common intonation pattern in English is falling intonation, in which the pitch is lowest at the end of the sentence. Falling intonation is found in most declarative sentences (statements), as well as imperative (commands) and exclamatory sentences. For example: </p>

          <button type="button" className="btn btn-primary ov-play en-us-1" onClick={() => getSoundFile('http://127.0.0.1:5000/en-us-1.wav')}><span className="glyphicon glyphicon-play"></span>Play Example</button>
          <span className="example"> Declarative: “Yesterday, I went to the store and bought groceries.”</span>

          <br />
          <button type="button" className="btn btn-danger record" onClick={handleRecord}><span className="glyphicon glyphicon-record"></span> Record</button>
          <button type="button" className="btn btn-primary play-back" onClick={playBack}><span className="glyphicon glyphicon-play"></span> Play Back</button>
          <LChart lchartData={dataChart} uchartData={userChart}/>
          <Row className="gradingBar">
            <Col className="col-xs-4">
              <p id="grading">Grading bar </p>
            </Col>
            <Col className="col-xs-5">
                <ProgressBar now={30} label={`30%`} bsStyle="danger"/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

module.exports = IntonationLesson;
