import React from 'react';
import classnames from 'classnames/bind';
import * as icons from './svg';
import styles from './button.scss';

const cx = classnames.bind(styles);

const Button = (props) => {
  const { icon, theme } = props;

  const glyph = icons[icon];

  return (
    <div
      className={cx('button', {
        [`button--theme-${theme}`]: theme,
      })}
      dangerouslySetInnerHTML={{ __html: glyph}}
    />
  );
}

export default Button;
