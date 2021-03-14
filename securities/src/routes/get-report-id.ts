import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@nasddatax/common';
import { Reports } from '../models/reports';

const router = express.Router();

router.get('/api/securities/reports/:reportId', async (req: Request, res: Response) => {
  const { reportId } = req.params;

  const report = await Reports.findById(reportId);

  if (!report) {
    throw new NotFoundError();
  }

  res.send(report);
});

export { router as reportGetRouter };
