import React, { useState, useEffect } from 'react';
import useRequest from '../hooks/use-request';

const Ticker = () => {
 const [rates, setRates] = useState([]);

  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/ticker`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setRates(data);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  const priceTicker = () => {
    return (
      <div
        style={{
          background: '#000000',
          borderBottom: '1px solid white',
          fontFamily: 'Geostar Unica One Arial Helvetica sans-serif',
        }}
      >
        <marquee>
          {rates.map((s, i) => {
            if (s.percent === 0) {
              var txt = 'text-warning mr-1 mrl-1';
              var arrow = '—';
            } else if (s.percent > 0) {
              txt = 'text-success mr-1 mrl-1';
              arrow = '▲';
            } else if (s.percent < 0) {
              txt = 'text-danger mr-1 mrl-1';
              arrow = '▼ ';
            }
            return (
              <span
                className="text-white mr-4"
                key={i}
                style={{ fontSize: '1.1rem' }}
              >
                {' '}
                <span className="font-weight-bolder">{s.Security} </span>{' '}
                <span className={txt}>{s.close.toFixed(2)}</span>{' '}
                <span className={txt}> {arrow} </span>{' '}
                <span className={txt}>{s.percent.toFixed(2)}%</span>{' '}
              </span>
            );
          })}
        </marquee>
      </div>
    );
  };

  return (
    <div>
    
      {priceTicker()}
    </div>
  );
};

export default Ticker;
