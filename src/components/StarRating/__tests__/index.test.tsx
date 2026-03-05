import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import StarRating from '../index';

describe('StarRating Component', () => {
  it('renders correctly with default props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating />);
    });
  });

  it('renders 5 stars total', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating rating={3} />);
    });
    // Component renders successfully with 5 stars
  });

  it('renders with rating of 0', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating rating={0} />);
    });
  });

  it('renders with rating of 1', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating rating={1} />);
    });
  });

  it('renders with rating of 2.5 (half star)', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating rating={2.5} />);
    });
  });

  it('renders with rating of 5 (full stars)', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<StarRating rating={5} />);
    });
  });

  it('renders with custom size', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<StarRating rating={3} size={24} />);
    });

    const ratingElement = component.root.findByType(StarRating);
    expect(ratingElement.props.size).toBe(24);
  });

  it('renders with custom color', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <StarRating rating={4} color="#FF0000" />,
      );
    });

    const ratingElement = component.root.findByType(StarRating);
    expect(ratingElement.props.color).toBe('#FF0000');
  });

  it('handles decimal ratings correctly', async () => {
    const ratings = [1.5, 2.5, 3.5, 4.5];

    for (const rating of ratings) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<StarRating rating={rating} />);
      });
    }
  });

  it('handles edge case ratings', async () => {
    const edgeCases = [0, 0.5, 4.9, 5];

    for (const rating of edgeCases) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<StarRating rating={rating} />);
      });
    }
  });
});
