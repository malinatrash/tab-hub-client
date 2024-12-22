export interface Project {
  id?: number;
  name: string;
  owner_id: number;
  state?: string;
}

export interface ProjectCreateRequest {
  name: string;
}
