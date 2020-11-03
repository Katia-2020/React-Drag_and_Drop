import React from 'react';
import styles from './bar.scss';

const Bar = (props) => {
  const { theme, width } = props;

  const barWidthStyles = {
    width: `${width}%`,
  };

  return (
    <div
      className={styles[`bar bar--${theme}`]}
      style={barWidthStyles}
    />
  );
};

export default Bar;
