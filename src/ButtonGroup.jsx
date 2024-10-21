import React from 'react';
import Button from '@mui/material/Button';

export const ButtonGroup = ({ saveSelection, resetSelection }) => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={saveSelection}
        style={{ marginRight: '10px' }}
      >
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetSelection}>
        Reset
      </Button>
    </div>
  );
};
