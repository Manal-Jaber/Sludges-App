import React from 'react';
import './index.scss';

interface Button {
  className?: string;
  text: string;
  disabled?: boolean;
  listener?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<Button> = ({
  className = '',
  text,
  disabled,
  listener,
}) => {
  return (
    <button
      className={`btn-primary ${className ? className : ''}`}
      onClick={listener}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
