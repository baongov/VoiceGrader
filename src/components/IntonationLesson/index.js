import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, Grid, Row, Col, ProgressBar, Modal} from 'react-bootstrap';
import '../../../node_modules/react-linechart/dist/styles.css';
import Recorder from '../../../lib/Recorderjs/dist/recorder.js';
import LChart from '../lineChart/index.js'
import ResultChart from '../../page/result/index.js';
import d3 from 'd3'
import nvd3 from 'nvd3'
var dataExampleChart = require('../../data/en-us-1-pd.json');
var audioContext = new AudioContext();
var input, recorder;
var userBlob, userRecUrl;

function slidingBare() {
  var recLength = 3.1
  var svg = d3.selectAll(".nv-chart svg");
  console.log(svg);
  var playBar = svg.append("line")
      .attr("x1", 60)
      .attr("y1", 20)
      .attr("x2", 60)
      .attr("y2", 500)
      .attr("stroke-width", 1)
      .attr("stroke", "black");
  playBar.transition()
      .attr("x1", 900)   // width of graph
      .attr("x2", 900)
      .duration(recLength*1000)
      .ease("linear")
      .transition()
      .delay(recLength*1000)
      .duration(200)
      .remove();
}

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

              slidingBare();
            })
      })
      .catch((error) => {return error})
  return textRep;
}

var startRecord = function (exID, recLength) {
    console.log("Recording.....")
    var recordBtn = document.getElementById("recordBtn")
    var playBackBtn = document.getElementById("playBackBtn")
    var audio = new Audio('http://127.0.0.1:5000/beep-01a.mp3');

    slidingBare();
    audio.volume = 0.1;
    audio.play();
    recordBtn.disabled = true;
    playBackBtn.disabled = true;
    recorder.clear();
    recorder.record();
};

var stopRecord = function (exID, blobSend) {
  console.log("Finishing.....")
  var recordBtn = document.getElementById("recordBtn")
  var playBackBtn = document.getElementById("playBackBtn")
  var overlay = document.getElementById("overlay")

  overlay.hidden = false
  recordBtn.disabled = false;
  playBackBtn.disabled = false;
  recorder.stop();
  recorder.exportWAV(function (blob) {
      userBlob = blob;
      userRecUrl = (window.URL || window.webkitURL).createObjectURL(blob);
      blobSend(userBlob)
  });
};

class IntonationLesson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sample : {key: "Sample", color: "#ff7f0e", values:dataExampleChart},
      recorder : {key: "Recorder", color: "#2ca02c", values:[]},
      showModal: false
    };

    navigator.mediaDevices.getUserMedia ({audio: true})
      .then(function(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);
      });

    var segments = [
                  (165, 145, 'Yesterday,'),
                  (315, 120, 'I went to the'),
                  (445, 60, 'store'),
                  (520, 35, 'and'),
                  (560, 70, 'bought'),
                  (640, 110, 'groceries.'),
                ]
  };

  playBack() {
    getSoundFile(userRecUrl);
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  handleRecord = () => {
    var userUpdateData = this;
    var exID = "en-us-1"
    var recLength = 3.1

    startRecord(exID, recLength);

    setTimeout(function () {
      stopRecord(exID, function(blob) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var formData = new FormData();
          formData.append('user_rec', event.target.result);
          formData.append('ex_id', exID);

          fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            body: formData
          }).then((response) => {
            return response.json()
          }).then((responseJson) => {
              var overlay = document.getElementById("overlay")
              var attempt = responseJson.attempt;
              var generalResult = document.getElementById("generalResult")

              generalResult.hidden = false;
              overlay.hidden = true;
              userUpdateData.setState({recorder: {key: "Recorder", color: "#2ca02c", values:attempt.pitch_data}});
          });
        }
        reader.readAsDataURL(userBlob);
      });
    }, (recLength * 1000));

    recorder.clear();
  };

  componentDidMount () {
  }

  render() {


    return (
      <div id="wrap">
        <img src="http://127.0.0.1:5000/loader.gif" id="overlay" hidden/>
        <Grid className="col-xs-8 col-xs-offset-2 LessonGrid">
          <h2 className="topic">Declarative</h2>
          <p id="LessonStyle">The most common intonation pattern in English is falling intonation, in which the pitch is lowest at the end of the sentence. Falling intonation is found in most declarative sentences (statements), as well as imperative (commands) and exclamatory sentences. For example: </p>

          <Row className="sampleVoice">
            <span className="example">“Yesterday, I went to the store and bought groceries.”</span>
            <button type="button" className="btn btn-primary ov-play en-us-1" onClick={() => getSoundFile('http://127.0.0.1:5000/en-us-1.wav')}><span className="glyphicon glyphicon-play"></span>Play Example</button>
          </Row>

          <br />
          <button id="recordBtn" type="button" className="btn btn-danger record" onClick={this.handleRecord}><span className="glyphicon glyphicon-record"></span> Record</button>
          <button id="playBackBtn" type="button" className="btn btn-primary play-back" onClick={this.playBack}><span className="glyphicon glyphicon-play"></span> Play Back</button>

          <Row>
            <div id="lineChart" className="col-xs-8 col-xs-offset-1">
              <LChart dataChart={[this.state.sample, this.state.recorder]}/>
            </div>
          </Row>

          <Row class="transcript">
            <svg>
                <text text-anchor="start" x="165" y="20" textLength="145">Yesterday,</text>
                <text text-anchor="start" x="315" y="20" textLength="120">I went to the</text>
                <text text-anchor="start" x="445" y="20" textLength="60">store</text>
                <text text-anchor="start" x="520" y="20" textLength="35">and</text>
                <text text-anchor="start" x="560" y="20" textLength="70">bought</text>
                <text text-anchor="start" x="640" y="20" textLength="110">groceries</text>
            </svg>
          </Row>

          <div id="generalResult" hidden>
            <Row className="grading">
              <Col className="col-xs-2 col-xs-offset-3 "><h4 className="gradingTitle">Grading bar</h4></Col>
              <Col className="col-xs-4"><ProgressBar className="gradingBar" now={30} label={`30%`} bsStyle="danger"/></Col>
            </Row>
            <Row><button type="button" className="btn btn-primary record" onClick={this.open}><span className="glyphicon glyphicon-check"></span> Detail</button></Row>
          </div>

          <Modal id="modal" className="resultPopup" show={this.state.showModal} onHide={this.close} >
            <Modal.Header closeButton>
              <Modal.Title>Detail of result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResultChart/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Grid>
      </div>
    );
  }
}

module.exports = IntonationLesson;
