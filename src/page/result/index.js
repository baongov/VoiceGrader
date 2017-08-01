import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'react-bootstrap';
import {ComposedChart, ScatterChart, Scatter, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [{name: 'Intonation', uv: 590, pv: 800, amt: 1400},
              {name: 'Rate', uv: 868, pv: 967, amt: 1506},
              {name: 'Loudness', uv: 1397, pv: 1098, amt: 989},
              {name: 'Harshness', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Sharpness', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Overall', uv: 1400, pv: 680, amt: 1700}];


class PracticePage extends Component {
  render() {
    return (
      <div>
        <h3>Speech Characteristic</h3>

        <ComposedChart layout="vertical" width={600} height={400} data={data}
              margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis type="number"/>
            <YAxis dataKey="name" type="category"/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Bar dataKey='pv' name='Sample' barSize={20} fill='#413ea0'/>
            <Scatter dataKey='uv' name='Your result' data={data} shape="star" fill='#8884d8'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
         </ComposedChart>
      </div>
    );
  }
}

module.exports = PracticePage;
