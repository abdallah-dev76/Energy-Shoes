// Card.test.tsx
import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import { ProductDto, Routes } from '../../../constants';
import { SheetManager } from 'react-native-actions-sheet';
import Card from '..';
import { ReactTestInstance } from 'react-test-renderer';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    push: mockNavigate,
  }),
}));

// Mock SheetManager
jest.mock('react-native-actions-sheet', () => ({
  SheetManager: { show: jest.fn() },
}));

// Mock nested components
jest.mock('../../Text', () => 'Text');
jest.mock('../../Icon', () => 'Icon');
jest.mock('../../Price', () => 'Price');
jest.mock('../../IconButton', () => 'IconButton');
jest.mock('../../NavigationAction', () => ({
  LoveButton: jest.fn(() => 'LoveButton'),
}));

describe('Card component', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    imageURL: 'https://example.com/image.jpg',
    price: 100,
    average_rating: 4.5,
    discount: '20',
    description: 'This is a test product',
  } as ProductDto;

  it('renders correctly', () => {
    const { getByText } = render(<Card product={product} />);
    expect(getByText('Test Product')).toBeTruthy();
  });

  it('renders description when isShowDetails is true', () => {
    const { getByText } = render(<Card product={product} isShowDetails />);
    expect(getByText('This is a test product')).toBeTruthy();
  });

  it('calls navigation.push when pressed', () => {
    const { getByText } = render(<Card product={product} />);
    // Pressable is first child in Animated.View
    fireEvent.press(getByText('Test Product').parent as ReactTestInstance);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.PRODUCT_DETAILS, {
      product,
    });
  });

  it('calls SheetManager.show when add to cart is pressed', () => {
    const { getByTestId } = render(
      <Card product={product} testID="IconButton" />,
    );
    const addButton = getByTestId ? getByTestId('IconButton') : true;
    if (addButton) fireEvent.press(addButton as ReactTestInstance);
    expect(SheetManager.show).toHaveBeenCalledWith('add-to-cart-sheet', {
      payload: { product },
    });
  });

  it('renders rating if available and isShowDetails is false', () => {
    const { getByText } = render(<Card product={product} />);
    expect(getByText('4.5')).toBeTruthy();
  });
});
