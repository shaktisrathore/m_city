import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../ui/formFields';
import FileUploader from '../../ui/fileUploader';

const Form = ({
  formType,
  formError,
  formSuccess,
  defaultImg,
  image,
  name,
  lastname,
  number,
  position,
  handleChange,
  submitForm,
  resetImg,
  storeFilename
}) => {
  return (
    <div className="editplayers_dialog_wrapper">
      <h2> {formType} </h2>
      <form onSubmit={e => submitForm(e)}>

        <FileUploader
          dir='players'
          tag={'Player image'}
          defaultImg={defaultImg}
          defaultImgName={image.value}
          resetImg={e => resetImg(e)}
          filename={fn => storeFilename(fn)}
        />

        <FormField
          id='name'
          formData={name}
          handleChange={e => handleChange(e)}
        />

        <FormField
          id='lastname'
          formData={lastname}
          handleChange={e => handleChange(e)}
        />

        <FormField
          id='number'
          formData={number}
          handleChange={e => handleChange(e)}
        />

        <FormField
          id='position'
          formData={position}
          handleChange={e => handleChange(e)}
        />

        <div className="success_label">
          {formSuccess}
        </div>
        {
          formError ?
            <div className="error_label">
              Something is wrong
            </div> :
            ''
        }

        <div className="admin_submit">
          <button onClick={e => submitForm(e)}>
            {formType}
          </button>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.string,
  formError: PropTypes.bool,
  formSuccess: PropTypes.string,
  defaultImg: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.object,
  lastname: PropTypes.object,
  number: PropTypes.object,
  position: PropTypes.object,
  handleChange: PropTypes.func,
  submitForm: PropTypes.func,
  resetImg: PropTypes.func,
  storeFilename: PropTypes.func,
};

export default Form;
