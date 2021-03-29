import { useState, Fragment, React, useEffect } from 'react';

import useRequest2 from '../../hooks/use-request2';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from '../../components/user/Exports/ExportToExcelBrokersBuy';
import Loader from 'react-loader-spinner';

const BrokerBuySide = () => {
   const [buy, setBuy] = useState([]);
   const { doRequest2, errors2, loading2, success } = useRequest2({
     url: `/api/brokers/buy`,
     method: 'get',
     body: {},

     onSuccess: (data) => {
       setBuy(data);
     },
   });

   useEffect(() => {
     doRequest2();
   }, []);
  
    const showLoading = () =>
      loading2 && (
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

   const columns = [
     {
       Header: 'PI',
       accessor: 'member_name', // String-based value accessors!
     },

     {
       Header: 'TO MEMBER',
       accessor: 'member_code', // String-based value accessors!
       style: {
         textAlign: 'right',
       },
     },
     {
       Header: 'TRADES',
       accessor: 'toCount', // String-based value accessors!
       style: {
         textAlign: 'right',
       },
     },
     {
       Header: 'VALUE',
       accessor: 'toValue', // String-based value accessors!
       style: {
         textAlign: 'right',
       },
       Cell: (props) => {
         return <span>{parseFloat(props.original.toValue).toFixed(0)}</span>;
       },
     },
     {
       Header: 'VOLUME',
       accessor: 'toVolume', // String-based value accessors!
       style: {
         textAlign: 'right',
       },
       Cell: (props) => {
         return (
           <span>
             {parseFloat(props.original.toVolume)
               .toFixed(0)
               .toLocaleString(navigator.language, {
                 minimumFractionDigits: 0,
               })}
             
            
           </span>
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
                 <h5 class="card-title">Brokers Buyer Trades</h5>{' '}
                 <ReactTable
                   data={buy}
                   columns={columns}
                   filterable
                   sortable
                   defaultPageSize={20}
                   showPaginationTop
                   noDataText="Please wait Loading...."
                   showPaginationBottom={false}
                 >
                   {(state, filtredData, instance) => {
                     const reactTable = state.pageRows.map((post) => {
                       return post._original;
                     });
                     return (
                       <div>
                         {filtredData()}
                         <ExportToExcel post={reactTable} />
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
}


export default BrokerBuySide;