import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@nasddatax/common';

import { IndexRouter } from './routes/index';
import { TickerRouter } from './routes/ticker';
import { UsiRouter } from './routes/usi';

import { MarketIndexTRouter } from './routes/market-index-today';
import { MarketIndexYRouter } from './routes/market-index-yesterday';
import { OtctotaldealsRouter } from './routes/otc-trades-ytd';
import { OtctotaldealsMonthRouter } from './routes/otc-trades-month';
import { OtctotaldealsweekRouter } from './routes/otc-trades-weekly';
import { OtctotaldealsLastMonthRouter } from './routes/otc-trades-last-month';
import { InboxRouter } from './routes/inbox';
import { InboxDateRouter } from './routes/indox-trade-date';
import { InboxDateReportRouter } from './routes/inbox-trade-report';
import { LivetradeRouter } from './routes/live-trade';
import { PriceListRouter } from './routes/price-list';
import { YearSummaryRouter } from './routes/year-summary-trades';
import { SummaryRangeRouter } from './routes/trade-summary-range';
import { YearSumRouter } from './routes/year-summary-range';
import { EodRouter } from './routes/eod';

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
app.use(TickerRouter);
app.use(UsiRouter);
app.use(MarketIndexTRouter);
app.use(MarketIndexYRouter);
app.use(OtctotaldealsRouter);
app.use(OtctotaldealsMonthRouter);
app.use(OtctotaldealsweekRouter);
app.use(OtctotaldealsLastMonthRouter);
app.use(InboxRouter);
app.use(InboxDateRouter);
app.use(InboxDateReportRouter);
app.use(LivetradeRouter);
app.use(PriceListRouter);
app.use(YearSummaryRouter);
app.use(SummaryRangeRouter);
app.use(YearSumRouter);
app.use(EodRouter);

app.get('*', async (req, res ) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };