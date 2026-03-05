import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Text from '../index';

describe('Text Component', () => {
  it('renders correctly with default props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Text>Hello World</Text>);
    });
  });

  it('renders with custom fontSize', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Text fontSize={20}>Custom Size</Text>);
    });

    const textElement = component.root.findByType(Text);
    expect(textElement.props.fontSize).toBe(20);
  });

  it('renders with different font weights', async () => {
    const fontWeights = ['regular', 'medium', 'bold', 'semiBold'] as const;

    for (const weight of fontWeights) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<Text fontWeight={weight}>Test</Text>);
      });
    }
  });

  it('renders with custom color', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Text color="#FF0000">Red Text</Text>);
    });

    const textElement = component.root.findByType(Text);
    expect(textElement.props.color).toBe('#FF0000');
  });

  it('renders with text alignment', async () => {
    const alignments = ['left', 'center', 'right'] as const;

    for (const align of alignments) {
      let component: any;
      await ReactTestRenderer.act(() => {
        component = renderWithProviders(<Text textAlign={align}>Aligned</Text>);
      });

      const textElement = component.root.findByType(Text);
      expect(textElement.props.textAlign).toBe(align);
    }
  });

  it('renders with numberOfLines prop', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Text numberOfLines={2}>Long text</Text>);
    });

    const textElement = component.root.findByType(Text);
    expect(textElement.props.numberOfLines).toBe(2);
  });

  it('renders with custom lineHeight', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Text lineHeight={32}>Custom line height</Text>,
      );
    });

    const textElement = component.root.findByType(Text);
    expect(textElement.props.lineHeight).toBe(32);
  });

  it('renders numeric children', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Text>{123}</Text>);
    });
  });

  it('renders string children', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Text>String content</Text>);
    });
  });

  it('applies custom styles', async () => {
    const customStyle = { marginTop: 10 };
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<Text style={customStyle}>Styled</Text>);
    });

    const textElement = component.root.findByType(Text);
    expect(textElement.props.style).toBeTruthy();
  });
});
