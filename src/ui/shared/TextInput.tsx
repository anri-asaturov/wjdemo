import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface ITextInputProps {
  defaultValue?: string;
  placeholder?: string;
  small?: boolean;
  icon?: () => JSX.Element;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledInput = styled.input<{ small?: boolean; icon: any }>`
  font-size: 1.3rem;
  color: ${p => p.theme.color};
  width: 100%;
  height: ${p => (p.small ? p.theme.inputHeightSmall : p.theme.inputHeight)};
  padding: 0 1.2rem 0 ${p => (p.icon ? 3.2 : 1.2)}rem;
  background: ${p => p.theme.inputBackground};
  border: none;
  border-radius: 0.5rem;
  appearance: none;
  ::placeholder {
    color: ${p => p.theme.inputPlaceholderColor};
  }
  &:disabled {
    color: ${p => p.theme.inputDisabledColor};
  }
`;

const IconContainer = styled.div`
  color: ${p => p.theme.inputPlaceholderColor};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 3rem;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.3rem 0.3rem 0.4rem;
`;

@observer
export default class TextInput extends React.Component<ITextInputProps> {
  static defaultProps = {
    defaultValue: '',
    placeholder: '',
    small: false
  };

  @observable value = this.props.defaultValue;

  @action.bound
  handleChange(ev: ChangeEvent<HTMLInputElement>) {
    this.value = ev.target.value;
  }

  render() {
    return (
      <Container>
        {this.props.icon ? (
          <IconContainer className="svgfill">
            <this.props.icon />
          </IconContainer>
        ) : null}
        <StyledInput
          className="theme-transition"
          type="text"
          value={this.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          small={this.props.small}
          icon={this.props.icon}
        />
      </Container>
    );
  }
}
