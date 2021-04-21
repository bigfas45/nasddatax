import express, { Request, Response, NextFunction } from 'express';
import { Reports } from '../models/reports';
import { Bod } from '../models/bod';

import { BadRequestError } from '@nasddatax/common';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import fastcsv from 'fast-csv';
import csv from 'csv-parser';

const router = express.Router();

router.post(
  '/api/surveillance/upload/:fileId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { fileId } = req.params;
    const existingReport = await Reports.findById(fileId);

    if (!existingReport) {
      throw new BadRequestError('Invalid credentials');
    }
    // @ts-ignore
    let csvData = [];

    // @ts-ignore
    if (existingReport.file.data) {
      // @ts-ignore
      var filePath = existingReport.file.path;
      // @ts-ignore
      fs.createReadStream(filePath)
        .pipe(csv())
        // @ts-ignore
        .on('data', (row) => {
          
          csvData.push({
            member_code: row.member_code,
            account: row.account,
            security: row.security,
            volume: row.volume,
            net_pending: row.net_pending,
            available: row.available,
            investor_name: row.investor_name,
            date: row.date,
          });
        })
        // @ts-ignore
        .on('end', () => {
            // @ts-ignore
          Bod.insertMany(csvData, (err, result) => {
            if (err) {
              console.log(`Error: ${err} rows`);
            }
            console.log(`Inserted: ${result} rows`);
          });

          console.log('CSV file successfully processed.');
          
        });
    }

    res.send('CSV file successfully processed.');
  }
);

export { router as UploadRouter };
