import React from 'react';
import Text from './components/text';
import DropBox from './components/drop-box';
import InputFiles from './components/inputFiles';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  extendFilesWithBase64(files) {
    const newFiles = [...files];

    newFiles.forEach(file => {
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

          const foundFileIndex = files.findIndex((item) => item.id === newFileObj.id);

          newFiles[foundFileIndex] = newFileObj;

          this.setState({
            files: newFiles,
          });
        }, delay);
      };

      reader.onerror = () => {
        console.log('Error: ', error);
      };
    });
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

    this.extendFilesWithBase64(newFiles);
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

  render() {
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
