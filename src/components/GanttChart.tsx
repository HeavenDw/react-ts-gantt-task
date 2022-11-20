import React, { FC } from 'react';
import styles from '../styles/GanttChart.module.scss';
import { FormattedTask, ProjectData } from '../types';
import Tasks from './Tasks';
import TimeTable from './TimeTable';

interface GanttChartProps {
  projectData: ProjectData;
  tasks: FormattedTask[];
}

const GanttChart: FC<GanttChartProps> = ({ projectData, tasks }) => {
  // Get array with start time and end time
  const periodArray = projectData.period.split('-');
  // Calculate months number (PeriodEndTime - PeriodStartTime)
  const monthNumber =
    Number(periodArray.at(-1)!.slice(3, 5)) - Number(periodArray.at(0)!.slice(3, 5));

  return (
    <div className={styles.gantt}>
      <div className={styles.grid}>
        <Tasks task={projectData.chart} />
        <TimeTable tasks={tasks} monthNumber={monthNumber} />
      </div>
    </div>
  );
};

export default GanttChart;
