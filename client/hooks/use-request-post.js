import axios from 'axios';
import { useState } from 'react';

const useRequestPost = ({ url, method, body, onSuccess }) => {
  const [errorsPost, seterrorsPost] = useState(null);
  const [loadingPost, setloadingPost] = useState(false);

  const doRequestPost = async (props = {}) => {
    try {
      seterrorsPost(null);
      setloadingPost(true);
      const response = await axios[method](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        seterrorsPost('');
        setloadingPost(false);
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setloadingPost(false);
        console.log({ err });
      seterrorsPost(
        <div className="example-alert">
          {/* {err.response.data.errorsPost.map((err) => (
            <div
              key={err.message}
              className="alert alert-fill alert-danger alert-dismissible alert-icon"
            >
              <em className="icon ni ni-cross-circle"></em>
              {err.message}
              <button className="close" data-dismiss="alert"></button>
            </div>
          ))}{' '} */}
        </div>
      );
    }
  
  };

  return { doRequestPost, errorsPost, loadingPost };
};

export default useRequestPost;
