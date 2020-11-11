import React from 'react';
import File from '../file';
import styles from './inputFiles.scss';

const mimeTypes = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
  'application/pdf': 'pdf',
  'image/jpeg': 'jpeg',
};

const InputFiles = (props) => {
  const { types, files, onClick } = props;

  const handleButtonClick = (id) => {
    onClick(id);
  };

  const isSupportedFile = (fileType) => types.includes(mimeTypes[fileType]);

  return (
    <div className={styles['input-files']}>
      {files.map((file) => {
        const fileType = file.data.type;
        return (
          <File
            key={file.id}
            file={file}
            onClick={handleButtonClick}
            supportedFile={isSupportedFile(fileType)}
          />
        );
      })}
    </div>
  );
};

export default InputFiles;
