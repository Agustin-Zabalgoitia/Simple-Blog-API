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

export interface UserAttributes {
  id: number;
  username: string;
  roleId: number;
  password: string;
  email?: string;
  deleted: boolean;
}

export interface BlogAttributes {
  id: number;
  projectId: number;
  userId: number;
  title: string;
  content: string;
}

export interface RoleAttributes {
  id: number;
  name: string;
}

export interface TokenData {
  id: number;
  roleId: number;
  username: string;
  email?: string;
  iat: number;
  exp: number;
}
