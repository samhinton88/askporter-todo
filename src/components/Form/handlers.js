import { parseValue } from './helpers';

export const handleChange = ({ 
  updatePeople, 
  updateLocation, 
  updateUrgency,
  updateTitle 
}) => ({ target: { value }}) => {
  const updateMap = { 
    people: people => updatePeople(prev => [...prev, ...people]), 
    location: location => updateLocation(location), 
    urgency: urgency => updateUrgency(urgency)
  };

  const { profile, adjustments } = parseValue(value);

  Object.keys(profile).forEach(key => updateMap[key](profile[key]));

  const newValue = adjustments.length < 1 ? value : value.split(' ').slice(0,value.split(' ').length -2).join(' ')
  updateTitle(newValue);
}

export const handleSubmit = ({ error, dispatch, action, onDismiss, ...data}) => () => {
  // block submission on error
  if (error) return;
  dispatch(action(data));
  onDismiss();
};