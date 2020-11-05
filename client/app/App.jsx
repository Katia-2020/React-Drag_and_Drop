import React from 'react';
import { Row, Column } from './components/grid';
import Icon from './components/icon';
import Text from './components/text';
import Button from './components/button';
import DropBox from './components/drop-box';
import Bar from './components/bar';
import styles from './reset.scss';

// const mockFiles = [
//   {
//     fullName: 'website.abobe',
//     name: 'website',
//     type: 'adobe',
//     done: false,
//   },
//   {
//     fullName: 'appdesign.pdf',
//     name: 'appdesign',
//     type: 'pdf',
//     done: false,
//   },
//   {
//     fullName: 'icon.jpeg',
//     name: 'icon',
//     type: 'jpeg',
//     done: false,
//   },
// ];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 40,
      files: [],
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // I want to select multiple files -DONE
  // 1. I want to be able to manage what files
  // I can upload based on the MIME type. (i.e. jpg only) -DONE
  // 2. I want to see an error in the list
  // (i.e. invalid file) if the files is not a valid file (see above) -DONE

  // 3. DIFFICULT LEVEL: ASIAN. I want to be able to convert files into base64 (progress bar)
  // - https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  // - https://developer.mozilla.org/en-US/docs/Web/API/FileReader

  // 4. DIFFICULT LEVEL: KIND OF ASIAN. I want to be able to remove files

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

  handleOnChange(event) {
    const { files } = this.state;
    const filesArray = Object.values(event.target.files);
    const newFiles = [files, filesArray].flat();
    const fileType = newFiles.map((item) => item.type);
    const fileName = newFiles.map((item) => item.name);
    const lastItemType = fileType[fileType.length - 1];
    const lastItemName = fileName[fileName.length - 1];

    if (lastItemType === 'application/pdf' || lastItemType === '' || lastItemType === 'image/jpeg') {
      this.setState({
        files: newFiles,
      });
    } else {
      alert(`the file ${lastItemName} is not a valid document`);
    }
  }

  render() {
    console.log(this.state);
    const { width, files } = this.state;

    return (
      <div className={styles['drop-drag']}>

        <div className={styles['drop-drag__header']}>
          <Text text="Upload" size="medium" color="blue" bold="bold" />
        </div>

        <div className={styles['drop-drag__body']}>
          {files.map((file, index) => {
            const { name, type, done } = file;
            const iconType = this.getIconType(type);
            return (
              <Row direction="row" key={index}>
                <Column shrink>
                  <Icon icon={iconType} theme={iconType} />
                </Column>

                <Column grow>
                  <Text text={name} color={done ? 'blue' : 'grey'} bold={done} />
                  <Bar theme={iconType} width={width} display={done ? 'none' : 'block'} />
                </Column>

                <Column shrink>
                  <Button icon={done ? 'done' : 'cancel'} theme={done ? 'green' : 'red'} />
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
