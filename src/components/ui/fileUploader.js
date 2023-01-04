import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../firebase';
import FileUploaderPackage from 'react-firebase-file-uploader';
import ProgressBar from './ProgressBar';

export default class FileUploader extends Component {

  state = {
    name: '',
    isUploading: false,
    fileURL: '',
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  }

  handleUploadError = () => {
    this.setState({
      isUploading: false,
    });
  }

  handleUploadSuccess = fn => {
    // fn - filename
    const { dir, filename } = this.props;

    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(dir)
      .child(fn)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url,
        });
      });

    filename(fn);
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    const { defaultImg, defaultImgName } = props;

    if (defaultImg) {
      return state = {
        name: defaultImgName,
        fileURL: defaultImg,
      };
    }
    return null;
  }

  uploadAgain = () => {
    const { resetImg } = this.props;

    this.setState({
      name: '',
      isUploading: false,
      fileURL: '',
    });

    resetImg();
  }

  render() {
    const { name, fileURL, isUploading } = this.state;
    const { dir, tag } = this.props;

    return (
      <>
        {
          !fileURL ?
            <>
              <div className="label_input">
                {tag}
              </div>
              <FileUploaderPackage
                randomizeFilename
                accept="image/*"
                name="image"
                storageRef={
                  firebase.storage().ref(`${dir}`)
                }
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
              />
            </> :
            ''
        }

        <ProgressBar isLoading={isUploading} />

        {
          fileURL ?
            <div className="image_upload_container">
              <img
                src={fileURL}
                style={{ width: '100%' }}
                alt={name}
              />
              <button
                type="button"
                className="remove"
                onClick={() => this.uploadAgain()}
              > Remove </button>
            </div> :
            ''
        }
      </>
    );
  }
}

FileUploader.propTypes = {
  dir: PropTypes.string,
  tag: PropTypes.string,
  defaultImg: PropTypes.string,
  defaultImgName: PropTypes.string,
  resetImg: PropTypes.func,
  filename: PropTypes.func,
};
