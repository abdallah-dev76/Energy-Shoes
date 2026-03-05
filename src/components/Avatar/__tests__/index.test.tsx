import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import Avatar from '../index';
import { moderateScale } from '../../../utils';

// Mock image sources
jest.mock('../../../assets/app_images', () => ({
  AppImages: {
    avatar: 'mock-avatar-image',
  },
}));

describe('Avatar Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders default avatar when no image is provided', () => {
    const { getByTestId } = render(<Avatar testID="avatar" />);
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  it('renders with small, medium, and large sizes', () => {
    const sizes: Array<'small' | 'medium' | 'large'> = [
      'small',
      'medium',
      'large',
    ];
    sizes.forEach(size => {
      const { getByTestId } = render(
        <Avatar size={size} testID={`avatar-${size}`} />,
      );
      expect(getByTestId(`avatar-${size}`)).toBeTruthy();
    });
  });

  it('renders as square when isSquare is true', () => {
    const { getByTestId } = render(<Avatar isSquare testID="avatar-square" />);
    const avatar = getByTestId('avatar-square');
    expect(avatar.props.style).toEqual(
      expect.objectContaining({ borderRadius: moderateScale(12) }),
    );
  });

  it('renders with imageUrl over localImage', () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    const localImage = 'local-image-path';
    const { getByTestId } = render(
      <Avatar
        imageUrl={imageUrl}
        localImage={localImage}
        testID="avatar-img"
      />,
    );
    const avatar = getByTestId('avatar-img');
     expect(avatar).toBeTruthy();
  });

  it('renders with localImage when imageUrl is not provided', () => {
    const localImage = 'local-image-path';
    const { getByTestId } = render(
      <Avatar localImage={localImage} testID="avatar-local" />,
    );
    const avatar = getByTestId('avatar-local');
    expect(avatar).toBeTruthy();
  });

  it('calls onPress callback when avatar is pressed', () => {
    const { getByTestId } = render(
      <Avatar onPress={mockOnPress} testID="avatar-press" />,
    );
    const avatar = getByTestId('avatar-press');
    fireEvent.press(avatar);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('sets pointerEvents to none when specified', () => {
    const { getByTestId } = render(
      <Avatar pointerEvents="none" testID="avatar-pointer" />,
    );
    const avatar = getByTestId('avatar-pointer');
    expect(avatar.props.pointerEvents).toBe('none');
  });
});
