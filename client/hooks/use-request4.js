import axios from 'axios';
import { useState } from 'react';

const useRequest4 = ({ url, method, body, onSuccess }) => {
  const [errors4, setErrors] = useState(null);
  const [loading4, setLoading] = useState(false);
     const [success4, setSuccess] = useState(false);
  const doRequest4 = async (props = {}) => {
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

  return { doRequest4, errors4, loading4, success4 };
};

export default useRequest4;
