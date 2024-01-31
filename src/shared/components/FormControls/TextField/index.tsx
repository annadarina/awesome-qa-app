import React, { HTMLProps, forwardRef } from 'react';
import './TextField.css';

const TextField = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props: HTMLProps<HTMLInputElement>, ref) => {
    return <input {...props} ref={ref} className="textfield" type="text" />;
  }
);

export default TextField;
