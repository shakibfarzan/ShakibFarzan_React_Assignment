import {
  createSelector,
  createSlice,
  PayloadAction,
  Selector,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type TaskType = {
  id: number;
  title?: string;
  description?: string;
  status?: 'ToDo' | 'In Progress' | 'Blocked' | 'InQA' | 'Done' | 'Deployed';
};

let lastID = 0;

const initialState: TaskType[] = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: (state, action: PayloadAction<Omit<TaskType, 'id'>>) => {
      state.push({ id: lastID++, ...action.payload });
    },
    taskEdited: (state, action: PayloadAction<TaskType>) => {
      const index = state.findIndex(
        (task: TaskType) => task.id === action.payload.id,
      );
      state[index].title = action.payload.title;
      state[index].status = action.payload.status;
      state[index].description = action.payload.description;
    },
    taskRemoved: (state, action: PayloadAction<Pick<TaskType, 'id'>>) => {
      const index = state.findIndex(
        (task: TaskType) => task.id === action.payload.id,
      );
      state.splice(index, 1);
    },
  },
});

export const getAllTasks = createSelector(
  (state: RootState) => state.tasks,
  (tasks) => tasks,
);

export const getTaskById = (
  taskId: number,
): Selector<RootState, TaskType | undefined> =>
  createSelector(
    (state: RootState) => state.tasks,
    (tasks) => tasks.find((task: TaskType) => task.id === taskId),
  );

export const { taskAdded, taskRemoved, taskEdited } = taskSlice.actions;

export default taskSlice.reducer;
