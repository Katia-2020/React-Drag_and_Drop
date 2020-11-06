import React from 'react';
import { Row, Column } from './components/grid';
import Icon from './components/icon';
import Text from './components/text';
import Button from './components/button';
import DropBox from './components/drop-box';
import Bar from './components/bar';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      uploading: false,
      uploadProgress: 0,
      successfullyUploaded: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  getIconType(type) {
    let iconType = '';

    if (type === 'application/pdf') {
      iconType = 'pdf';
    }

    if (type === 'image/jpeg') {
      iconType = 'jpeg';
    }

    if (type === '') {
      iconType = 'adobe';
    }

    return iconType;
  }

  extendFilesWithBase64(files) {
    const newFiles = [...files];

    newFiles.forEach(file => {
      const reader = new FileReader();

      reader.readAsDataURL(file.data);

      reader.onload = () => {
        const newFileObj = {
          ...file,
          base64: reader.result.split(',')[1],
          done: true,
        };

        const foundFileIndex = files.findIndex((item) => item.id === newFileObj.id);

        newFiles[foundFileIndex] = newFileObj;

        this.setState({
          files: newFiles,
        });
      };

      reader.onerror = () => {
        console.log('Error: ', error);
      };
    });
  }

  // create a spinner component
  // render the spinner component when the file is not converted yet
  // fix the bugs (name, icon etc)
  // when I am hovering the file item replace the tick icon with a remove button
  // remove the file when I click on the delete button.
  // show an error item if the file is not supported (check MIME type from props)
  // have a read to web workers: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

  // <InputFile types={['jpg', 'png']} />
  // <InputFileItem done={done} name={name} extension={extension} />

  // if (lastItemType === 'application/pdf' || lastItemType === '' || lastItemType === 'image/jpeg')

  handleOnChange(event) {
    const { files } = this.state;

    const filesArray = Object.values(event.target.files)
      .map((item, index) => ({
        id: files.length + index,
        done: false,
        supportedFile: this.getSupportedFileStatus(item);
        base64: undefined,
        data: item,
      }));

    const newFiles = [files, filesArray].flat();

    this.setState({
      files: newFiles,
    });

    this.extendFilesWithBase64(newFiles);
  }

  handleButtonClick() {

  }

  render() {
    console.log(this.state);
    const { files } = this.state;

    return (
      <div className={styles['drop-drag']}>

        <div className={styles['drop-drag__header']}>
          <Text text="Upload" size="medium" color="blue" bold="bold" />
        </div>

        <div className={styles['drop-drag__body']}>
          {files.map((file) => {
            const { name, type, done } = file;
            const iconType = this.getIconType(type);
            return (
              <Row direction="row" key={file.id}>
                <Column shrink>
                  <Icon icon={iconType} theme={iconType} />
                </Column>

                <Column grow>
                  <Text text={name} color={done ? 'blue' : 'grey'} bold={done} />
                  {done ? 'done' : 'converting'}
                  {/* <Bar theme={iconType} width={uploadProgress} display={done ? 'none' : 'block'} /> */}
                </Column>

                <Column shrink>
                  <Button
                    icon={done ? 'done' : 'cancel'}
                    theme={done ? 'green' : 'red'}
                    onClick={this.handleButtonClick}
                  />
                </Column>
              </Row>
            );
          })}
        </div>

        <div>
          <DropBox className={styles['drop-drag__footer']} onChange={this.handleOnChange} />
        </div>

      </div>

    );
  }
}

export default App;
