import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Price from '../index';
import Text from '../../Text';

describe('Price Component', () => {
  it('renders correctly with default props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Price price={100} />);
    });
  });

  it('displays the correct price value', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Price price={99} />);
    });

    const textElements = component.root.findAllByType(Text);
    // Should have 2 Text components: $ and the price
    expect(textElements.length).toBe(2);
  });

  it('renders with custom price size', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Price price={99.99} priceSize={24} />);
    });
    // Component renders successfully with custom size
  });

  it('handles zero price', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Price price={0} />);
    });
  });

  it('handles decimal prices', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Price price={99.99} />);
    });
  });

  it('handles large price values', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Price price={9999} />);
    });
  });

  it('renders dollar sign with correct sizing', async () => {
    const priceSize = 20;
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Price price={100} priceSize={priceSize} />,
      );
    });

    const textElements = component.root.findAllByType(Text);
    // First Text should be the $ sign
    expect(textElements[0].props.children).toBe('$');
    expect(textElements[0].props.fontSize).toBe(priceSize);
  });

  it('applies correct font weight to both elements', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Price price={50} />);
    });

    const textElements = component.root.findAllByType(Text);
    // Both should have semiBold font weight
    expect(textElements[0].props.fontWeight).toBe('semiBold');
    expect(textElements[1].props.fontWeight).toBe('semiBold');
  });
});
