import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { TaskArea } from '../../components/task-area/taskArea';
import { SidebarArea } from '../../components/sidebar-area/sidebar';

export const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight='100vh' p={0} m={0}>
      <TaskArea />
      <SidebarArea />
    </Grid>
  );
}
