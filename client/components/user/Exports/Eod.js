import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import InvestorName from '../../../components/admin/investorName';

const ExportToExcel = ({post}) => {



  return (
    <div style={{ marginRight: '25px' }}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="export"
        table="table-to-xls"
        filename="securityData"
        sheet="tablexls"
        buttonText="Export"
      />
      <table hidden="true" id="table-to-xls">
        <thead>
          <tr>
            <th>EXTERNAL_TICKET</th>
            <th>TO_MEMBER</th>
            <th>Account Name</th>
            <th>TO_ACCOUNT</th>
            <th>TO_REFERENCE</th>
            <th>FROM_MEMBER</th>
            <th>Account Name</th>
            <th>FROM_ACCOUNT</th>
            <th>FROM_REFERENCE</th>
            <th>SYMBOL</th>
            <th>VOLUME</th>
            <th>PRICE</th>
            <th>TRADE_DATE</th>
            <th>TRADE_TIME</th>
            <th>SETTLEMENT_DATE</th>
            <th>TOTAL_VALUE</th>
            <th>INTEREST_VALUE</th>
            <th>TRADE_STATUS</th>
          </tr>
        </thead>
        <tbody>
          {post.map((r, i) => {
            return (
              <tr key={i}>
                <td> {r.EXTERNAL_TICKET} </td>
                <td> {r.TO_MEMBER}</td>
                <td>
                  {' '}
                  <InvestorName account={r.TO_ACCOUNT} />
                </td>
                <td> {r.TO_ACCOUNT}</td>
                <td> {r.TO_REFERENCE}</td>
                <td> {r.FROM_MEMBER}</td>
                <td>
                  {' '}
                  <InvestorName account={r.FROM_ACCOUNT} />
                </td>
                <td> {r.FROM_ACCOUNT}</td>
                <td> {r.FROM_REFERENCE}</td>
                <td> {r.SYMBOL}</td>
                <td> {r.VOLUME}</td>
                <td> {r.PRICE}</td>
                <td> {r.TRADE_DATE}</td>
                <td> {r.TRADE_TIME}</td>
                <td> {r.SETTLEMENT_DATE}</td>
                <td> {r.TOTAL_VALUE}</td>
                <td> {r.INTEREST_VALUE}</td>
                <td> {r.TRADE_STATUS}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcel;
