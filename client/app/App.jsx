import React from 'react';
import { Row, Column } from './components/grid';
import Icon from './components/icon';
import Text from './components/text';
import Button from './components/button';
import DropBox from './components/drop-box';
import styles from './reset.scss';

const files = [
  {
    name: 'website.adobe',
    type: 'adobe',
    done: true,
  },
  {
    name: 'appdesign.pdf',
    type: 'pdf',
    done: false,
  },
  {
    name: 'icon.jpeg',
    type: 'jpeg',
    done: false,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className={styles['drop-drag-container']}>

        <div>
          <Text text="upload" />
        </div>

        <div>
          {files.map((file) => {
            const { name, type, done } = file;
            return (
              <Row direction="row">
                <Column shrink>
                  <Icon icon={type} theme={type} />
                </Column>

                <Column grow>
                  <Text text={name} color={done ? 'blue' : 'grey'} />
                </Column>

                <Column shrink>
                  <Button icon={done ? 'done' : 'cancel'} theme={type} />
                </Column>
              </Row>
            );
          })}
        </div>

        <div>
          <DropBox />
        </div>

      </div>

    );
  }
}

export default App;
