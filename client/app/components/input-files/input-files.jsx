import React from 'react';
import File from '../file';
import styles from './input-files.scss';

const mimeTypes = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
  'application/pdf': 'pdf',
  'image/jpeg': 'jpeg',
};

const InputFiles = (props) => {
  const {
    types,
    files,
    onClick,
    onGetBase64,
  } = props;

  const handleButtonClick = (id) => {
    onClick(id);
  };

  const extendFilesWithBase64 = (file) => {
    onGetBase64(file);
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
            onGetBase64={extendFilesWithBase64}
          />
        );
      })}
    </div>
  );
};

export default InputFiles;
