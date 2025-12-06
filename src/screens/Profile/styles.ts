import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';
import {appColors} from '../../theme/colors';

const styles = () =>
  StyleSheet.create({
    profileImageContainer: {...layout.itemsCenter, ...gutters.gapH_16},
    cameraIcon: {
      backgroundColor: appColors.primary,
      ...layout.absolute,
      bottom: 0,
      end: 0,
      ...gutters.p_6,
      borderRadius: 100,
    },
    editProfile: {...gutters.mt_8},
    menuContainer: {...gutters.px_24, ...gutters.mt_24},
  });

export default styles;
