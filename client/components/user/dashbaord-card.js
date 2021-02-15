import { Fragment, useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import useRequest2 from '../../hooks/use-request2';
import useRequest3 from '../../hooks/use-request3';
import useRequest4 from '../../hooks/use-request4';

import Loader from 'react-loader-spinner';
const DashboardCard = () => {
  const [rates, setRates] = useState([]);
  const [ratesMonth, setRatesMonth] = useState([]);
  const [weekTrade, setWeekTrade] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/otctotaldeals`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setRates(data);
    },
  });

  const { doRequest2, errors2, loading2 } = useRequest2({
    url: `/api/equity/otctotaldealsmonth`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setRatesMonth(data);
    },
  });

  const { doRequest3, errors3, loading3 } = useRequest3({
    url: `/api/equity/otctotaldealsweek`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setWeekTrade(data);
    },
  });

  const { doRequest4, errors4, loading4 } = useRequest4({
    url: `/api/equity/otctotaldealslastmonth`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setLastMonth(data);
    },
  });

  useEffect(() => {
    doRequest();
    doRequest2();
    doRequest3();
    doRequest4();
  }, []);

  const cardLoading = () => {
    return (
      <div className="text-center">
        <Loader
          type="Rings"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={1000000}
          //3 secs
        />
      </div>
    );
  };

  let Tdeals = 0;
  let TvolumeTrade = 0;
  let TvalueTrade = 0;

  let TdealsMonth = 0;
  let TvolumeTradeMonth = 0;
  let TvalueTradeMonth = 0;

  let TdealsWeek = 0;
  let TvolumeTradeWeek = 0;
  let TvalueTradeWeek = 0;

  let TdealsLM = 0;
  let TvolumeTradeLM = 0;
  let TvalueTradeLM = 0;

  let percentageChangeDeals = 0;
  let dealsTextChange;

  let percentageChangeVolume = 0;
  let VolumeTextChange;

  let percentageChangeValue = 0;
  let ValueTextChange;

  return (
    <Fragment>
      {/* YTD calculation */}
      {rates.map((trades, i) => {
        Tdeals += trades.sumDeals;
        TvolumeTrade += trades.sumVolume;
        TvalueTrade += trades.sumValue;
      })}
      {/* Current month calculation */}
      {ratesMonth.map((tradesMonth, j) => {
        TdealsMonth += tradesMonth.sumDeals;
        TvolumeTradeMonth += tradesMonth.sumVolume;
        TvalueTradeMonth += tradesMonth.sumValue;
      })}
      {/* previous month calculation*/}
      {lastMonth.map((lastM, l) => {
        TdealsLM += lastM.sumDeals;
        TvolumeTradeLM += lastM.sumVolume;
        TvalueTradeLM += lastM.sumValue;

        // percentage change for deals
        percentageChangeDeals = (
          ((TdealsMonth - TdealsLM) / TdealsLM) *
          100
        ).toFixed(2);

        // percentage change for volume
        percentageChangeVolume = (
          ((TvolumeTradeMonth - TvolumeTradeLM) / TvolumeTradeLM) *
          100
        ).toFixed(2);

        // percentage chnage fro value
        percentageChangeValue = (
          ((TvalueTradeMonth - TvalueTradeLM) / TvalueTradeLM) *
          100
        ).toFixed(2);

        // percentage output for deal
        if (percentageChangeDeals > 0) {
          dealsTextChange = (
            <span className="change up text-danger">
              <em className="icon ni ni-arrow-long-up"></em>
              {percentageChangeDeals}%
            </span>
          );
        } else if (percentageChangeDeals < 0) {
          dealsTextChange = (
            <span className="change down text-danger">
              <em className="icon ni ni-arrow-long-down"></em>
              {percentageChangeDeals}%
            </span>
          );
        } else {
          dealsTextChange = (
            <span>
              <em></em>
              {percentageChangeDeals}%
            </span>
          );
        }

        // percentage change for volume

        if (percentageChangeVolume > 0) {
          VolumeTextChange = (
            <span className="change up text-danger">
              <em className="icon ni ni-arrow-long-up"></em>
              {percentageChangeVolume}%
            </span>
          );
        } else if (percentageChangeVolume < 0) {
          VolumeTextChange = (
            <span className="change down text-danger">
              <em className="icon ni ni-arrow-long-down"></em>
              {percentageChangeVolume}%
            </span>
          );
        } else {
          VolumeTextChange = (
            <span>
              <em></em>
              {percentageChangeVolume}%
            </span>
          );
        }

        // percentage change for value

        if (percentageChangeValue > 0) {
          ValueTextChange = (
            <span className="change up text-danger">
              <em className="icon ni ni-arrow-long-up"></em>
              {percentageChangeValue}%
            </span>
          );
        } else if (percentageChangeValue < 0) {
          ValueTextChange = (
            <span className="change down text-danger">
              <em className="icon ni ni-arrow-long-down"></em>
              {percentageChangeValue}%
            </span>
          );
        } else {
          ValueTextChange = (
            <span>
              <em></em>
              {percentageChangeValue}%
            </span>
          );
        }
      })}
      ;{/* weekly calculation */}
      {weekTrade.map((weekTrades, k) => {
        TdealsWeek += weekTrades.sumDeals;
        TvolumeTradeWeek += weekTrades.sumVolume;
        TvalueTradeWeek += weekTrades.sumValue;
      })}
      <Fragment>
        <div className="col-md-3">
          <div className="card card-bordered card-full">
            <div className="card-inner">
              <div className="card-title-group align-start mb-0">
                <div className="card-title">
                  <h6 className="subtitle">Total Deals</h6>
                </div>
                <div className="card-tools">
                  <em
                    className="card-hint icon ni ni-help-fill"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Total Deals"
                  ></em>
                </div>
              </div>
              <div className="card-amount">
                <span className="amount">
                  {' '}
                  {Tdeals ? Tdeals : cardLoading()}{' '}
                </span>
                {/*  */}
                {dealsTextChange}
              </div>
              <div className="invest-data">
                <div className="invest-data-amount g-2">
                  <div className="invest-data-history">
                    <div className="title">This Month</div>
                    <div className="amount">
                      {' '}
                      {TdealsMonth ? TdealsMonth : cardLoading()}{' '}
                    </div>
                  </div>
                  <div className="invest-data-history">
                    <div className="title">This Week</div>
                    <div className="amount">
                      {' '}
                      {TdealsWeek ? TdealsWeek : cardLoading()}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-bordered card-full">
            <div className="card-inner">
              <div className="card-title-group align-start mb-0">
                <div className="card-title">
                  <h6 className="subtitle">Total Volume Traded</h6>
                </div>
                <div className="card-tools">
                  <em
                    className="card-hint icon ni ni-help-fill"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Total Volume Traded"
                  ></em>
                </div>
              </div>
              <div className="card-amount">
                <span className="amount">
                  {TvolumeTrade
                    ? TvolumeTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })
                    : cardLoading()}{' '}
                </span>

                {VolumeTextChange}
              </div>
              <div className="invest-data">
                <div className="invest-data-amount g-2">
                  <div className="invest-data-history">
                    <div className="title">This Month</div>
                    <div className="amount">
                      {' '}
                      {TvolumeTradeMonth
                        ? TvolumeTradeMonth.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </div>
                  </div>
                  <div className="invest-data-history">
                    <div className="title">This Week</div>
                    <div className="amount">
                      {TvolumeTradeWeek
                        ? TvolumeTradeWeek.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-bordered card-full">
            <div className="card-inner">
              <div className="card-title-group align-start mb-0">
                <div className="card-title">
                  <h6 className="subtitle">Total Value Traded</h6>
                </div>
                <div className="card-tools">
                  <em
                    className="card-hint icon ni ni-help-fill"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Total Value Traded"
                  ></em>
                </div>
              </div>
              <div className="card-amount">
                <span className="amount">
                  {' '}
                  {TvalueTrade
                    ? TvalueTrade.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0,
                      })
                    : cardLoading()}{' '}
                </span>
                {ValueTextChange}
              </div>
              <div className="invest-data">
                <div className="invest-data-amount g-2">
                  <div className="invest-data-history">
                    <div className="title">This Month</div>
                    <div className="amount">
                      {TvalueTradeMonth
                        ? TvalueTradeMonth.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </div>
                  </div>
                  <div className="invest-data-history">
                    <div className="title">This Week</div>
                    <div className="amount">
                      {TvalueTradeWeek
                        ? TvalueTradeWeek.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-md-3">
          <div className="card card-bordered card-full">
            <div className="card-inner">
              <div className="card-title-group align-start mb-0">
                <div className="card-title">
                  <h6 className="subtitle">NSI</h6>
                </div>
                <div className="card-tools">
                  <em
                    className="card-hint icon ni ni-help-fill"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Total Value Traded"
                  ></em>
                </div>
              </div>
              <div className="card-amount">
                <span className="amount">
                345
                </span>
                {ValueTextChange}
              </div>
              <div className="invest-data">
                <div className="invest-data-amount g-2">
                  <div className="invest-data-history">
                    <div className="title">This Month</div>
                    <div className="amount">
                     777
                    </div>
                  </div>
                  <div className="invest-data-history">
                    <div className="title">This Week</div>
                    <div className="amount">
                     777
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Fragment>
    </Fragment>
  );
};

export default DashboardCard;
