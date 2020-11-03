import React from 'react';
import { Row, Column } from './components/grid';
import Icon from './components/icon';
import Text from './components/text';
import Button from './components/button';
import DropBox from './components/drop-box';
import Bar from './components/bar';
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
      <div className={styles['drop-drag']}>

        <div className={styles['drop-drag__header']}>
          <Text text="Upload" size="medium" color="blue" bold="bold" />
        </div>

        <div className={styles['drop-drag__body']}>
          {files.map((file, index) => {
            const { name, type, done } = file;
            return (
              <Row direction="row" key={index}>
                <Column shrink>
                  <Icon icon={type} theme={type} />
                </Column>

                <Column grow>
                  <Text text={name} color={done ? 'blue' : 'grey'} bold={done} />
                  <Bar theme={type} width={40} display={done ? 'none' : 'block'} />
                </Column>

                <Column shrink>
                  <Button icon={done ? 'done' : 'cancel'} theme={done ? 'green' : 'red'} />
                </Column>
              </Row>
            );
          })}
        </div>

        <div>
          <DropBox className={styles['drop-drag__footer']} />
        </div>

      </div>

    );
  }
}

export default App;
