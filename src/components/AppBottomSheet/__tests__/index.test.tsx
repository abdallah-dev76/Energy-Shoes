import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import AppBottomSheet from '../index';
import { View, Text } from 'react-native';

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('AppBottomSheet Component', () => {
  const testContent = (
    <View>
      <Text>Test Content</Text>
    </View>
  );

  it('renders correctly with required props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="Test Sheet"
          sheetContent={testContent}
        />,
      );
    });
  });

  it('displays title', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="My Title"
          sheetContent={testContent}
        />,
      );
    });

    const sheetElement = component.root.findByType(AppBottomSheet);
    expect(sheetElement.props.title).toBe('My Title');
  });

  it('renders with left component', async () => {
    const leftComponent = <View testID="left-component" />;
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="Test"
          sheetContent={testContent}
          leftComponent={leftComponent}
        />,
      );
    });

    const sheetElement = component.root.findByType(AppBottomSheet);
    expect(sheetElement.props.leftComponent).toBeTruthy();
  });

  it('renders without left component', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="Test"
          sheetContent={testContent}
        />,
      );
    });
  });

  it('renders with different sheet names', async () => {
    const sheetNames = ['sheet-1', 'sheet-2', 'sheet-3'] as any;

    for (const sheetName of sheetNames) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <AppBottomSheet
            sheetName={sheetName}
            title="Test"
            sheetContent={testContent}
          />,
        );
      });
    }
  });

  it('renders with custom content', async () => {
    const customContent = (
      <View>
        <Text>Custom Content</Text>
        <Text>Line 2</Text>
      </View>
    );

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="Custom Sheet"
          sheetContent={customContent}
        />,
      );
    });
  });

  it('handles empty content', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <AppBottomSheet
          sheetName="test-sheet"
          title="Empty Sheet"
          sheetContent={<></>}
        />,
      );
    });
  });

  it('renders complete sheet with all props', async () => {
    const leftComponent = <View testID="left" />;
    const content = (
      <View>
        <Text>Complete Content</Text>
      </View>
    );

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <AppBottomSheet
          sheetName="complete-sheet"
          title="Complete Sheet"
          sheetContent={content}
          leftComponent={leftComponent}
        />,
      );
    });
  });
});
