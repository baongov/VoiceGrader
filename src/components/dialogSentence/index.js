import React, {Component} from 'react';
import './index.css';

class DialogSenctence extends Component {
  render(){
    const isPlaying = this.props.context.state.idPlayingSentence === this.props.id
    const isDisabled = isPlaying ? true : false;

    return(
      <div ref="sentenceObj" className="itemSentence btn-default btn-block" disabled={isDisabled}>
        <div className="wrapper">
          <div className="wrapper-zero">
              {this.props.id}
          </div>
          <div className="wrapper-one">
              {this.props.subtitle}
          </div>
          <div className="wrapper-two">
            <button onClick={() => this.props.context.onClickRepeat(this.props.id, this)} type="button" className="btn btn-warning"><span className="glyphicon glyphicon-refresh"></span></button>
          </div>
          <div className="wrapper-three">
            <button onClick={() => this.props.context.open()} type="button" className="btn btn-primary"><span className="glyphicon glyphicon-check"></span></button>
          </div>
        </div>
      </div>);
  }
}

module.exports = DialogSenctence
