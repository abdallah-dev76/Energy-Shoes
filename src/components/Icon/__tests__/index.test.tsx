import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Icon from '../index';

describe('Icon Component', () => {
  it('renders correctly with default props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Icon name="home" />);
    });
  });

  it('renders with custom size', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Icon name="home" size={32} />);
    });

    expect(component.root).toBeTruthy();
  });

  it('renders with custom color', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Icon name="heart" color="red" />);
    });

    expect(component.root).toBeTruthy();
  });

  it('handles different icon names', async () => {
    const iconNames = ['home', 'heart', 'user', 'search'];

    for (const name of iconNames) {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(<Icon name={name} />);
      });

      expect(component.root).toBeTruthy();
    }
  });

  it('passes through all props', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Icon name="home" size={24} color="#000" />,
      );
    });

    expect(component.root).toBeTruthy();
  });
});
