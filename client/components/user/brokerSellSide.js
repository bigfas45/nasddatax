import { useState, Fragment, React, useEffect } from 'react';

import useRequest3 from '../../hooks/use-request3';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from '../../components/user/Exports/ExportToExcelBrokersSell';
import Loader from 'react-loader-spinner';

const BrokerSellSide = () => {
     const [sell, setSell] = useState([]);

      const { doRequest3, errors3, loading3, success3 } = useRequest3({
        url: `/api/brokers/sell`,
        method: 'get',
        body: {},

        onSuccess: (data) => {
          setSell(data);
        },
      });

      useEffect(() => {
        doRequest3();
      }, []);
  
      const showLoading = () =>
        loading3 && (
          <div className="text-center">
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={1000000} //3 secs
            />
          </div>
        );

      const columns2 = [
        {
          Header: 'PI',
          accessor: 'from_member_name', // String-based value accessors!
        },

        {
          Header: 'FROM MEMBER',
          accessor: 'member_code', // String-based value accessors!
          style: {
            textAlign: 'right',
          },
        },
        {
          Header: 'TRADES',
          accessor: 'fromCount', // String-based value accessors!
          style: {
            textAlign: 'right',
          },
        },
        {
          Header: 'VALUE',
          accessor: 'fromValue', // String-based value accessors!
          style: {
            textAlign: 'right',
          },
          Cell: (props) => {
            return (
              <span>{parseFloat(props.original.fromValue).toFixed(0)}</span>
            );
          },
        },
        {
          Header: 'VOLUME',
          accessor: 'fromVolume', // String-based value accessors!
          style: {
            textAlign: 'right',
          },
          Cell: (props) => {
            return (
              <span>{parseFloat(props.original.fromVolume).toFixed(0)}</span>
            );
          },
        },
      ];
    return (
      <Fragment>
        <div class="nk-block">
          <div class="row g-gs">
            <div class="col-md-12">
              <div class="card card-bordered card-full">
                <div class="card-inner">
                  {showLoading()}
                  <h5 class="card-title">Broker Sellers Trades</h5>{' '}
                  <ReactTable
                    data={sell}
                    columns={columns2}
                    filterable
                    sortable
                    defaultPageSize={20}
                    showPaginationTop
                    noDataText="Please wait Loading...."
                    showPaginationBottom={false}
                  >
                    {(state2, filtredData2, instance2) => {
                      const reactTable2 = state2.pageRows.map((post2) => {
                        return post2._original;
                      });
                      return (
                        <div>
                          {filtredData2()}
                          <ExportToExcel post2={reactTable2} />
                        </div>
                      );
                    }}
                  </ReactTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );

};

export default BrokerSellSide;
