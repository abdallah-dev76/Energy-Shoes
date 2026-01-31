import { StyleSheet } from 'react-native';
import { px, pxH } from '../../utils';
import { appColors } from '../../theme/colors';

const styles = () =>
  StyleSheet.create({
    profileImageContainer: { alignItems: 'center', gap: pxH(16),marginBottom: pxH(24) },
    cameraIcon: {
      backgroundColor: appColors.primary,
      position: 'absolute',
      bottom: 0,
      end: 0,
      padding: px(6),
      borderRadius: px(100),
    },
    editProfile: { marginTop: pxH(8) },
    menuContainer: { paddingHorizontal: px(24) },
  });

export default styles;
