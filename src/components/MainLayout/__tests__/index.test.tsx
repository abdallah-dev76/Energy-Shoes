import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import MainLayout from '../index';
import { View, Text } from 'react-native';

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('MainLayout Component', () => {
  const TestChild = () => <Text>Test Content</Text>;

  it('renders correctly with children', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <MainLayout>
          <TestChild />
        </MainLayout>,
      );
    });
  });

  it('renders with header', async () => {
    const header = <View testID="header" />;
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout header={header}>
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.header).toBeTruthy();
  });

  it('renders with footer', async () => {
    const footer = <View testID="footer" />;
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout footer={footer}>
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.footer).toBeTruthy();
  });

  it('renders with fixed header', async () => {
    const header = <View testID="header" />;
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout header={header} isFixedHeader={true}>
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.isFixedHeader).toBe(true);
  });

  it('renders as scrollable', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout isScrollable={true}>
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.isScrollable).toBe(true);
  });

  it('hides bottom tabs', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout hideBottomTabs={true}>
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.hideBottomTabs).toBe(true);
  });

  it('accepts custom statusBarStyle', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout statusBarStyle="dark-content">
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.statusBarStyle).toBe('dark-content');
  });

  it('accepts custom statusBarBackgroundColor', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <MainLayout statusBarBackgroundColor="#FF0000">
          <TestChild />
        </MainLayout>,
      );
    });

    const layoutElement = component.root.findByType(MainLayout);
    expect(layoutElement.props.statusBarBackgroundColor).toBe('#FF0000');
  });

  it('renders complete layout with all props', async () => {
    const header = <View testID="header" />;
    const footer = <View testID="footer" />;

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <MainLayout
          header={header}
          footer={footer}
          isFixedHeader={true}
          isScrollable={true}
          hideBottomTabs={false}
          statusBarStyle="light-content"
          statusBarBackgroundColor="#000000"
        >
          <TestChild />
        </MainLayout>,
      );
    });
  });
});
