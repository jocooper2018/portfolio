interface Tool {
  readonly name: string;
}

interface Project {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description: string;
  readonly tools: Tool[];
}

export default interface ProjectsData {
  readonly data: Project[];
}
