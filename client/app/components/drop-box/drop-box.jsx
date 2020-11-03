import React from 'react';
import Text from '../text';
import { Row, Column } from '../grid';

import styles from './drop-box.scss';

const DropBox = (props) => {
  const { onDrop, onClick } = props;

  const handleOnDrop = () => {
    onDrop();
  };

  const handleButtonClick = () => {
    onClick();
  };

  const handleInputClick = () => {
    onClick();
  };

  return (
    <div className={styles['drop-box']} onDragOver="return false" onDrop={handleOnDrop}>
      <Row direction="row">
        <Column>
          <Text
            text="Drag files here or"
            color="grey"
            size="small"
            bold="bold"
          />
        </Column>
        <Column>
          <input
            type="file"
            className={styles['input']}
            onClick={handleInputClick}
          />
          <Text
            text="browse"
            color="blue"
            size="small"
            bold="bold"
            margin="left"
            cursor="pointer"
            onClick={handleButtonClick}
          />
        </Column>

      </Row>
    </div>
  );
};

export default DropBox;
