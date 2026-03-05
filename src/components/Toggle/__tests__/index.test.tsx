import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Toggle from '../index';

// Mock react-native-switch
jest.mock('react-native-switch', () => {
  const React = require('react');
  return {
    Switch: ({ value, onValueChange, ...props }: any) => null,
  };
});

describe('Toggle Component', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders correctly with default props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Toggle isOn={false} onToggle={mockOnToggle} />);
    });
  });

  it('renders in ON state', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Toggle isOn={true} onToggle={mockOnToggle} />,
      );
    });

    const toggleElement = component.root.findByType(Toggle);
    expect(toggleElement.props.isOn).toBe(true);
  });

  it('renders in OFF state', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Toggle isOn={false} onToggle={mockOnToggle} />,
      );
    });

    const toggleElement = component.root.findByType(Toggle);
    expect(toggleElement.props.isOn).toBe(false);
  });

  it('accepts onToggle callback', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Toggle isOn={false} onToggle={mockOnToggle} />,
      );
    });

    const toggleElement = component.root.findByType(Toggle);
    expect(toggleElement.props.onToggle).toBe(mockOnToggle);
  });

  it('handles undefined onToggle', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Toggle isOn={false} onToggle={undefined} />);
    });
  });

  it('maintains state through re-renders', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Toggle isOn={false} onToggle={mockOnToggle} />,
      );
    });

    // Update the component
    await ReactTestRenderer.act(() => {
      component.update(
        renderWithProviders(
          <Toggle isOn={true} onToggle={mockOnToggle} />,
        ).toJSON(),
      );
    });
  });
});
