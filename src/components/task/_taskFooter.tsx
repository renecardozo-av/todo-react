import React, { FC, ReactElement } from 'react';
import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../create-task-form/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (
  props
): ReactElement => {

  const {
    id,
    status,
     onStatusChange = (e) => console.log(e),
     onClick = (e) => console.log(e)
  } = props;
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mt={4}
    >
      <FormControlLabel
        label='In Progress'
        control={
          <Switch
            color='warning'
            onChange={(e) => onStatusChange(e, id)}
            defaultChecked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant='contained'
        color='success'
        size='small'
        sx={{
          color: '#ffffff'
        }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
}