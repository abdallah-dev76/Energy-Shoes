import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import NavigationHeader from '../index';
import { View } from 'react-native';

describe('NavigationHeader Component', () => {
  it('renders correctly with title only', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<NavigationHeader title="Home" />);
    });
  });

  it('displays the title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<NavigationHeader title="Home" />);
    });
    // Component renders successfully with title
  });

  it('renders with start action', async () => {
    const startAction = <View testID="back-button" />;
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <NavigationHeader title="Profile" startAction={startAction} />,
      );
    });
    // Component renders successfully with start action
  });

  it('renders with end action', async () => {
    const endAction = <View testID="menu-button" />;
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <NavigationHeader title="Settings" endAction={endAction} />,
      );
    });
    // Component renders successfully with end action
  });

  it('renders with both start and end actions', async () => {
    const startAction = <View testID="back-button" />;
    const endAction = <View testID="more-button" />;

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <NavigationHeader
          title="Cart"
          startAction={startAction}
          endAction={endAction}
        />,
      );
    });
  });

  it('renders with custom backgroundColor', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <NavigationHeader title="Home" backgroundColor="#FF0000" />,
      );
    });
    // Component renders successfully with custom backgroundColor
  });

  it('renders without any actions', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<NavigationHeader title="Title Only" />);
    });
  });

  it('handles empty title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<NavigationHeader title="" />);
    });
  });

  it('renders complete header with all props', async () => {
    const startAction = <View testID="back" />;
    const endAction = <View testID="menu" />;

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <NavigationHeader
          title="Complete Header"
          startAction={startAction}
          endAction={endAction}
          backgroundColor="#FFFFFF"
        />,
      );
    });
  });
});
