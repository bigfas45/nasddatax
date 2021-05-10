import React, { useState, useEffect } from 'react';
 import highchart from './highchart.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

var strtotime = require('strtotime');
import useRequest from '../hooks/use-request';
var strtotime = require('strtotime');
const Chart = () => {
  const [rates, setRates] = useState([]);

  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/usi`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setRates(data);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  var mockData = [];

  for (var j = 0; j < rates.length; j++) {
    var presentdate = rates[j].present_date;
    presentdate = strtotime(presentdate);
    presentdate *= 1000;
    var usi = rates[j].usi;
    var deals = rates[j].deals;
    mockData.push([presentdate, usi, deals]);
  }

 

  let groupingUnits = [
    [
      'week', // unit name
      [1], // allowed multiples
    ],
    ['month', [1, 2, 3, 4, 6]],
  ];

  let mockOptions = {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: 'MARKET HISTORY',
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'NSI',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    chart: {
      height: 37 + '%',
      styledMode: true,
    },

    series: [
      {
        type: '',
        data: (function () {
          var nsi = [];

          for (var i = 0; i < mockData.length; i++) {
            nsi.push([
              mockData[i][0], // the date
              mockData[i][1], // open
            ]);
          }
          return nsi;
        })(),
      },
      {
        type: 'column',
        data: (function () {
          var deals = [];

          for (var i = 0; i < mockData.length; i++) {
            deals.push([
              mockData[i][0], // the date
              mockData[i][2], // the volume
            ]);
          }
          return deals;
        })(),
        yAxis: 1,
      },
    ],
  };

  return (
    <div style={{ borderTop: '5px soild #FFFFFF' }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={mockOptions}
      />
    </div>
  );
};

export default Chart;
