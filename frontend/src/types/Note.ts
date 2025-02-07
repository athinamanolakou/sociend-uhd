export interface Note {
  id: number;
  text: string;
  status: 'DONE' | 'NOT STARTED' | 'IN PROGRESS';
  dueDate?: string;
}
