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
      fileObj: props.file,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const { fileObj } = this.state;

    this.extendFilesWithBase64(fileObj);
  }

  extendFilesWithBase64(file) {
    const { onGetBase64 } = this.props;
    const reader = new FileReader();

    reader.readAsDataURL(file.data);

    reader.onload = () => {
      const delay = Math.floor(Math.random() * 7000) + 1;

      window.setTimeout(() => {
        const newFileObj = {
          ...file,
          base64: reader.result.split(',')[1],
          done: true,
        };

        this.setState({
          fileObj: newFileObj,
        });
      }, delay);
    };

    reader.onerror = () => {
      console.log('Error: ', error);
    };

    onGetBase64(file);
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
    const { supportedFile } = this.props;
    const { hover, fileObj } = this.state;
    const { base64, done, data } = fileObj;
    const { name, type } = data;
    const isConverting = supportedFile && !base64;
    const fileIconTheme = getIconType(type);
    const iconStatusProps = getStatusIconProps(fileObj, supportedFile);

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
