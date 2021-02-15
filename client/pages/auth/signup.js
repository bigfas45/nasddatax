import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [bCode, setBcode] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      firstname,
      lastname,
      bCode,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          ></input>
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control"
          ></input>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          ></input>
        </div>

        <div className="form-group">
          <label>Broker Code</label>
          <input
            value={bCode}
            onChange={(e) => setBcode(e.target.value)}
            className="form-control"
          ></input>
        </div>
        {errors}

        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
