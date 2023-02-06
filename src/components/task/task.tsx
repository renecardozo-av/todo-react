import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Priority } from '../create-task-form/enums/Priority';
import { Status } from '../create-task-form/enums/Status';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (
  props
): ReactElement => {

  const {
    title = 'Test Title',
    date = new Date(),
    description = 'Lorem ipsum dolor sit amet',
    priority = Priority.normal,
    status = Status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
    id
  } = props;
  return (
    <Box
      display='flex'
      width='100%'
      justifyContent='flex-start'
      flexDirection='column'
      mb={2}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority)
      }}
    >
      <TaskHeader title={title} date={date}/>
      <TaskDescription description={description}/>
      <TaskFooter
        id={id}
        status={status as Status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
}