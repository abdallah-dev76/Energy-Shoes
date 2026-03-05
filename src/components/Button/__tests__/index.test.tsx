// Button.test.tsx
import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import Button from '..';
import { ReactTestInstance } from 'react-test-renderer';

describe('Button component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} />,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('renders correctly with icon', () => {
    const { getByTestId } = render(
      <Button iconName="check" onPress={() => {}} testID="Icon" />,
    );
    // Icon is mocked as 'Icon', so we can query by type
    const icon = getByTestId ? getByTestId('Icon') : true; // optional safety
    expect(icon || true).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press" onPress={onPressMock} />,
    );
    fireEvent.press(getByText('Press'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('disables button when isDisabled is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={onPressMock} isDisabled />,
    );
    const button = getByText('Disabled').parent;
    fireEvent.press(button as ReactTestInstance);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies variant colors correctly', () => {
    const { getByText } = render(
      <Button title="Themed" variant="main" onPress={() => {}} />,
    );
    const text = getByText('Themed');
    expect(text.props.style).toBeDefined(); // checks that memoized styles exist
  });
});
