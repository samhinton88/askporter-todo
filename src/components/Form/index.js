import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import { connect } from 'react-redux';
import { addTodo, updateTodo } from '../../actions';
import Button from '../common/Button';
import Input from '../common/Input';
import { 
  iconsFromProfile
} from './helpers';
import { emptiness, accrueErrors } from './validations';
import { colors } from './config';
import {
  FormContainer,
  StyledInputSection,
  StyledControlSection,
  ButtonGroup,
  ControlGroup,
  ErrorMessage,
  StyledErrorSection,
  ColorIndicator
} from './form.style';
import { handleChange, handleSubmit} from './handlers';

const isEmptyObject = obj => Object.keys(obj).length === 0 && obj.constructor === Object

const listenForBlockers = (updateInputShouldShowErrors) => (...predicates) => {
  updateInputShouldShowErrors(prev => [...prev, ...predicates])
}

const Form = ({ dispatch, onDismiss, preloadedFormData: pd = {} }) => {
  const [title, updateTitle] = useState(pd.title || '');
  const [color, updateColor] = useState(pd.color || null);
  const [location, updateLocation] = useState(pd.location || '');
  const [people, updatePeople] = useState(pd.people || []);
  const [urgency, updateUrgency] = useState(pd.urgency || 0);
  const [inputShouldShowErrors, updateInputShouldShowErrors] = useState([]);
  
  const titleErrors = accrueErrors([emptiness])(title);
  const error = titleErrors.errors.length > 0;

  const rightChildren = iconsFromProfile({ people, location, urgency, updatePeople, updateLocation });
  const stateHandlers = { updatePeople, updateLocation, updateUrgency, updateTitle };
  
  let submissionData = { 
    error, title, people, urgency, location: location && location.value,
    color, dispatch, onDismiss 
  };
  
  const action = !isEmptyObject(pd) 
    ? data => updateTodo(pd.id, data)
    : data => addTodo(data)

  submissionData = { ...submissionData, action };

  return (
    <FormContainer>
      <StyledInputSection>
        <Input 
          leftChildren={color && <ColorIndicator color={ color }/>}
          rightChildren={ rightChildren }
          error={ error } 
          placeholder='Describe your todo: add a location with @ - people with & - urgency with !' 
          value={ title } 
          onChange={ handleChange(stateHandlers)} 
          readyToDisplayErrors={ listenForBlockers(updateInputShouldShowErrors) }
        />
      </StyledInputSection>
      <StyledControlSection>
        <ControlGroup> 
          <CirclePicker 
            onChange={({ hex }) => updateColor(hex)}
            circleSize={ 20 }
            colors={ colors }
          />
        </ControlGroup>
        <ButtonGroup>
          <Button tertiary onClick={onDismiss}>Cancel</Button>
          <Button primary onClick={ handleSubmit(submissionData) }>
            {isEmptyObject(pd) ? 'ADD TO DO': 'UPDATE'}
          </Button>
        </ButtonGroup>
      </StyledControlSection>
      <StyledErrorSection>
        {
          error && inputShouldShowErrors.some((e => e)) && (
            <ErrorMessage>
              {[titleErrors].map(error => error.errors).map((err, i) => <p key={ i }>{err}</p>)}
            </ErrorMessage>
          )
        }
      </StyledErrorSection>
    </FormContainer>
  )
}

const mapStateToProps = (state) => {
  const { preloadedFormData } = state.ui;
  return {
    preloadedFormData
  }
}

export default connect(mapStateToProps)(Form);
