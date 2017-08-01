import React, {Component} from 'react';
import LineChart from 'react-linechart';

class LChart extends Component {
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
              <h3>Voice Comparison Graph</h3>
              <LineChart
                  xLabel="Time (s)"
                  yLabel="Pitch (Hz)"
                  width={800}
                  height={400}
                  data={data}
              />
          </div>
      );
  }
}

module.exports = LChart
