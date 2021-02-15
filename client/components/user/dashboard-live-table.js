import { Fragment, useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';

const DashboardLiveTable = () => {
  const [liveData, setLiveData] = useState([]);
  let refprice,
    closeprice,
    pecup,
    pecdown,
    vwapC,
    price,
    change,
    percentage,
    valueTextChange;

  let totalQty;
  let totalValue;

  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/livetrade`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setLiveData(data);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);
  return (
    <Fragment>
      <div className="col-xl-12 col-xxl-12">
        <div className="card card-bordered card-full">
          <div className="card-inner border-bottom">
            <div className="card-title-group">
              <div className="card-title">
                <h6 className="title">Recent Investment</h6>
              </div>
            </div>
          </div>

          <div className="nk-tb-list">
            <div className="nk-tb-item nk-tb-head">
              <div className="nk-tb-col">
                <span>SYMBOL</span>
              </div>
              <div className="nk-tb-col tb-col-sm">
                <span>OPEN</span>
              </div>
              <div className="nk-tb-col tb-col-lg">
                <span>HIGH</span>
              </div>
              <div className="nk-tb-col">
                <span>HIGH QTY</span>
              </div>
              <div className="nk-tb-col">
                <span>LOW</span>
              </div>
              <div className="nk-tb-col">
                <span>LOW QTY</span>
              </div>
              <div className="nk-tb-col">
                <span>DEALS</span>
              </div>
              <div className="nk-tb-col">
                <span>TOTAL QTY</span>
              </div>
              <div className="nk-tb-col">
                <span>TOTAL VALUE</span>
              </div>
              <div className="nk-tb-col">
                <span>CLOSE</span>
              </div>
              <div className="nk-tb-col">
                <span>% CHANGE</span>
              </div>
            </div>
            {liveData.map((trades, i) => {
              refprice = trades.openprice;
              closeprice = trades.closeprice;
              pecup = refprice * 1.1;

              pecdown = refprice * (1 - 0.1);
              if (trades.volume >= 5000) {
                vwapC = trades.value / trades.volume;
                if (vwapC >= pecdown || vwapC >= pecup) {
                  price = vwapC.toFixed(2);
                } else {
                  price = refprice;
                }
              } else if (trades.volume < 5000) {
                price = refprice;
              }
              change = price - refprice;
              percentage = (change / refprice) * 100;
              percentage = percentage.toFixed(2);

              if (percentage > 0) {
                valueTextChange = (
                  <span style={{ color: '#07fe00' }}>
                    &#9650; {percentage} %{' '}
                  </span>
                );
              } else if (percentage < 0) {
                valueTextChange = (
                  <span style={{ color: '#ff0000' }}>
                    &#9660; {percentage} %{' '}
                  </span>
                );
              } else {
                valueTextChange = (
                  <span className="text-warning">&#8212; {percentage} % </span>
                );
              }
              if (trades.volume != 0) {
                totalQty = trades.volume;
                totalQty++;

                totalValue = trades.value;
                totalValue++;

                return (
                  <Fragment>
                    <div className="nk-tb-item">
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <div className="user-avatar user-avatar-sm bg-light">
                            <span className="tb-sub tb-amount">
                              {trades.Security}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {trades.openprice}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {trades.high}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {trades.highestqty}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">{trades.low}</span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {trades.lowestqty}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <div className="user-avatar user-avatar-sm bg-light">
                            <span className="tb-sub tb-amount">
                              {' '}
                              {trades.count}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {totalQty.toLocaleString(navigator.language, {
                              minimumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {totalValue.toLocaleString(navigator.language, {
                              minimumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">{price}</span>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <div className="align-center">
                          <span className="tb-sub tb-amount">
                            {valueTextChange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLiveTable;
