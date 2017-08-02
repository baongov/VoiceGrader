import React, {Component} from 'react'
import NVD3Chart from 'react-nvd3'

class LChart extends Component {
  render() {
      return (
        <div>
          {
            React.createElement(NVD3Chart, {
              id:"lineChart",
              xAxis: {
                axisLabel : "Time (s)",
                tickFormat: function(d) {return parseFloat(d).toFixed(2); },
              },
              yAxis: {
                axisLabel : "Pitch (Hz)",
                tickFormat: function(d){ return parseInt(d); },
              },
              xDomain : [0, 2.5],
              yDomain: [50, 320],
              interpolate : "basis",
              useInteractiveGuideline : true,
              type : 'lineChart',
              datum : this.props.dataChart,
              x : 'label',
              y : 'value',
              duration : 500,
              renderEnd : function(){
                console.log('renderEnd');
              }
            })
          }
        </div>
      );
  }
}

module.exports = LChart
