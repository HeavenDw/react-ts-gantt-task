import React from 'react';
import { useFetchProjectData } from '../hooks/useFetchProjectData';
import styles from '../styles/App.module.scss';
import GanttChart from './GanttChart';
import Header from './Header';

const App = () => {
  const apiUrl = 'https://637773345c477765121e1a1f.mockapi.io/data';
  // Fetch porject data from api
  const { loading, error, formattedTasks, projectData } = useFetchProjectData(apiUrl);

  if (error) {
    return <div>Error (try reload page)</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={styles.main}>
      <Header projectTilte={projectData.project} period={projectData.period} />
      <GanttChart projectData={projectData} tasks={formattedTasks} />
    </div>
  );
};

export default App;
