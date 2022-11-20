import React, { FC } from 'react';
import styles from '../styles/Header.module.scss';
import ExportButton from './ExportButton';

interface HeaderProps {
  projectTilte: string;
  period: string;
}

const Header: FC<HeaderProps> = ({ projectTilte, period }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.projectTitle}>
        {projectTilte} / {period}
      </h1>

      <ExportButton />
    </div>
  );
};

export default Header;
