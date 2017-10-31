import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

export default field => (
  <FormGroup>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl {...field.input} />
    {field.meta.touched && field.meta.error && <HelpBlock>
      {<span>{field.meta.error}</span>}</HelpBlock>}
  </FormGroup>
);
