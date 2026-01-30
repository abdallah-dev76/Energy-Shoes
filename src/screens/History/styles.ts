import { StyleSheet } from 'react-native';
import { px } from '../../utils';

export default StyleSheet.create({
  listContainer: {
    padding: 16,
    gap: 16,
  },
  orderCard: {
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemsSection: {
    gap: 8,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  itemsScroll: {
    gap: px(16),
  },
  itemThumbnail: {
    width: px(150),
    flexDirection: 'row',
    gap: 16,
  },
  section: {
    gap: 4,
  },
  summary: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRow: {
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  emptySubtext: {
    marginTop: 8,
  },
});
