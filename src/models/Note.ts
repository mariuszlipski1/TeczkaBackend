export interface Note {
  id: string;
  projectId: string;
  sectionId?: string;
  title: string;
  content: string;
  tags?: string[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement database schema and queries
