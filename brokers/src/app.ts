import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@nasddatax/common';
import {IndexRouter} from './routes/index'
import {BrokersBuyRouter} from './routes/buy-trades'
import {BrokersSellRouter} from './routes/sell-trades'
import {Top10Router} from './routes/top-10'
import { MySellRouter } from './routes/my-sell-trade';
import { MyBuyRouter } from './routes/my-buy-trade copy';
import { DealingMeberRouter } from './routes/dealing-meber';
import { DealingMemberUpdateRouter } from './routes/update-dealing-member';
import { DealingMemberAddRouter } from './routes/add-dealing-meber';
import { DealingMemberGetRouter } from './routes/get-dealing-member';
import { MyBuyRangeRouter } from './routes/my-buy-tradeRange';
import { MySellRangeRouter } from './routes/my-sell-trade-range';

import { IndexConnectRouter } from './routes/connect-care';

import { IndexEmail1Router} from './routes/email-connect-1';

import { UserUpdateRouter} from './routes//update';


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
app.use(DealingMeberRouter);
app.use(DealingMemberUpdateRouter);
app.use(DealingMemberAddRouter);
app.use(DealingMemberGetRouter);
app.use(MyBuyRangeRouter);
app.use(MySellRangeRouter);
app.use(IndexConnectRouter);
app.use(IndexEmail1Router);
app.use(UserUpdateRouter);


app.get('*', async (req, res ) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };