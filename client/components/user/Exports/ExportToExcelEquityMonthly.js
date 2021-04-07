import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportToExcelEquityMonthly = ({post, start, end}) => {



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
          {start === '' ? (
            ''
          ) : (
            <tr>
              <th>Ranage Start: </th>
              <th>{start}</th>
              <th>Ranage End: </th>
              <th>{end}</th>
            </tr>
          )}

          <tr>
            <th>SECURITY</th>
            <th>SYMBOL</th>
            <th>HIGEST CLOSE</th>
            <th>LOWEST CLOSE</th>
            <th>DEALS</th>
            <th>VOLUME</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          {post.map((r, i) => {
            return (
              <tr key={i}>
                <td> {r.SECURITY} </td>
                <td> {r.SYMBOL}</td>
                <td> {r.MAX_CLOSE_PRICE}</td>
                <td> {r.MIN_CLOSE_PRICE}</td>
                <td> {r.sumDeals}</td>
                <td> {r.sumVolume}</td>
                <td> {r.sumValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcelEquityMonthly;
