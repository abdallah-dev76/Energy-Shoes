import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import TextInput from '../index';

describe('TextInput Component', () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    mockOnValueChange.mockClear();
  });

  it('renders correctly with basic props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<TextInput onValueChange={mockOnValueChange} />);
    });
  });

  it('renders with label', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput onValueChange={mockOnValueChange} label="Email Address" />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.label).toBe('Email Address');
  });

  it('shows required indicator', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput
          onValueChange={mockOnValueChange}
          label="Password"
          required={true}
        />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.required).toBe(true);
  });

  it('displays error message', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput
          onValueChange={mockOnValueChange}
          errorMessage="This field is required"
        />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.errorMessage).toBe('This field is required');
  });

  it('renders as search bar', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput onValueChange={mockOnValueChange} isSearchBar={true} />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.isSearchBar).toBe(true);
  });

  it('renders as password input', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput onValueChange={mockOnValueChange} isPassword={true} />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.isPassword).toBe(true);
  });

  it('accepts custom backgroundColor', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput
          onValueChange={mockOnValueChange}
          backgroundColor="#F0F0F0"
        />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.backgroundColor).toBe('#F0F0F0');
  });

  it('renders without border when noBorder is true', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput onValueChange={mockOnValueChange} noBorder={true} />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.noBorder).toBe(true);
  });

  it('passes through placeholder prop', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <TextInput
          onValueChange={mockOnValueChange}
          placeholder="Enter your email"
        />,
      );
    });

    const textInputElement = component.root.findByType(TextInput);
    expect(textInputElement.props.placeholder).toBe('Enter your email');
  });

  it('renders complete form input', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <TextInput
          onValueChange={mockOnValueChange}
          label="Email"
          placeholder="Enter your email"
          required={true}
          errorMessage=""
        />,
      );
    });
  });
});
