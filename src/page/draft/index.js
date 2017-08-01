import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NVD3Chart from 'react-nvd3';


function getDatum(j) {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/j)});
    cos.push({x: i, y: .5 * Math.cos(i/j)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

class LineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({count: this.state.count + 1})
  }

  render() {
    const data = (this.state.count % 2 == 0)? getDatum(10): getDatum(11);
    return (
      <div>
      <button onClick={this.handleClick}>Change Data</button>
      {
        React.createElement(NVD3Chart, {
          xAxis: {
            tickFormat: function(d){ return d; },
            axisLabel: 'Period'
          },
          yAxis: {
            tickFormat: function(d) {return parseFloat(d).toFixed(2); }
          },
          xDomain: [-10, 120],
          type:'lineChart',
          datum: data,
          x: 'label',
          y: 'value',
          duration: 1,
          margin: {
            left: 200
          },
          renderEnd: function(){
            console.log('renderEnd');
          }
        })
      }
      </div>
    )
  }
};


class DraftPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        count: 1
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({count: this.state.count + 1})
    }

  sinAndCos = () => {
    var sin = [],sin2 = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i/10)});
    }

    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      //values - represents the array of {x,y} data points
        key: 'Sine Wave', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }
  render() {
     const data = (this.state.count % 2 == 0)? getDatum(10): getDatum(11);
    var datum = [{
    key: "Cumulative Return",
    values: [
      {
        "label" : "A" ,
        "value" : -29.765957771107
      } ,
      {
        "label" : "B" ,
        "value" : 0
      } ,
      {
        "label" : "C" ,
        "value" : 32.807804682612
      } ,
      {
        "label" : "D" ,
        "value" : 196.45946739256
      } ,
      {
        "label" : "E" ,
        "value" : 0.19434030906893
      } ,
      {
        "label" : "F" ,
        "value" : -98.079782601442
      } ,
      {
        "label" : "G" ,
        "value" : -13.925743130903
      } ,
      {
        "label" : "H" ,
        "value" : -5.1387322875705
      }
    ]
  }
];
    return (
      <div>
        <NVD3Chart id="barChart" type="discreteBarChart" datum={datum} x="label" y="value"/>
      </div>
    );
  }
}

module.exports = DraftPage;
