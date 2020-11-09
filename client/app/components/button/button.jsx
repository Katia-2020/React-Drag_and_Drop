import React from 'react';
import styles from './button.scss';

const Button = (props) => {
  const {
    children,
    onClick,
  } = props;

  const handleButtonClick = () => {
    onClick();
  };

  return (
    <div
      className={styles.button}
      onClick={handleButtonClick}
    >
      {children}
    </div>
  );
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
