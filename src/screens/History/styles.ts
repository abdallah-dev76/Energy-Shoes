import { StyleSheet } from 'react-native';
import { px, pxH } from '../../utils';

export default StyleSheet.create({
  listContainer: {
    padding: px(16),
    gap: pxH(16),
  },
  orderCard: {
    borderRadius: px(12),
    padding: px(16),
    gap: pxH(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: pxH(2) },
    shadowOpacity: 0.1,
    shadowRadius: px(4),
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: pxH(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusBadge: {
    paddingHorizontal: px(12),
    paddingVertical: pxH(4),
    borderRadius: px(12),
  },
  itemsSection: {
    gap: pxH(8),
  },
  sectionTitle: {
    marginBottom: pxH(8),
  },
  itemsScroll: {
    gap: px(16),
  },
  itemThumbnail: {
    width: px(150),
    flexDirection: 'row',
    gap: px(16),
  },
  itemImage: {
    height: pxH(50),
    width: pxH(50),
    borderRadius: px(8),
  },
  itemDetails: {
    gap: pxH(8),
  },
  section: {
    gap: pxH(4),
  },
  summary: {
    gap: pxH(8),
    paddingTop: pxH(12),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRow: {
    paddingTop: pxH(8),
    marginTop: pxH(4),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(32),
    gap: pxH(12),
  },
  emptySubtext: {
    marginTop: pxH(8),
  },
});
