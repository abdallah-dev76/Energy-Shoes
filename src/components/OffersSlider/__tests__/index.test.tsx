import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import OffersSlider from '../index';

// Mock useWindowDimensions
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  default: jest.fn(() => ({ width: 375, height: 667 })),
}));

describe('OffersSlider Component', () => {
  it('renders correctly', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<OffersSlider />);
    });
  });

  it('renders without crashing', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<OffersSlider />);
    });

    expect(component).toBeTruthy();
  });

  it('mounts and unmounts without errors', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<OffersSlider />);
    });

    await ReactTestRenderer.act(() => {
      component.unmount();
    });
  });

  it('renders slider container', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<OffersSlider />);
    });

    const offerSliderElement = component.root.findByType(OffersSlider);
    expect(offerSliderElement).toBeTruthy();
  });

  it('handles re-renders correctly', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<OffersSlider />);
    });

    await ReactTestRenderer.act(() => {
      component.update(renderWithProviders(<OffersSlider />).toJSON());
    });
  });
});
