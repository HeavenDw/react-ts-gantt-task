import React, { FC } from 'react';
import styles from '../styles/Tasks.module.scss';
import { Chart } from '../types';
import Task from './Task';

interface TasksProps {
  task: Chart;
}

const Tasks: FC<TasksProps> = ({ task }) => {
  return (
    <div className={styles.tasks}>
      <div className={styles.header}>Work item</div>
      <div>
        <div className={styles.empty}></div>
        {task && <Task id={task.id} title={task.title} sub={task.sub} />}
        <div className={styles.empty}></div>
      </div>
    </div>
  );
};

export default Tasks;
