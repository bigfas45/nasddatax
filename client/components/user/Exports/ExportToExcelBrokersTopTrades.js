import React, { Fragment, useEffect, useState, Component } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import moment from 'moment'
const ExportToExcel = ({post, start, end}) => {



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
            <th>Start Range</th>
            <th>{moment(start).format('LL')}</th>
            <th>End Range</th>
            <th>{moment(end).format('LL')}</th>
          </tr>
          <tr>
            <th>PI</th>
            <th>CODE</th>
            <th>COUNT</th>
            <th>VALUE</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        <tbody>
          {post.map((r, i) => {
            return (
              <tr key={i}>
                <td> {r.member_name} </td>
                <td> {r.toMember}</td>
                <td> {r.count}</td>
                <td> {parseFloat(r.y).toFixed(0)}</td>
                <td> {parseFloat(r.volume).toFixed(0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportToExcel;
