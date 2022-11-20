export interface Chart {
  id: number;
  title: string;
  period_start?: string;
  period_end?: string;
  sub?: Chart[];
}

export interface FormattedTask extends Chart {
  nestingLevel?: number;
}

export interface ProjectData {
  project: string;
  period: string;
  chart: Chart;
}