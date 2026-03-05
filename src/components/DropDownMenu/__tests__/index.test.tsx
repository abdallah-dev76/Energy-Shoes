import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import DropDownMenu from '../index';

// Mock react-native-element-dropdown
jest.mock('react-native-element-dropdown', () => ({
  Dropdown: ({ value, data, onChange, onFocus, onBlur, ...props }: any) => null,
}));

describe('DropDownMenu Component', () => {
  const mockSetValue = jest.fn();
  const mockData = [
    { label: 'Size 8', value: '8' },
    { label: 'Size 9', value: '9' },
    { label: 'Size 10', value: '10' },
  ];

  beforeEach(() => {
    mockSetValue.mockClear();
  });

  it('renders correctly with required props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <DropDownMenu data={mockData} value="8" setValue={mockSetValue} />,
      );
    });
  });

  it('renders with placeholder', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <DropDownMenu
          data={mockData}
          value=""
          setValue={mockSetValue}
          placeholder="Select a size"
        />,
      );
    });

    const dropdownElement = component.root.findByType(DropDownMenu);
    expect(dropdownElement.props.placeholder).toBe('Select a size');
  });

  it('displays current value', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <DropDownMenu data={mockData} value="9" setValue={mockSetValue} />,
      );
    });

    const dropdownElement = component.root.findByType(DropDownMenu);
    expect(dropdownElement.props.value).toBe('9');
  });

  it('accepts setValue callback', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <DropDownMenu data={mockData} value="8" setValue={mockSetValue} />,
      );
    });

    const dropdownElement = component.root.findByType(DropDownMenu);
    expect(dropdownElement.props.setValue).toBe(mockSetValue);
  });

  it('handles empty data array', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <DropDownMenu data={[]} value="" setValue={mockSetValue} />,
      );
    });
  });

  it('handles large data arrays', async () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `${i + 1}`,
    }));

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <DropDownMenu data={largeData} value="1" setValue={mockSetValue} />,
      );
    });
  });

  it('renders with custom data structure', async () => {
    const customData = [
      { label: 'Small', value: 'S' },
      { label: 'Medium', value: 'M' },
      { label: 'Large', value: 'L' },
    ];

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <DropDownMenu data={customData} value="M" setValue={mockSetValue} />,
      );
    });
  });
});
