import React, { FC } from 'react';
import { levels, months } from '../data/constants';
import styles from '../styles/TimeTable.module.scss';
import { FormattedTask } from '../types';
import { createFormattedDateFromStr, getDaysDifference, getDaysInMonth } from '../utils/helpers';

interface TimeTableProps {
  tasks: FormattedTask[];
  monthNumber: number;
}

const TimeTable: FC<TimeTableProps> = ({ tasks, monthNumber }) => {
  const startTime = tasks.map((task) => task.period_start).sort()[0];

  // Array with weeks dates
  let weekRow: React.ReactElement[] = [];

  // Array with day dates
  let dayRow: React.ReactElement[] = [];
  // Array with day rows
  const dayRows: React.ReactElement[][] = [];

  // Array with tasks cells
  let taskRow: React.ReactElement[] = [];
  // Array with task rows
  const taskRows: React.ReactElement[] = [];

  // Start month
  const month = new Date(startTime!);

  // Last time week pushed, need for week rows
  const lastTime = new Date(month.getFullYear(), month.getMonth(), 1);
  const currentDate = new Date(month.getFullYear(), month.getMonth(), 1);

  // Generate weeks and days for table
  for (let i = 0; i < monthNumber; i++) {
    // How many days in current month
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);

    for (let j = 1; j <= numDays; j++) {
      // Days difference between current date and last time
      const daysDifference = Math.floor((+currentDate - +lastTime) / (3600 * 24 * 1000));
      // If difference = 6 push week in row
      if (daysDifference === 6) {
        weekRow.push(
          <div key={`${i}-${j}`} className={styles.week}>
            <span className={styles.ganttTimePeriodSpan}>
              {lastTime.getDate() + ' ' + months[lastTime.getMonth()]} -{' '}
              {j + ' ' + months[currentDate.getMonth()]}
            </span>
          </div>,
        );
        lastTime.setDate(lastTime.getDate() + 7);
      }

      const checkWeekend = currentDate.getDay() === 6 || currentDate.getDay() === 0;

      dayRow.push(
        <div
          key={j}
          className={styles.day}
          style={{ color: checkWeekend ? 'var(--color-opacity-light)' : '' }}>
          {j}
        </div>,
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    dayRows.push(dayRow);

    dayRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  //Generate tasks cells and rows for table
  if (tasks) {
    tasks.forEach((task) => {
      const currentDate = new Date(startTime!);
      for (let i = 0; i < monthNumber; i++) {
        const curYear = currentDate.getFullYear();
        const curMonth = currentDate.getMonth() + 1;

        // How many days in current month
        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(curYear, curMonth, j);

          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              className={styles.ganttTimePeriodCell}
              data-task={task?.id}
              data-date={formattedDate}>
              {tasks.map((el, i) => {
                if (el?.id === task?.id && el?.period_start === formattedDate) {
                  return (
                    <div
                      key={el?.id}
                      className={styles.taskBar}
                      style={{
                        width: `calc(${getDaysDifference(
                          el?.period_start,
                          el?.period_end || '',
                        )} * 100%)`,
                        backgroundColor: task?.nestingLevel
                          ? levels[task?.nestingLevel - 1].color
                          : 'transparent',
                        borderColor: task?.nestingLevel
                          ? levels[task?.nestingLevel - 1].borderColor
                          : 'transparent',
                      }}>
                      <h3 className={styles.taskTitle}>{task.title}</h3>
                    </div>
                  );
                }
                return null;
              })}
            </div>,
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id}`} className={styles.ganttTimePeriod}>
            {taskRow}
          </div>,
        );

        taskRow = [];
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });
  }

  return (
    <div
      className={styles.timeTable}
      style={{ gridTemplateColumns: `repeat(${monthNumber}, 1fr)` }}>
      <div className={styles.weekRow}>{weekRow}</div>
      <div className={styles.dayRow}>{dayRows}</div>
      <div
        className={styles.timeLines}
        style={{ gridTemplateColumns: `repeat(${monthNumber}, 1fr)` }}>
        {taskRows}
      </div>
    </div>
  );
};

export default TimeTable;
