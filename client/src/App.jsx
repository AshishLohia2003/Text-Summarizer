import React, { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import Navbar from './components/Navbar';
import TextUpload from './components/TextUpload';

function App() {
  const [summary, setSummary] = useState('');

  return (
    <Box
      display="grid"
      justifyContent="center"
      alignItems="center"
    >
      <CssBaseline />
      <Box px={1}>
        <Navbar />
        {summary &&
        <Box
          p={2}
          mt={4}
          borderRadius="20px"
          boxShadow={"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"}
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant='h3' fontFamily="monospace">
            Summary
          </Typography>
          <Typography variant='h6' fontFamily="sans-serif">{summary}</Typography>
        </Box>}
      </Box>
      <Box
        px={1}
        my={3}
        width="98.5dvw"
        height="84dvh"
        sx={{ display: { xs: 'block', md: 'flex' } }}
        gap="10px"
        justifyContent="center"
        alignItems="center"
      >
        <FileUpload setSummary={setSummary} />
        <TextUpload setSummary={setSummary} />
      </Box>
    </Box>
  );
}

export default App;
