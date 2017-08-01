import React, {Component} from 'react';
import './index.css';
import {Button, Grid} from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import {BrowserRouter, Switch, Route, browserHistory, Link} from 'react-router-dom';
import DialogChallenge from '../../components/dialogVideoLesson/index.js'

class UploadPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accepted: [],
      rejected: [],
      videoLesson: null
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(acceptedFiles, rejectedFiles) {
      this.setState({accepted:acceptedFiles, rejected:rejectedFiles, videoLesson: null}, function() {
        if (acceptedFiles.length > 0 && rejectedFiles.length == 0) {
          document.getElementById('uploadBtn').disabled = false;
        } else {
          document.getElementById('uploadBtn').disabled = true;
        }
    });
  }

  renderVideoLesson = () => {
    this.setState({videoLesson: <DialogChallenge/>})
  }

  render() {
    document.addEventListener("DOMContentLoaded", function(event) {
      document.getElementById('uploadBtn').disabled = true;
    });

    return (
      <div>
        <Grid className="col-xs-8 col-xs-offset-2 uploadPage">
          <section id="sectionDropFile">
            <div>
              <Dropzone accept="video/mp4" onDrop={this.onDrop} className="dropZoneConfig">
                <p>Try dropping your video here, or click to select files to upload.</p>
                <p>Only *.mp4 videos will be accepted</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Accepted files</h2>
              <ul>
                {
                  this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
              <h2>Rejected files</h2>
              <ul>
                {
                  this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
              </aside>
          </section>
          <Button id="uploadBtn" ref="uploadBtn" className="videoLessonBtn" onClick={this.renderVideoLesson}>Create Lesson</Button>
          <div>{this.state.videoLesson}</div>
        </Grid>
      </div>
    );
  }
}

module.exports = UploadPage;
