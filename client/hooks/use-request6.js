import axios from 'axios';
import { useState } from 'react';

const useRequest6 = ({ url, method, body, onSuccess }) => {
  const [errors6, setErrors] = useState(null);
  const [loading6, setLoading] = useState(false);
  const [success6, setSuccess] = useState(false);
  const doRequest6 = async (props = {}) => {
    try {
      setErrors(null);
      setLoading(true);
      const response = await axios[method](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        setLoading(false);
        setSuccess(true);
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setLoading(false);
      console.log({ err });

      setErrors(
        <div className="example-alert">
          {err.response.data.errors.map((err) => (
            <div
              key={err.message}
              className="alert alert-fill alert-danger alert-dismissible alert-icon"
            >
              <em className="icon ni ni-cross-circle"></em>
              {err.message}
              <button className="close" data-dismiss="alert"></button>
            </div>
          ))}{' '}
        </div>
      );
    }
  };

  return { doRequest6, errors6, loading6, success6 };
};

export default useRequest6;
