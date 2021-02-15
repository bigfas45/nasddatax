import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@nasddatax/common';
import {IndexRouter} from './routes/index'
import {BrokersBuyRouter} from './routes/buy-trades'
import {BrokersSellRouter} from './routes/sell-trades'
import {Top10Router} from './routes/top-10'
import {MySellRouter} from './routes/my-sell-trade'
import {MyBuyRouter} from './routes/my-buy-trade copy'
// import {TradeLogRouter} from './routes/trade-log'


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
app.use(BrokersBuyRouter);
app.use(BrokersSellRouter);
app.use(Top10Router);
app.use(MySellRouter);
app.use(MyBuyRouter);
// app.use(TradeLogRouter);

app.get('*', async (req, res ) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };