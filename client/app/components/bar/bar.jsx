import React from 'react';
import styles from './bar.scss';

const Bar = (props) => {
  const { theme, width, display } = props;

  const barWidthStyles = {
    width: `${width}%`,
  };

  return (
    <div className={styles['bar-container']}>
      <div
        className={styles[`bar bar--${theme} bar--display-${display}`]}
        style={barWidthStyles}
      />
    </div>
  );
};

export default Bar;
