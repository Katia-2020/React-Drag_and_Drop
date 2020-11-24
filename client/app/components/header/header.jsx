import React from 'react';
import styles from './header.scss';
import Text from '../text';

const Header = ({ extensions }) => (
  <div className={styles['drop-drag__header']}>
    <Text text="Upload you files" size="medium" color="blue" bold="bold" />
    <Text text={`Files supported: ${extensions}`} size="xsmall" color="light-grey" bold="light" />
  </div>
);

export default Header;
