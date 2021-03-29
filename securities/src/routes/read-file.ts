import express, { Request, Response, NextFunction } from 'express';
import { currentUser, BadRequestError } from '@nasddatax/common';
import { Reports } from '../models/reports';
import fs from 'fs';

const router = express.Router();

router.get(
  '/api/securities/report/read/:reportId',
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { reportId } = req.params;
    const existingReport = await Reports.findById(reportId);

    if (!existingReport) {
      throw new BadRequestError('Invalid credentials');
    }

    // @ts-ignore
    if (existingReport.file.data) {
      // @ts-ignore
      res.set('Content-Type', existingReport.file.contentType);
      // @ts-ignore
      var filePath = existingReport.file.path;
      // @ts-ignore
      return res.send(fs.readFileSync(filePath));
    }
    next();
  }
);

export { router as ReportReadRouter };
