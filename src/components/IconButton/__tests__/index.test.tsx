import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import IconButton from '../index';

describe('IconButton Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with iconName', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton iconName="heart" onPress={mockOnPress} />,
      );
    });
  });

  it('renders with different icon sizes', async () => {
    const sizes = ['small', 'medium', 'intermediate', 'large'] as const;

    for (const size of sizes) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <IconButton iconName="star" iconSize={size} onPress={mockOnPress} />,
        );
      });
      // Component renders successfully with each size
    }
  });

  it('handles disabled state', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton iconName="heart" onPress={mockOnPress} isDisabled={true} />,
      );
    });
    // Component renders successfully in disabled state
  });

  it('renders with border', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton iconName="heart" onPress={mockOnPress} isBorder={true} />,
      );
    });
    // Component renders successfully with border
  });

  it('renders with rounded style', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton iconName="heart" onPress={mockOnPress} isRounded={true} />,
      );
    });
    // Component renders successfully with rounded style
  });

  it('accepts custom backgroundColor', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton
          iconName="heart"
          onPress={mockOnPress}
          backgroundColor="#FF0000"
        />,
      );
    });
    // Component renders successfully with custom backgroundColor
  });

  it('accepts custom iconColor', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton
          iconName="heart"
          onPress={mockOnPress}
          iconColor="#00FF00"
        />,
      );
    });
    // Component renders successfully with custom iconColor
  });

  it('accepts custom style', async () => {
    const customStyle = { margin: 10 };
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton
          iconName="heart"
          onPress={mockOnPress}
          style={customStyle}
        />,
      );
    });
    // Component renders successfully with custom style
  });

  it('accepts onPress callback', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton iconName="heart" onPress={mockOnPress} />,
      );
    });
    // Component renders successfully with onPress callback
  });

  it('renders with all custom props combined', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <IconButton
          iconName="star"
          onPress={mockOnPress}
          iconSize="large"
          isBorder={true}
          isRounded={true}
          backgroundColor="#0000FF"
          iconColor="#FFFFFF"
        />,
      );
    });
  });
});
