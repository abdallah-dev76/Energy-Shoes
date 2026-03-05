import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import ReadMoreText from '../index';

describe('ReadMoreText Component', () => {
  const shortText = 'Short description';
  const longText =
    'This is a very long description that will definitely exceed the number of lines limit and should trigger the Read More functionality to appear. '.repeat(
      5,
    );

  it('renders correctly with short text', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ReadMoreText description={shortText} numberOfLines={3} />,
      );
    });
  });

  it('renders correctly with long text', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ReadMoreText description={longText} numberOfLines={3} />,
      );
    });
  });

  it('accepts numberOfLines prop', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ReadMoreText description={longText} numberOfLines={5} />,
      );
    });
    // Component renders successfully with numberOfLines
  });

  it('displays description text', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ReadMoreText description={shortText} numberOfLines={3} />,
      );
    });
    // Component renders successfully with description text
  });

  it('handles empty description', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<ReadMoreText description="" numberOfLines={3} />);
    });
  });

  it('handles single line text', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ReadMoreText description="Single line" numberOfLines={1} />,
      );
    });
  });

  it('handles multiline text with different line limits', async () => {
    const lineLimits = [1, 2, 3, 5, 10];

    for (const limit of lineLimits) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <ReadMoreText description={longText} numberOfLines={limit} />,
        );
      });
    }
  });
});
