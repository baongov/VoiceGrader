import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, Grid, Row, Col, ProgressBar, Modal} from 'react-bootstrap';
import '../../../node_modules/react-linechart/dist/styles.css';
import Recorder from '../../../lib/Recorderjs/dist/recorder.js';
import LChart from '../lineChart/index.js'
import ResultChart from '../../page/result/index.js';
import NVD3Chart from 'react-nvd3'
var dataExampleChart = require('../../data/en-us-1-pd.json');
var audioContext = new AudioContext();
var input, recorder;
var userBlob, userRecUrl;

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

var startRecord = function (exID, recLength) {
    console.log("Recording.....")
    var recordBtn = document.getElementById("recordBtn")
    var playBackBtn = document.getElementById("playBackBtn")
    var audio = new Audio('http://127.0.0.1:5000/beep-01a.mp3');

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
      exampleData : dataExampleChart,
      userData : [],
      showModal: false
    };

    navigator.mediaDevices.getUserMedia ({audio: true})
      .then(function(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);
      });
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
              userUpdateData.setState({userData: attempt.pitch_data});
          });
        }
        reader.readAsDataURL(userBlob);
      });
    }, (recLength * 1000));

    recorder.clear();
  };


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
          <LChart id="root" lchartData={this.state.exampleData} uchartData={this.state.userData}/>
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
