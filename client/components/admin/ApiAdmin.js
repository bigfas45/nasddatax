  export const createMail = ( report) => {

    return fetch(`/api/users/email/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: report,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
};
  
  export const createReport = (report) => {
    return fetch(`/api/securities/reports/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: report,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };



export const updateEmail = (EmailId, report) => {
  // console.log(name, email, password);
  return fetch(`/api/users/email/${EmailId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    
    },
    body: report,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const updateReports = (ReportsId, report) => {
  // console.log(name, email, password);
  return fetch(`/api/securities/reports/${ReportsId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body: report,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const updatePi = (ReportsId, report) => {
  // console.log(name, email, password);
  return fetch(`/api/brokers/member/${ReportsId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body: report,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};



export const getAdvancers = (date) => {
  return fetch(`/api/equity/inbox/${date}/${date}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};




