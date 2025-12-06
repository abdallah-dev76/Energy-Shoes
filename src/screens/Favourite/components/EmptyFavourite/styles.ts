import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../../../constants';
import {pxH} from '../../../../utils';

const styles = () =>
  StyleSheet.create({
    emptyListContainer: {
      ...layout.flex_1,
      ...layout.allCenter,
    },
    emptyListImage: {width: '100%', height: pxH(300)},
    emptyTextContainer: {
      ...gutters.gapH_8,
    },
  });

export default styles;
