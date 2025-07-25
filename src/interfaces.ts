export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: Array<T>;
}

export interface ProjectAttributes {
  id: number;
  projectName: string;
  description?: string;
  repositoryUrl?: string;
}
