import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Tabs from '../index';

describe('Tabs Component', () => {
  const mockSetActiveTab = jest.fn();
  const categoryTabs = ['All', 'Running', 'Casual', 'Formal'];
  const sizeTabs = [38, 39, 40, 41, 42, 43];

  beforeEach(() => {
    mockSetActiveTab.mockClear();
  });

  it('renders correctly with category tabs', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={categoryTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });
  });

  it('renders correctly with size tabs', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={sizeTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="sizes"
        />,
      );
    });
  });

  it('displays correct number of tabs', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Tabs
          tabs={categoryTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });

    const tabsElement = component.root.findByType(Tabs);
    expect(tabsElement.props.tabs).toEqual(categoryTabs);
    expect(tabsElement.props.tabs.length).toBe(4);
  });

  it('shows correct active tab', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Tabs
          tabs={categoryTabs}
          activeTab={2}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });

    const tabsElement = component.root.findByType(Tabs);
    expect(tabsElement.props.activeTab).toBe(2);
  });

  it('handles different active tab indices', async () => {
    for (let i = 0; i < categoryTabs.length; i++) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <Tabs
            tabs={categoryTabs}
            activeTab={i}
            setActiveTab={mockSetActiveTab}
            variant="categories"
          />,
        );
      });
    }
  });

  it('accepts setActiveTab callback', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Tabs
          tabs={categoryTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });

    const tabsElement = component.root.findByType(Tabs);
    expect(tabsElement.props.setActiveTab).toBe(mockSetActiveTab);
  });

  it('handles empty tabs array', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={[]}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });
  });

  it('handles single tab', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={['Only One']}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });
  });

  it('renders with numeric tabs (sizes)', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <Tabs
          tabs={sizeTabs}
          activeTab={3}
          setActiveTab={mockSetActiveTab}
          variant="sizes"
        />,
      );
    });

    const tabsElement = component.root.findByType(Tabs);
    expect(tabsElement.props.tabs).toEqual(sizeTabs);
  });

  it('renders both variants', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={categoryTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="categories"
        />,
      );
    });

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <Tabs
          tabs={sizeTabs}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          variant="sizes"
        />,
      );
    });
  });
});
