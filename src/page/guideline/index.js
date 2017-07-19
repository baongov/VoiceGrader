import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'react-bootstrap';
import LessonFullList from '../../components/lessonFullList/index.js'

class PracticePage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <br/>
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 panel panel-default">
              <div className="panel-body">
                <h1>Using Voice Grader</h1>

                <h3>Introduction</h3>
                <p className="guideText">Intonation Coach is intended to help you, as a language learner, become more aware of your intonation and model it after patterns used by native speakers. To get started, choose your target language, read the overview and listen to each sample sentence in the overview tab.</p>

                <h3>Recording & Analyzing</h3>
                <p className="guideText">After youve recorded, you can use the Play Back button to hear your recording, or you can go straight to the Save & Compare button to submit your attempt. Intonation Coach will then analyze your recording and add its pitch contour to the graph, where you can see how it compares to the target intonation.</p>

                <p className="guideText">You can continue to record and submit attempts as many times as you want; all pitch contours will be displayed simultaneously, and each recording will be catalogued on the right side of the page with a Play button and a Delete button. You can hide a recording from the graph by clicking on its name in the legend at the top right corner of the graph; if you want to discard a recording completely, press the Delete button for it on the right side of the page, and it will be erased and removed from the graph.</p>

                <h3>Evaluating Your Intonation</h3>
                <p className="guideText">Since intonation is not an exact science and theres a lot of room for minor variations, Intonation Coach doesnt try to give you a quantitative score of how you did. Instead, it encourages you to self-evaluate by comparing the pitch contours on the graph. Generally, you want to aim for your pitch contour to have a similar overall shape to the target pitch contour, especially at the end of the sentence.</p>

                <p className="guideText">Some things to keep in mind</p>

                <ul className="guideText">
        					<li>Your vocal register (how high or low your voice is in general) is likely to be different from the register of the person speaking in the target recordings. This means that your pitch contour may appear above or below the target one; this is not reflective of your intonation and can be disregarded.</li>
        					<li>You may also have a smaller or larger pitch range than the recorded speaker; this often varies from person to person and isn't the most important factor in your intonation. Don't worry if the peaks and dips in your graph are shallower or deeper than the targets.</li>
        					<li>The moving guidebar and the aligned transcript are there to help you with timing as you record; for the most informative results, do your best to follow these guides and keep the same pace as the target recording. If your pitch contour is the same shape as the target but is shifted a little to the left or right of it, this most likely means that your timing was slightly different but your intonation was good.</li>
                </ul>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </div>
    );
  }
}

module.exports = PracticePage;
