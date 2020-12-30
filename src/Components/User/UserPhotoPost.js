import React from 'react';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../ApiHelper';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import { useNavigate } from 'react-router-dom';
import styles from './UserPhotoPost.module.css';

const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');
  const [img, setImg] = React.useState({});
  const navigate = useNavigate();

  const { data, request, error, loading } = useFetch();

  React.useEffect(() => {
    if (data) navigate('/account');
  }, [data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      name.validate() &&
      weight.validate() &&
      age.validate() &&
      img.raw.size > 0
    ) {
      const formData = new FormData();
      formData.append('img', img.raw);
      formData.append('nome', name.value);
      formData.append('peso', weight.value);
      formData.append('idade', age.value);

      const token = window.localStorage.getItem('token');
      const { url, options } = PHOTO_POST(formData, token);
      const { response } = await request(url, options);
    }
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="name" {...name} />
        <Input
          label="Weight"
          type="number"
          min="1"
          max="99"
          step="1"
          name="weight"
          {...weight}
        />
        <Input
          label="Age"
          type="number"
          min="1"
          max="99"
          step="1"
          name="age"
          {...age}
        />
        <input
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
          accept="image/png, image/jpeg"
          className={styles.fileInput}
        />
        {loading ? <Button disabled>Adding...</Button> : <Button>Add</Button>}

        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
