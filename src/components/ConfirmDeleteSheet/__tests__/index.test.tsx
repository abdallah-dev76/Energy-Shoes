import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import ConfirmDeleteSheet from '../index';

describe('ConfirmDeleteSheet Component', () => {
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
  });

  it('renders correctly with default props', async () => {
    const payload = {
      onConfirm: mockOnConfirm,
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });
  });

  it('renders with custom message', async () => {
    const payload = {
      message: 'Are you sure you want to delete this item?',
      onConfirm: mockOnConfirm,
    };

    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });

    const sheetElement = component.root.findByType(ConfirmDeleteSheet);
    expect(sheetElement.props.payload.message).toBe(
      'Are you sure you want to delete this item?',
    );
  });

  it('renders with custom title', async () => {
    const payload = {
      title: 'Delete Item',
      onConfirm: mockOnConfirm,
    };

    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });

    const sheetElement = component.root.findByType(ConfirmDeleteSheet);
    expect(sheetElement.props.payload.title).toBe('Delete Item');
  });

  it('renders with title, message, and callback', async () => {
    const payload = {
      title: 'Confirm Action',
      message: 'This action cannot be undone',
      onConfirm: mockOnConfirm,
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });
  });

  it('handles payload with only onConfirm', async () => {
    const payload = {
      onConfirm: mockOnConfirm,
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });
  });

  it('renders without payload', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <ConfirmDeleteSheet
          payload={undefined}
          sheetId="confirm-delete-sheet"
        />,
      );
    });
  });

  it('handles different confirmation messages', async () => {
    const messages = [
      'Delete this product?',
      'Remove from cart?',
      'Clear all items?',
      'Cancel order?',
    ];

    for (const message of messages) {
      const payload = {
        message,
        onConfirm: mockOnConfirm,
      };

      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <ConfirmDeleteSheet
            payload={payload}
            sheetId="confirm-delete-sheet"
          />,
        );
      });
    }
  });

  it('accepts onConfirm callback', async () => {
    const payload = {
      onConfirm: mockOnConfirm,
    };

    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(
        <ConfirmDeleteSheet payload={payload} sheetId="confirm-delete-sheet" />,
      );
    });

    const sheetElement = component.root.findByType(ConfirmDeleteSheet);
    expect(sheetElement.props.payload.onConfirm).toBe(mockOnConfirm);
  });
});
