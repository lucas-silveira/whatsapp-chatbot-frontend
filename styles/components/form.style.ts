import {
  TextField as TextFieldMUI,
  FormControl as FormControlMUI,
  Button as ButtonMUI,
  Checkbox as CheckboxMUI,
  ExtendButtonBase,
  ButtonTypeMap,
} from '@material-ui/core';
import styled from 'styled-components';
import { lighten } from 'polished';
import { KeyboardDatePicker as KeyboardDatePickerMUI } from '@material-ui/pickers';

const formatDefaultMUIStyle = `
  label.Mui-focused {
    color: var(--primary-color);
  }

  .MuiFilledInput-underline:after {
    border-bottom-color: var(--primary-color);
  }

  .Mui-focused fieldset {
    border-color: var(--primary-color);
  }
`;

const deactiveInputAutofill = `
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px #fff inset !important;
  }
`;

export const TextField = styled(TextFieldMUI)`
  input {
    background-color: #fff;
    ${deactiveInputAutofill}
  }

  ${formatDefaultMUIStyle}
`;

export const PasswordField = styled(FormControlMUI)`
  input {
    background-color: #fff;
    ${deactiveInputAutofill}
  }

  .MuiFilledInput-root {
    background-color: #fff;
  }

  p {
    color: #f44336;
    font-size: 0.75rem;
    margin: 3px 14px 0;
  }

  ${formatDefaultMUIStyle}
`;

export const KeyboardDatePicker = styled(KeyboardDatePickerMUI).attrs(() => ({
  margin: 'normal',
}))`
  ${formatDefaultMUIStyle}
`;

export const SubmitButton = styled(ButtonMUI).attrs(() => ({
  type: 'submit',
  size: 'large',
}))`
  min-height: 50px;
  color: #fff;
  background-color: var(--primary-color);
  padding: 12px 0;

  &:hover {
    background-color: ${lighten(0.07, '#52489C')};
  }
`;

interface MyFormButtonProps extends ExtendButtonBase<ButtonTypeMap> {
  name?: string;
  isSending?: boolean;
}

export const FormButton = styled(ButtonMUI)
  .attrs(() => ({
    size: 'large',
  }))
  .withConfig({
    shouldForwardProp: prop => !['isSending'].includes(prop),
  })<MyFormButtonProps>`
  min-width: ${props => (props.isSending ? '50px' : '200px')};
  min-height: 50px;
  color: #fff;
  background-color: var(--primary-color);
  padding: 12px 22px;
  transition: min-width 500ms;

  &:hover {
    background-color: ${lighten(0.07, '#52489C')};
  }
`;

interface MyButtonProps extends ExtendButtonBase<ButtonTypeMap> {
  name?: string;
  color?: string;
  bgColor?: string;
}

export const Button = styled(ButtonMUI)
  .attrs(() => ({
    size: 'small',
  }))
  .withConfig({
    shouldForwardProp: prop => !['bgColor'].includes(prop),
  })<MyButtonProps>`
  color: ${props => props.color || '#fff'};
  background-color: ${props => props.bgColor || '#52489C'};
  padding: 5px 14px;
  transition: min-width 500ms;

  &:hover {
    background-color: ${props => lighten(0.07, props.bgColor || '#52489C')};
  }
`;

export const Checkbox = styled(CheckboxMUI)`
  &.Mui-checked {
    color: var(--secondary-color);
  }
`;
