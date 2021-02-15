import React, { Fragment, useEffect, useState, Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ExportToExcel = ({ post2 }) => {
  return (
    <div style={{ marginRight: '25px' }}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="export"
        table="table-to-xls"
        filename="securityData2"
        sheet="tablexls"
        buttonText="Export"
      />
      <table hidden="true" id="table-to-xls">
        <thead>
          <tr>
            <th>PI</th>
            <th>PI CODE</th>
            <th>Deals</th>
            <th>Value</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {post2.map((r, i) => {
            return (
              <tr key={i}>
                <td> {r.from_member_name} </td>
                <td> {r.member_code}</td>
                <td> {r.fromCount}</td>
                <td> {r.fromValue}</td>
                <td> {r.fromVolume}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcel;
