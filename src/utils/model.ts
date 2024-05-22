
export type TODO_STATUS = 'DONE' | 'PENDING';
export type FilterValue = TODO_STATUS | undefined;

export interface TodoType {
    title: string,
    id: string,
    status: TODO_STATUS,
}