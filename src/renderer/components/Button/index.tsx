import React from 'react';
import './index.scss';

interface Button {
  className?: string;
  text: string;
  listener?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<Button> = ({ className = '', text, listener }) => {
  return (
    <button
      className={`btn-primary ${className ? className : ''}`}
      onClick={listener}
    >
      {text}
    </button>
  );
};

export default Button;
