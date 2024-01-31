import React, { HTMLProps, forwardRef } from 'react';
import './TextArea.css';

type Props = HTMLProps<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  return <textarea {...props} ref={ref} className="textarea" />;
});
export default TextArea;
