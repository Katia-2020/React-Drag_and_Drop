import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './row.scss';

const cx = classnames.bind(styles);

const Row = (props) => {
  const { direction, children } = props;

  return (
    <div
      className={cx('grid', {
        [`grid--${direction}`]: direction,
      })}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
};

Row.defaultProps = {
  direction: 'row',
};

export default Row;
