import React, {Component} from 'react';
import './index.css';
import {Button, Grid, Row, Col, ProgressBar, Modal} from 'react-bootstrap';
import DialogSenctence from '../dialogSentence/index.js'
import ScrollArea from 'react-scrollbar';
import LChart from '../lineChart/index.js'
import Recorder from '../../../lib/Recorderjs/dist/recorder.js';

var demoVideo = require('../../data/demo1.mp4');
var exampleData = require('../../data/en-us-1-pd.json')
var userData = require('../../data/en-us-2-pd.json')
var audioContext = new AudioContext();
var input, recorder;

var timeInfo = [{id:0, time:"00:00:02"},
                {id:1, time:"00:00:06"},{id:2, time:"00:00:08"},{id:3, time:"00:00:12"},
                {id:4, time:"00:00:14"},{id:5, time:"00:00:16"},{id:6, time:"00:00:19"},
                {id:7, time:"00:00:23"},{id:8, time:"00:00:26"},{id:9, time:"00:00:30"},
                {id:10, time:"00:00:31"},{id:11, time:"00:00:33"},{id:12, time:"00:00:35"}]

var stringToSecond = function(str) {
  var a = str.split(':');
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}
var startRecord = function (exID, recLength) {
    console.log("Recording.....")
    
    recorder.clear();
    recorder.record();
};

var stopRecord = function (exID, blobSend) {
  console.log("Finishing.....")

  document.getElementById("preBtn").disabled = false;
  document.getElementById("repeatBtn").disabled = false;
  document.getElementById("resultBtn").disabled = false;
  document.getElementById("nextBtn").disabled = false;
  document.getElementById("voiceGrading").hidden = false;
  document.getElementById("micPlay").hidden = true;

  recorder.stop();
  recorder.exportWAV(function (blob) {
  });
};

class DialogVideoLesson extends Component {
  constructor (props) {
    super(props);
    this.playNext = this.playNext.bind(this);
    var _ramNum = Math.floor((Math.random() * 100) + 1);

    this.state = {
      idPlayingSentence: 1,
      playingSentenceObj: null,
      muted: false,
      showModal: false,
      source: [
        {
          src: "http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4",
          type: 'video/mp4'
        }
      ],
      ramNum: _ramNum
    };

    navigator.mediaDevices.getUserMedia ({audio: true})
      .then(function(stream) {
        var input = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(input);
      });

  }

  handleRecord = () => {
    var exID = "en-us-1"
    var recLength = 3.1

    document.getElementById("micPlay").hidden = false;
    startRecord(exID, recLength);

    setTimeout(function () {
      stopRecord(exID, function(blob) {
      });
    }, (3 * 1000));

    recorder.clear();
  };

  playNext = () => {
    this.onClickRepeat(this.state.idPlayingSentence + 1, this)
  }

  playPrevious = () => {
    this.onClickRepeat(this.state.idPlayingSentence - 1, this)
  }

  onClickRepeat = (idSentence, sentenceObjContext) => {
    this.setState({idPlayingSentence: idSentence});
    var currSentenceHms = timeInfo[idSentence].time;
    var currSentenceSecs = stringToSecond(currSentenceHms);
    var _ramNum = Math.floor((Math.random() * 100) + 1);

    document.getElementById("preBtn").disabled = true;
    document.getElementById("repeatBtn").disabled = true;
    document.getElementById("resultBtn").disabled = true;
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("voiceGrading").hidden = true;

    this.state.ramNum = _ramNum;
    document.getElementById('demoVideo').currentTime = currSentenceSecs; //6.5 should be edited automatically
    this.refs.myVideo.play();
  }

  handleScroll(scrollData){
    console.log(scrollData);
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  onloadpage = () => {
    var context = this;
    var video = document.getElementById('demoVideo');
    video.addEventListener("timeupdate", function(){
        var playId = context.state.idPlayingSentence;

        var nextSentenceHms = timeInfo[playId+1].time;
        var nextSentenceSecs = stringToSecond(nextSentenceHms)

        console.log("sencond: " + nextSentenceSecs)
        if(this.currentTime >= nextSentenceSecs ) {
            context.handleRecord();
            this.pause();
        }
    });
  }

  componentDidMount () {
    this.onloadpage();
  }

  render(){
    var context = this;
    let scrollbarStyles = {borderRadius: 5};


    return(
      <div>
        <Grid className="videoLessonGrid" >
          <Row><h3>Who am I? A philosophical inquiry - Amy Adkins</h3></Row>
          <Row>
          <Col className="paddingZero" xs={7}>
            <video id="demoVideo" ref="myVideo" className="videoLesson" controls>
              <source src={demoVideo} type="video/mp4" />
            </video>
          </Col>
          <Col className="paddingZero" xs={5}>
            <ScrollArea
                  className="area"
                  contentClassName="content"
                  verticalScrollbarStyle={scrollbarStyles}
                  verticalContainerStyle={scrollbarStyles}
                  horizontalScrollbarStyle={scrollbarStyles}
                  horizontalContainerStyle={scrollbarStyles}
                  smoothScrolling={true}
                  minScrollSize={40}
                  onScroll={this.handleScroll}
                  >

                  <DialogSenctence id={1} context={this} subtitle="Throughout the history of mankind,"/>
                  <DialogSenctence id={2} context={this} subtitle="three little words have sent poets to the blank page,"/>
                  <DialogSenctence id={3} context={this} subtitle="philosophers to the Agora,"/>
                  <DialogSenctence id={4} context={this} subtitle="and seekers to the oracles:"/>
                  <DialogSenctence id={5} context={this} subtitle="&quot;Who am I?&quot;"/>
                  <DialogSenctence id={6} context={this} subtitle="From the ancient Greek aphorism inscribed on the Temple of Apollo,"/>
                  <DialogSenctence id={7} context={this} subtitle="&quot;Know thyself,&quot;"/>
                  <DialogSenctence id={8} context={this} subtitle="to The Who&#39;s rock anthem, &quot;Who Are You?&quot;"/>
                  <DialogSenctence id={9} context={this} subtitle="philosophers, psychologists, academics,"/>
                  <DialogSenctence id={10} context={this} subtitle="scientists, artists, theologians and politicians"/>
                  <DialogSenctence id={11} context={this} subtitle="have all tackled the subject of identity."/>
                  <DialogSenctence id={12} context={this} subtitle="Their hypotheses are widely varied and lack significant consensus."/>
                  <DialogSenctence id={13} context={this} subtitle="These are smart, creative people,"/>
                  <DialogSenctence id={14} context={this} subtitle="so what&#39;s so hard about coming up with the right answer?"/>

            </ScrollArea>
          </Col>
          </Row>
          <Row>
              <Button id="preBtn" className="videoLessonBtn" onClick={this.playPrevious}><span className="glyphicon glyphicon-fast-backward"> Previous</span></Button>
              <Button id="repeatBtn" className="videoLessonBtn" onClick={() => this.onClickRepeat(this.state.idPlayingSentence, this)}><span className="glyphicon glyphicon-refresh"> Repeat</span></Button>
              <Button id="resultBtn" className="videoLessonBtn" onClick={this.open}><span className="glyphicon glyphicon-check"> Result</span></Button>
              <Button id="nextBtn" className="videoLessonBtn" onClick={this.playNext}><span className="glyphicon glyphicon-step-forward"> Next</span></Button>
          </Row>
          <Row id="voiceGrading" hidden={true} className="grading">
            <Col className="col-xs-1 col-xs-offset-3 "><h4 className="gradingTitle">Grading</h4></Col>
            <Col className="col-xs-4"><ProgressBar className="gradingBar" now={this.state.ramNum} label={this.state.ramNum+"%"} bsStyle="danger"/></Col>
          </Row>
          <Row>
            <img src="http://127.0.0.1:5000/mic.gif" style={{width:"100px", height:"100px"}} id="micPlay" hidden/>
          </Row>
        </Grid>

        <Modal id="resultModal" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Your result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LChart lchartData={exampleData} uchartData={userData}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = DialogVideoLesson
