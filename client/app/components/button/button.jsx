import React from 'react';
import classnames from 'classnames/bind';
import * as icons from './svg';
import styles from './button.scss';

const cx = classnames.bind(styles);

const Button = (props) => {
  const { icon, theme, onClick } = props;

  const glyph = icons[icon];
  
  const handleButtonClick = () => {
    onClick();
  }

  return (
    <div
      className={cx('button', {
        [`button--theme-${theme}`]: theme,
      })}
      dangerouslySetInnerHTML={{ __html: glyph }}
      onClick={handleButtonClick}
    />
  );
};

export default Button;
