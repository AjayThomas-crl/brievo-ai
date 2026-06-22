export type Analysis = {
  summary: string;
  tasks: {
    task: string;
    priority: string;
    description: string;
    date: string;
    time: string;
    duration: string;
  }[];
};

export type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  analysis: Analysis;
};