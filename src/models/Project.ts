export interface Project {
  id: string;
  name: string;
  description?: string;
  address: string;
  area: number;
  year: number;
  floor: number;
  status: 'planning' | 'in_progress' | 'completed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement database schema and queries
