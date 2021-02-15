import React, { Fragment, useEffect, useState, Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import useRequest from '../../../hooks/use-request';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';

const ExportToExcelSecPerformance = ({
  dataStartDate,
  dataEndDate,
  dataEndDateSecurity,
  start,
  end,
}) => {
      let endUsiDate,
        endMapDate,
        startUsiDate,
        startMapDate,
        endPercentChnage,
        txtChange,
        startPercentageChange,
        txtChangeMCap,
        test;
    
  return (
    <div style={{ marginRight: '25px' }}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="export"
        table="table-to-xls"
        filename="Security Performance"
        sheet="tablexls"
        buttonText="Export"
      />
      <table hidden="true" id="table-to-xls">
        <thead style={{ border: '1px solid black' }}>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black' }}></th>
            <th style={{ border: '1px solid black' }}>Volume traded</th>
            <th style={{ border: '1px solid black' }}>Open Price</th>
            <th style={{ border: '1px solid black' }}>Close Price</th>
            <th style={{ border: '1px solid black' }}>Gain/loss </th>
          </tr>
        </thead>

        <thead>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black' }}>Date</th>
            <th style={{ border: '1px solid black' }}></th>
            <th style={{ border: '1px solid black' }}>{start}</th>
            <th style={{ border: '1px solid black' }}>{end}</th>
            <th style={{ border: '1px solid black' }}></th>
          </tr>
        </thead>

        <tbody style={{ border: '1px solid black' }}>
          {dataStartDate.map((s, i) => {
            startUsiDate = s.usi;
            startMapDate = (s.capitalisation / 1000000000).toLocaleString(
              navigator.language,
              {
                minimumFractionDigits: 0,
              }
            );
            {
              dataEndDate.map((e, ei) => {
                endUsiDate = e.usi;
                endMapDate = (e.capitalisation / 1000000000).toLocaleString(
                  navigator.language,
                  {
                    minimumFractionDigits: 0,
                  }
                );

                endPercentChnage = (
                  ((endUsiDate - startUsiDate) / startUsiDate) *
                  100
                ).toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                });
                if (endPercentChnage > 0) {
                  txtChange = (
                    <span style={{ color: '#07fe00' }}>
                      &#9650; {endPercentChnage} %{' '}
                    </span>
                  );
                } else if (endPercentChnage < 0) {
                  txtChange = (
                    <span style={{ color: 'red' }}>
                      &#9660; {endPercentChnage} %{' '}
                    </span>
                  );
                } else {
                  txtChange = (
                    <span className="text-warning">
                      &#8212; {endPercentChnage} %{' '}
                    </span>
                  );
                }

                startPercentageChange = (
                  ((endMapDate - startMapDate) / startMapDate) *
                  100
                ).toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                });
                if (startPercentageChange > 0) {
                  txtChangeMCap = (
                    <span style={{ color: '#07fe00' }}>
                      &#9650; {startPercentageChange} %{' '}
                    </span>
                  );
                } else if (startPercentageChange < 0) {
                  txtChangeMCap = (
                    <span style={{ color: 'red' }}>
                      &#9660; {startPercentageChange} %{' '}
                    </span>
                  );
                } else {
                  txtChangeMCap = (
                    <span className="text-warning">
                      &#8212; {startPercentageChange} %{' '}
                    </span>
                  );
                }
              });
            }
            return (
              <Fragment>
                <tr style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black' }}>NASD OTC index</td>
                  <td style={{ border: '1px solid black' }}></td>
                  <td style={{ border: '1px solid black' }}>{startUsiDate}</td>
                  <td style={{ border: '1px solid black' }}>{endUsiDate}</td>
                  <td style={{ border: '1px solid black' }}>{txtChange}</td>
                </tr>
                <tr style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black' }}>
                    Market Capitalisation (₦ billion)
                  </td>
                  <td style={{ border: '1px solid black' }}></td>
                  <td style={{ border: '1px solid black' }}>
                    {' '}
                    {startMapDate}{' '}
                  </td>
                  <td style={{ border: '1px solid black' }}>{endMapDate}</td>
                  <td style={{ border: '1px solid black' }}>{txtChangeMCap}</td>
                </tr>
              </Fragment>
            );
          })}

          <tr style={{ border: '1px solid black' }}>
            <td style={{ border: '1px solid black' }}>
              PERFORMANCE BY SECURITY
            </td>
            <td style={{ border: '1px solid black' }}></td>
            <td style={{ border: '1px solid black' }}></td>
            <td style={{ border: '1px solid black' }}></td>
            <td style={{ border: '1px solid black' }}></td>
          </tr>

          {dataEndDateSecurity.map((sec, i) => {
            let txtpricechange;
            let volume = sec.volume.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            });
            let closeprice2 = sec.closeprice2.toLocaleString(
              navigator.language,
              { minimumFractionDigits: 2 }
            );
            let openprice = sec.openprice.toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            });
            let priceChange = (
              ((closeprice2 - openprice) / openprice) *
              100
            ).toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            });

            if (priceChange > 0) {
              txtpricechange = (
                <span style={{ color: '#07fe00' }}>
                  &#9650; {priceChange} %{' '}
                </span>
              );
            } else if (priceChange < 0) {
              txtpricechange = (
                <span style={{ color: 'red' }}>&#9660; {priceChange} % </span>
              );
            } else {
              txtpricechange = (
                <span className="text-warning">&#8212; {priceChange} % </span>
              );
            }

            return (
              <Fragment>
                <tr key={i} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black' }}>
                    {sec.security_name}
                  </td>
                  <td style={{ border: '1px solid black' }}>{volume}</td>
                  <td style={{ border: '1px solid black' }}>{openprice}</td>
                  <td style={{ border: '1px solid black' }}>{closeprice2}</td>
                  <td style={{ border: '1px solid black' }}>
                    {txtpricechange}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcelSecPerformance;
