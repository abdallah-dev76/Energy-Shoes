import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import NavigationAction from '../index';

const mockProduct = {
  id: 1,
  name: 'Test Shoe',
  imageURL: 'https://example.com/shoe.jpg',
  price: 99.99,
  average_rating: 4.5,
  category: 'Running',
  available_sizes: [40, 41, 42],
};

describe('NavigationAction Components', () => {
  describe('BackButton', () => {
    it('renders correctly', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<NavigationAction.BackButton />);
      });
    });
  });

  describe('ShareButton', () => {
    it('renders correctly', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<NavigationAction.ShareButton />);
      });
    });
  });

  describe('NofificationsButton', () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
      mockOnPress.mockClear();
    });

    it('renders correctly without onPress', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<NavigationAction.NofificationsButton />);
      });
    });

    it('renders correctly with onPress', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <NavigationAction.NofificationsButton onPress={mockOnPress} />,
        );
      });
    });
  });

  describe('WelcomeComponent', () => {
    it('renders correctly with name and imageUrl', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <NavigationAction.WelcomeComponent
            name="John Doe"
            imageUrl="https://example.com/avatar.jpg"
          />,
        );
      });
    });

    it('displays user name', async () => {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(
          <NavigationAction.WelcomeComponent
            name="Jane Smith"
            imageUrl="https://example.com/avatar.jpg"
          />,
        );
      });

      const welcomeElement = component.root.findByType(
        NavigationAction.WelcomeComponent,
      );
      expect(welcomeElement.props.name).toBe('Jane Smith');
    });

    it('handles different user names', async () => {
      const names = ['Alice', 'Bob', 'Charlie', 'David'];

      for (const name of names) {
        await ReactTestRenderer.act(() => {
          renderWithProviders(
            <NavigationAction.WelcomeComponent
              name={name}
              imageUrl="https://example.com/avatar.jpg"
            />,
          );
        });
      }
    });
  });

  describe('LoveButton', () => {
    it('renders correctly with product', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <NavigationAction.LoveButton product={mockProduct} />,
        );
      });
    });

    it('renders with large icon size', async () => {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(
          <NavigationAction.LoveButton
            product={mockProduct}
            iconSize="large"
          />,
        );
      });

      const loveButtonElement = component.root.findByType(
        NavigationAction.LoveButton,
      );
      expect(loveButtonElement.props.iconSize).toBe('large');
    });

    it('renders with medium icon size', async () => {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(
          <NavigationAction.LoveButton
            product={mockProduct}
            iconSize="medium"
          />,
        );
      });

      const loveButtonElement = component.root.findByType(
        NavigationAction.LoveButton,
      );
      expect(loveButtonElement.props.iconSize).toBe('medium');
    });

    it('renders with small icon size', async () => {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(
          <NavigationAction.LoveButton
            product={mockProduct}
            iconSize="small"
          />,
        );
      });

      const loveButtonElement = component.root.findByType(
        NavigationAction.LoveButton,
      );
      expect(loveButtonElement.props.iconSize).toBe('small');
    });

    it('renders without background', async () => {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(
          <NavigationAction.LoveButton
            product={mockProduct}
            noBackground={true}
          />,
        );
      });

      const loveButtonElement = component.root.findByType(
        NavigationAction.LoveButton,
      );
      expect(loveButtonElement.props.noBackground).toBe(true);
    });

    it('renders with background by default', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <NavigationAction.LoveButton product={mockProduct} />,
        );
      });
    });
  });

  describe('All Components', () => {
    it('renders all navigation action components together', async () => {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <>
            <NavigationAction.BackButton />
            <NavigationAction.ShareButton />
            <NavigationAction.NofificationsButton />
            <NavigationAction.WelcomeComponent
              name="Test User"
              imageUrl="https://example.com/avatar.jpg"
            />
            <NavigationAction.LoveButton product={mockProduct} />
          </>,
        );
      });
    });
  });
});
