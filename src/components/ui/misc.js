import React from 'react';
import { Link } from 'react-router-dom';

// create a title or link
export const Tag = props => {
  const { link, linkTo, bck, size, color, add, children } = props;
  const temp = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color,
        padding: '5px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        // additional styles
        ...add,
      }}
    >
      {children}
    </div>
  );

  if (link) {
    return (
      <Link to={linkTo}>
        {temp}
      </Link>
    );
  }
  return temp;
};

// get data from firebase
export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export const reverseArray = array => {
  let reverseArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    reverseArray.push(array[i]);
  }

  return reverseArray;
};


export const validate = element => {
  // [valid?, message]
  let error = [true, ''];
  const { validation, value } = element;

  // is a valid email
  if (validation.email) {
    const valid = /\S+@\S+\.\S+/.test(value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  // is a field empty
  if (validation.required) {
    const valid = value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};
