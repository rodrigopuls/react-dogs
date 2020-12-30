import React from 'react';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import { COMMENT_POST } from '../../ApiHelper';
import { ReactComponent as SendSvg } from '../../Assets/enviar.svg';

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (validate(comment)) {
      const token = window.localStorage.getItem('token');
      const { url, options } = COMMENT_POST(id, { comment }, token);
      const { response, json } = await request(url, options);

      if (response.ok) {
        setComment('');
        setComments((comments) => [...comments, json]);
      }
    }
  }

  function validate(value) {
    if (value.length === 0) {
      // setError('Field cannot be empty.');
      return false;
    }
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        name="comment"
        id="comment"
        placeholder="woof-woof, arf-arf, ruff-ruff and bow-wow."
      />
      <button>
        <SendSvg />
      </button>

      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
