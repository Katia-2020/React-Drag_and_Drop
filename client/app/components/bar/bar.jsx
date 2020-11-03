import React from 'react';
import classnames from 'classnames/bind';
import styles from './bar.scss';

const cx = classnames.bind(styles);

const Bar = (props) => {
  const { theme, width, display } = props;

  const barWidthStyles = {
    width: `${width}%`,
  };

  return (
    <div className={cx('bar-container', {
      [`bar-container--display-${display}`]: display,
    })}
    >

      <div
        className={cx('bar', {
          [`bar--${theme}`]: theme,
        })}
        style={barWidthStyles}
      />
    </div>
  );
};

export default Bar;
