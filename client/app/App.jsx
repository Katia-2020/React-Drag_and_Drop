import React from 'react';
import Text from './components/text';
import DropBox from './components/drop-box';
import InputFiles from './components/input-files';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      filesWithBase64: [],
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.extendFilesWithBase64 = this.extendFilesWithBase64.bind(this);
  }

  handleOnChange(event) {
    const { files } = this.state;

    const filesArray = Object.values(event.target.files)
      .map((item, index) => ({
        id: files.length + index,
        done: false,
        base64: undefined,
        data: item,
      }));

    const newFiles = [files, filesArray].flat();

    this.setState({
      files: newFiles,
    });
  }

  handleButtonClick(id) {
    const { files } = this.state;
    const newFilesArray = [...files];
    const foundIndex = newFilesArray.findIndex((file) => file.id === id);
    newFilesArray.splice(foundIndex, 1);

    this.setState({
      files: newFilesArray,
    });
  }

  extendFilesWithBase64(file) {
    const { filesWithBase64 } = this.state;
    const newFilesArrayWithBase64 = [...filesWithBase64];
    newFilesArrayWithBase64.push(file);

    this.setState({
      filesWithBase64: newFilesArrayWithBase64,
    });
  }

  render() {
    // console.log(this.state);
    const { files } = this.state;

    return (
      <div className={styles['drop-drag']}>
        <div className={styles['drop-drag__header']}>
          <Text text="Upload" size="medium" color="blue" bold="bold" />
        </div>

        <div className={styles['drop-drag__body']}>
          <InputFiles
            types={['jpeg', 'word', 'excel', 'pdf']}
            files={files}
            onClick={this.handleButtonClick}
            onGetBase64={this.extendFilesWithBase64}
          />
        </div>

        <div className={styles['drop-drag__footer']}>
          <DropBox onChange={this.handleOnChange} />
        </div>
      </div>
    );
  }
}

export default App;
