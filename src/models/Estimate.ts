export interface Estimate {
  id: string;
  projectId: string;
  sectionType: string;
  contractorName?: string;
  amount: number;
  currency: string;
  description?: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement database schema and queries
