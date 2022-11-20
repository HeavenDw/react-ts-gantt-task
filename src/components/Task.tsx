import React, { FC, useState } from 'react';
import { levels } from '../data/constants';
import styles from '../styles/Task.module.scss';
import { Chart } from '../types';

interface TaskProps {
  id?: number;
  title: string;
  sub?: Chart[];
  nestingLevel?: number;
}

const Task: FC<TaskProps> = ({ id, title, sub, nestingLevel = 1 }) => {
  const [isOpen, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  // +20px left padding for each nesting level
  const paddingValue = nestingLevel * 20;

  return (
    <div>
      <div
        className={styles.task}
        style={{ paddingLeft: paddingValue + 'px', cursor: sub ? 'pointer' : 'default' }}
        onClick={handleClick}>
        <div className={styles.icons} style={{ paddingLeft: sub ? '0' : '20px' }}>
          {sub && (
            <svg
              style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.862 5.52867C2.98702 5.40369 3.15656 5.33348 3.33333 5.33348C3.51011 5.33348 3.67965 5.40369 3.80467 5.52867L8 9.724L12.1953 5.52867C12.2568 5.46499 12.3304 5.41421 12.4117 5.37927C12.4931 5.34433 12.5805 5.32594 12.6691 5.32517C12.7576 5.3244 12.8454 5.34127 12.9273 5.37479C13.0092 5.40831 13.0837 5.45781 13.1463 5.5204C13.2089 5.583 13.2584 5.65743 13.2919 5.73936C13.3254 5.8213 13.3423 5.90908 13.3415 5.9976C13.3407 6.08612 13.3223 6.1736 13.2874 6.25494C13.2525 6.33627 13.2017 6.40984 13.138 6.47133L8.47133 11.138C8.34631 11.263 8.17678 11.3332 8 11.3332C7.82322 11.3332 7.65369 11.263 7.52867 11.138L2.862 6.47133C2.73702 6.34632 2.66681 6.17678 2.66681 6C2.66681 5.82322 2.73702 5.65369 2.862 5.52867Z"
                fill="#6D6E85"
              />
            </svg>
          )}
          {levels[nestingLevel - 1].icon}
          <span className={styles.subLength}>{sub ? sub.length : 0}</span>
        </div>
        <h3 className={styles.taskTitle}>{title}</h3>
      </div>
      {/* If have childrens -> render Task for each children */}
      {sub &&
        isOpen &&
        sub.map((task) => (
          <Task key={task.id} title={task.title} sub={task.sub} nestingLevel={nestingLevel + 1} />
        ))}
    </div>
  );
};

export default Task;
