import { useState, Fragment, React } from 'react';
import Ticker from '../components/ticker';
import Layout from '../components/layout';
import Nsi from '../components/nsi';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Highcharts from '../components/HighChart';
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));






const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  const marketStatus = () => {
    let date2 = new Date().getHours();
    let weekday = new Date().toLocaleString('en-us', { weekday: 'long' });
    if (
      date2 >= 10 &&
      date2 < 15 &&
      weekday !== 'Saturday' &&
      weekday !== 'Sunday'
    ) {
      return <span className="badge  badge-md badge-primary">MARKET OPEN</span>;
    } else {
      return (
        <span className="badge  badge-md badge-danger">MARKET CLOSED</span>
      );
    }
  };
  const date = () => {
    let date = new Date().toLocaleString();
    return date;
  };

  const TopLayer = () => {
    const classes = useStyles();
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Paper className={classes.paper}>{marketStatus()}</Paper>
            </Grid>
            <Grid item xs>
              {' '}
              <Paper className={classes.paper}>
                <span className="badge  badge-md badge-warning">
                  MARKET NUMBERS FOR:{date()}
                </span>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img
                  src="/assets/images/NASD-LOGO-PLC (1).png"
                  height="33"
                  className="App-logo mt5"
                  alt="logo"
                />
              </Paper>
            </Grid>
            <Grid item xs>
              {' '}
              <Paper className={classes.paper}>
                {currentUser ? (
                  currentUser.userType === 1 ? (
                    <a href="#" className="btn btn-primary">
                      <em className="icon ni ni-dashboard"></em>
                      <span>Admin</span>{' '}
                      <em className="icon ni ni-arrow-long-right"></em>
                    </a>
                  ) : (
                    <a href="/user/dashboard" className="btn btn-primary">
                      <em className="icon ni ni-dashboard"></em>
                      <span>Dashboard</span>{' '}
                      <em className="icon ni ni-arrow-long-right"></em>
                    </a>
                  )
                ) : (
                  <Link href="/auth/signin">
                    <a href="/auth/signin" className="btn btn-primary">
                      <em className="icon ni ni-dashboard"></em>
                      <span>Login</span>{' '}
                      <em className="icon ni ni-arrow-long-right"></em>
                    </a>
                  </Link>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout title="Landing | NASD Data Portal" description="" />
      <body className="nk-body npc-crypto bg-white has-sidebar">
        {TopLayer()}
        {/* <Nsi /> */}
        <Ticker />

        <Highcharts></Highcharts>
      </body>
    </Fragment>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
