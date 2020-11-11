import React from 'react';
import { Row, Column } from '../grid';
import Icon from '../icon';
import Button from '../button';
import Spinner from '../spinner';
import Text from '../text';
import { getIconType, getStatusIconProps } from './file.utilities';
import styles from './file.scss';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { onClick, file } = this.props;

    onClick(file.id);
  }

  handleMouseEnter() {
    this.setState({
      hover: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      hover: false,
    });
  }

  render() {
    const { file, supportedFile } = this.props;
    const { hover } = this.state;
    const { name, type } = file.data;
    const { base64, done } = file;
    const isConverting = supportedFile && !base64;
    const fileIconTheme = getIconType(type);
    const iconStatusProps = getStatusIconProps(file, supportedFile);

    return (
      <div
        className={styles.file}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row direction="row" gutters="small">
          <Column shrink>
            <Icon
              icon={supportedFile ? fileIconTheme : 'failure'}
              theme={supportedFile ? fileIconTheme : 'red'}
              size="large"
            />
          </Column>

          <Column grow>
            <div className={styles['text-container']}>
              <Text text={name} color={done ? 'blue' : 'grey'} bold={done} />

              {!supportedFile && (
                <Text text="sorry, this extension is not supported" />
              )}

              {isConverting && (
                <Spinner
                  theme={fileIconTheme}
                  numbers={['one', 'two', 'three']}
                  display={done ? 'none' : 'block'}
                />
              )}
            </div>
          </Column>

          {done && (
            <Column shrink>
              {hover ? (
                <Button onClick={this.handleButtonClick}>
                  <Icon icon="cancel" theme="red" size="small" />
                </Button>
              ) : (
                <Icon
                  icon={iconStatusProps.icon}
                  theme={iconStatusProps.theme}
                  size="small"
                />
              )}
            </Column>
          )}
        </Row>
      </div>
    );
  }
}

export default File;
