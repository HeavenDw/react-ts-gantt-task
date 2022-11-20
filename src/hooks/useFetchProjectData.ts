import { formatChartToTasksArray } from './../utils/helpers';
import { ProjectData, FormattedTask } from './../types/index';
import { useState, useEffect } from 'react';

export const useFetchProjectData = (url: string) => {
  const [formattedTasks, setFormattedTasks] = useState<FormattedTask[]>([]);
  const [projectData, setProjectData] = useState<ProjectData>({ project: 'init proj', period: 'init period', chart: { id: 0, title: 'init chart' } });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data: ProjectData[] = await response.json();
      setProjectData(data[0]);
      setFormattedTasks([{ id: 100001, title: '' }, ...formatChartToTasksArray(data[0].chart), { id: 10000, title: '' }]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return { loading, error, formattedTasks, projectData }
}