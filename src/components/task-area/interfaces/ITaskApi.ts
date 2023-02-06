import { Priority } from '../../create-task-form/enums/Priority';
import { Status } from '../../create-task-form/enums/Status';

export interface ITaskApi {
  id: string;
  date: string;
  description: string;
  priority: `${Priority}`; // It creates a unios of all enum defined in Priority
  status: `${Status}`;
  title: string;
}