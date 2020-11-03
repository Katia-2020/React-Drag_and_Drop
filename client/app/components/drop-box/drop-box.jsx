import React from 'react';
import Text from '../text';
import { Row, Column } from '../grid';

import styles from './drop-box.scss';

const DropBox = () => (
  <div className={styles['drop-box']}>
    <Row direction="row">
      <Column>
        <Text
          text="Drag files here or"
          color="grey"
          size="medium"
        />
      </Column>
      <Column>
        <Text
          text="browse"
          color="blue"
          size="medium"
          bold="bold"
        />
      </Column>

    </Row>
  </div>
);

export default DropBox;
