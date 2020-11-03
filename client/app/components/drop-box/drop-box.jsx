import React from 'react';
import styles from './drop-box.scss';
import Text from '../text';

const DropBox = () => (
  <div className={styles['drop-box']}>
    <Text
      text="Drag files here or"
      color="grey"
      size="medium"
    />
    <Text
      text="browse"
      color="blue"
      size="medium"
      bold="bold"
    />
  </div>
);

export default DropBox;
