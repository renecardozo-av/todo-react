import React, { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

interface IProfile {
  firstName: string;
  lastName: string
}

export const ProfileArea: FC<IProfile> = (props): ReactElement => {
    const { firstName, lastName } = props;

    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar
          sx={{
            width: '96px',
            height: '96px',
            backgroundColor: 'primary.main',
            marginBottom: '16px'
          }}
        >
          <Typography variant='h4' color='text.primary'>
            {
              `${firstName.substring(0,1)}${lastName.substring(0,1)}`
            }
          </Typography>
        </Avatar>

        <Typography variant='h6' color='text.primary'>
          {`Welcome, ${firstName} ${lastName}`}
        </Typography>

        <Typography variant='body1' color='text.primary'>
          This is your personal tasks manager
        </Typography>
      </Box>
    )
}