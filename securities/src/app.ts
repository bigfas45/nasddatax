import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@nasddatax/common';
import {IndexRouter} from './routes/index'
import {SymbolRouter} from './routes/security-symbol'
import {TradeRouter} from './routes/securities-trade'
import {SecurityMcapRouter} from './routes/securities-mcap'
import {SecuritySumTradeRouter} from './routes/securities-sum-trades'
import {SecuritySumVolumeRouter} from './routes/securities-sum-volumes'
import {PerformanceStartRouter} from './routes/security-performace-index-start-date'
import {PerformanceEndRouter} from './routes/security-performace-index-end-date'
import {PerformanceRouter} from './routes/security-performace'


const app = express();
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(IndexRouter);
app.use(SymbolRouter);
app.use(TradeRouter);
app.use(SecurityMcapRouter);
app.use(SecuritySumTradeRouter);
app.use(SecuritySumVolumeRouter);
app.use(PerformanceStartRouter);
app.use(PerformanceEndRouter);
app.use(PerformanceRouter);



app.get('*', async (req, res ) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };