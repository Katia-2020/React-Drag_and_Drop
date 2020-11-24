import React from 'react';
import Text from '../text';
import { Row, Column } from '../grid';
import Icon from '../icon';

import styles from './drop-box.scss';

const DropBox = (props) => {
  const { onChange } = props;

  const handleOnChange = (event) => {
    onChange(event);
  };

  return (
    <div className={styles['drop-box']}>
      <label className={styles['drop-box__label']} htmlFor="choose-files">
        <input
          id="choose-files"
          type="file"
          name="choose-files"
          className={styles['input']}
          onChange={handleOnChange}
          multiple
        />
        <Row direction="column" center>
          <Column>
            <Icon
              icon="dropbox"
              theme="blue"
              size="large"
            />
          </Column>
          <Row direction="row" center>
            <Text
              text="Drag files here or"
              color="grey"
              size="small"
              bold="bold"
            />
            <Text
              text="browse"
              color="blue"
              size="small"
              bold="bold"
              margin="left"
            />
          </Row>
        </Row>
      </label>
    </div>
  );
};

export default DropBox;
