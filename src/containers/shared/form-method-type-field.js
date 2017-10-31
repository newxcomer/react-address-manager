import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { CONSTANTS } from '../../constants/constants';

export default field => (
  <FormGroup>
    <ControlLabel>{field.label}</ControlLabel>
    <FormControl componentClass="select" {...field.input}>
      <option value={CONSTANTS.METHOD_TYPE_NORMAL_VALUE}>{CONSTANTS.METHOD_TYPE_NORMAL}</option>
      <option value={CONSTANTS.METHOD_TYPE_MAP_VALUE}>{CONSTANTS.METHOD_TYPE_MAP}</option>;
    </FormControl>
    {field.meta.touched && field.meta.error &&
      <HelpBlock>{<span>{field.meta.error}</span>}</HelpBlock>}
  </FormGroup>
);
