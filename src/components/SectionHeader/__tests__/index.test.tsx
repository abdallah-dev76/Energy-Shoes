import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import SectionHeader from '../index';

describe('SectionHeader Component', () => {
  const mockOnViewAllPress = jest.fn();

  beforeEach(() => {
    mockOnViewAllPress.mockClear();
  });

  it('renders correctly with section title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SectionHeader sectionTitle="Popular Products" />);
    });
  });

  it('displays the section title', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <SectionHeader sectionTitle="New Arrivals" />,
      );
    });

    const headerElement = component.root.findByType(SectionHeader);
    expect(headerElement.props.sectionTitle).toBe('New Arrivals');
  });

  it('shows View All button by default', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <SectionHeader
          sectionTitle="Featured"
          onViewAllPress={mockOnViewAllPress}
        />,
      );
    });

    const headerElement = component.root.findByType(SectionHeader);
    expect(headerElement.props.noViewAll).toBeUndefined();
  });

  it('hides View All button when noViewAll is true', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <SectionHeader sectionTitle="Featured" noViewAll={true} />,
      );
    });

    const headerElement = component.root.findByType(SectionHeader);
    expect(headerElement.props.noViewAll).toBe(true);
  });

  it('accepts onViewAllPress callback', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <SectionHeader
          sectionTitle="Best Sellers"
          onViewAllPress={mockOnViewAllPress}
        />,
      );
    });

    const headerElement = component.root.findByType(SectionHeader);
    expect(headerElement.props.onViewAllPress).toBe(mockOnViewAllPress);
  });

  it('renders without onViewAllPress callback', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SectionHeader sectionTitle="Categories" />);
    });
  });

  it('renders with different section titles', async () => {
    const titles = [
      'Popular',
      'Featured',
      'New Arrivals',
      'Best Sellers',
      'On Sale',
    ];

    for (const title of titles) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<SectionHeader sectionTitle={title} />);
      });
    }
  });
});
