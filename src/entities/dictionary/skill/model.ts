export interface Skill {
  id: string;
  name?: string | null;
  parent?: (string | null) | Skill;
  updatedAt: string;
  createdAt: string;
}
