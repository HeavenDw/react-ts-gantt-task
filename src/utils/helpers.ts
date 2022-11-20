import { Chart, FormattedTask } from "../types";

export const getDaysDifference = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const difference = end - start;
  const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  return days;
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
}

export const createFormattedDateFromStr = (year: number, month: number, day: number): string => {
  let monthStr = month.toString();
  let dayStr = day.toString();

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`;
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`;
  }
  return `${year}-${monthStr}-${dayStr}`;
}

export const formatChartToTasksArray = (task: Chart, nestingLevel = 1): FormattedTask[] => {
  if (!task) {
    return [];
  }

  let tasksArray: FormattedTask[] = [];
  tasksArray.push({ ...task, nestingLevel });

  if (task.hasOwnProperty('sub')) {
    task.sub!.forEach((child) => {
      tasksArray = [...tasksArray, ...formatChartToTasksArray(child, nestingLevel + 1)];
    });
  }

  return tasksArray;
};