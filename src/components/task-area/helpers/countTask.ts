import { TaskCounterStatusType } from "../../task-counter/interfaces/ITaskCounter";
import { ITaskApi } from "../interfaces/ITaskApi";

export const countTask = (
  tasks: ITaskApi[],
  status: TaskCounterStatusType
): number => {
  if (!tasks || !Array.isArray(tasks)) {
    return 0;
  }
  return tasks.filter(task => task.status === status).length;
}
