import React from 'react';
import classnames from 'classnames/bind';
import * as icons from './svg';
import styles from './icon.scss';

const cx = classnames.bind(styles);

const Icon = (props) => {
  const { icon, theme, size } = props;
  const glyph = icons[icon];

  return (
    <i
      className={cx('icon', {
        [`icon--theme-${theme}`]: theme,
        [`icon--size-${size}`]: size,
      })}
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
};

export default Icon;
