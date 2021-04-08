import axios from 'axios';
import { useState } from 'react';

const useRequest1 = ({ url, method, body, onSuccess }) => {
  const [errors1, setErrors] = useState(null);
  const [loading1, setLoading] = useState(false);

  const doRequest1 = async (props = {}) => {
    try {
      setErrors(null);
      setLoading(true);
      const response = await axios[method](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        setErrors('');
        setLoading(false);
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

  return { doRequest1, errors1, loading1 };
};

export default useRequest1;
