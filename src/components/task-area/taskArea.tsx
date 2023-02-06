import React, {
  FC,
  ReactElement,
  useContext,
  useEffect } from 'react';
import {
  Grid,
  Box,
  Alert,
  LinearProgress
 } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../task-counter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../create-task-form/enums/Status';
import { IUpdateTask } from '../create-task-form/interfaces/IUpdateTask';
import { countTask } from './helpers/countTask';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {

  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  const { error, isLoading, data, refetch } = useQuery(
    ['tasks'],
    async () => {
      return await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/tasks',
        'GET'
      )
    }
  );

  const updateTaskMutation = useMutation(
    (data: IUpdateTask) => sendApiRequest(
      'http://localhost:3200/tasks',
      'PUT',
      data
    )
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked
        ? Status.inProgress
        : Status.todo
    })
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed
    });
  }

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if(updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);


  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>
          Status Of Your Tasks As On {' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid
        container
        display='flex'
        justifyContent='center'
      >
        <Grid
          item
          display='flex'
          flexDirection='row'
          justifyContent='space-around'
          alignItems='center'
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={
              data
                ? countTask(data, Status.todo)
                : undefined
            }
          />
          <TaskCounter
            status={Status.inProgress}
            count={
              data
                ? countTask(data, Status.inProgress)
                : undefined
            }
          />
          <TaskCounter
            status={Status.completed}
            count={
              data
                ? countTask(data, Status.completed)
                : undefined
            }
          />
        </Grid>
        <Grid
          item
          display='flex'
          flexDirection='column'
          xs={10}
          md={8}
        > 
          <>
            {error && (
              <Alert severity='error'>
                There was an error fetching your tasks
              </Alert>
            )}
            {
              !error && Array.isArray(data) && !data.length && (
                <Alert severity='warning'>
                  You do not have any tasks created yet.
                  Start by creating some tasks.
                </Alert>
              )
            }
          </>
          {isLoading ? (
            <LinearProgress/>
          ) : (
            Array.isArray(data) && data.length  &&
            data.map((each, index) => {
              return each.status === Status.todo ||
                each.status === Status.inProgress ? (
                <Task
                  key={index}
                  id={each.id}
                  title={each.title}
                  date={new Date(each.date)}
                  description={each.description}
                  priority={each.priority}
                  status={each.status}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                />
              ) : (false)
            })
          )}
        </Grid>ß
      </Grid>
    </Grid>
  );
}
