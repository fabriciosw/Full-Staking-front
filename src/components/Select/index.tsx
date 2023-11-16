/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { alpha, styled } from '@mui/material';

const inputColor = '#17171A';
const textsColor = '#EAEAEA';
const focusColor = '#4b5efb';

const StyledButton = styled('button')(
  () => `
  font-family: Nunito, IBM Plex Sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 3.625rem;
  min-width: 100%;
  padding: .75rem;
  border-radius: .5rem;
  border: #2e373f 2px solid;
  text-align: left;
  line-height: 1.5;
  background: ${inputColor};
  color: ${textsColor};

  &.${selectUnstyledClasses.expanded}{
    outline: 2px solid ${focusColor};
    box-shadow: ${alpha(focusColor, 0.25)} 0 0 0 0.4rem;
    border-color: focusColor;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    box-shadow: #2e373f 0 0 0 2px;

  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${focusColor};
    outline: 1px solid ${focusColor};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled('ul')(
  () => `
  font-family: Nunito,IBM Plex Sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 6px;
  margin: .75rem 0;
  min-width: 20rem;
  max-height: 20rem;
  border-radius: .5rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  /* Espaço de rolagem */
  &::-webkit-scrollbar-track {
    border-radius: 0.625rem;
    background-color: #2e373f;
  }
  /* Barra de rolagem */
  &::-webkit-scrollbar-thumb {
    border-radius: 0.625rem;
    background: #4b5efb !important;
  }
  background: ${inputColor};
  color: ${textsColor};

  &:focus {
    box-shadow: #2e373f 0 0 0 2px;
  }
  `
);

const StyledOption = styled(OptionUnstyled)(
  () => `
  list-style: none;
  padding: .75rem;
  border-radius: .5rem;
  cursor: pointer;
  margin-bottom: .5rem;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: #3C4AC7;
    color: ${textsColor};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #2e373f;
    color: ${textsColor};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #3C4AC7;
    color: ${textsColor};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${textsColor};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #2e373f;
    color: ${textsColor};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  width: 100%;
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect<TValue extends {}>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const components: SelectUnstyledProps<TValue>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
}) as <TValue extends {}>(props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLButtonElement>) => JSX.Element;

interface IOption {
  name: string;
  value: string | number;
}

interface Props {
  selectOptions: IOption[];
  defaultValue?: string | number;
  value: string | number;
  onChange: (e: React.ChangeEvent<EventTarget> | null, newValue: string | number | null) => void;
}

const Select: React.FunctionComponent<Props> = ({
  selectOptions,
  defaultValue,
  onChange,
  value,
}: Props): React.ReactElement => (
  <div style={{ position: 'relative' }}>
    <CustomSelect defaultValue={defaultValue} value={value} onChange={onChange}>
      {React.Children.toArray(
        [...selectOptions].map(({ name: optName, value: optValue }) => (
          <StyledOption value={optValue}>{optName}</StyledOption>
        ))
      )}
    </CustomSelect>
  </div>
);

export default Select;
