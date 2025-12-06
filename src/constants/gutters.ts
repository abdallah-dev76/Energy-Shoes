import {StyleSheet, ViewStyle} from 'react-native';
import {moderateScale, px, pxH} from '../utils';

type SpacingValues = 1 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 18 | 24 | 28 | 32 | 40;

type SpacingPrefix =
  | 'm'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
  | 'ms'
  | 'me'
  | 'p'
  | 'pt'
  | 'pb'
  | 'pl'
  | 'pr'
  | 'ps'
  | 'pe'
  | 'px'
  | 'py'
  | 'mx'
  | 'my'
  | 'gapH'
  | 'gap'
  | 'radius';

type SpacingTypes = {
  [key in `${SpacingPrefix}_${SpacingValues}`]: ViewStyle;
};
const spacingValues: SpacingValues[] = [
  2, 4, 6, 8, 10, 12, 16, 18, 24, 28, 32, 40,
];

const generateSpacing = (): SpacingTypes => {
  const styles: any = {};

  spacingValues.forEach(size => {
    styles[`m_${size}`] = {margin: px(size)};
    styles[`mt_${size}`] = {marginTop: pxH(size)};
    styles[`mb_${size}`] = {marginBottom: pxH(size)};
    styles[`ml_${size}`] = {marginLeft: px(size)};
    styles[`mr_${size}`] = {marginRight: px(size)};
    styles[`ms_${size}`] = {marginStart: px(size)};
    styles[`me_${size}`] = {marginEnd: px(size)};

    styles[`p_${size}`] = {padding: px(size)};
    styles[`pt_${size}`] = {paddingTop: pxH(size)};
    styles[`pb_${size}`] = {paddingBottom: pxH(size)};
    styles[`pl_${size}`] = {paddingLeft: px(size)};
    styles[`pr_${size}`] = {paddingRight: px(size)};
    styles[`ps_${size}`] = {paddingStart: px(size)};
    styles[`pe_${size}`] = {paddingEnd: px(size)};

    styles[`px_${size}`] = {paddingHorizontal: px(size)};
    styles[`py_${size}`] = {paddingVertical: pxH(size)};
    styles[`mx_${size}`] = {marginHorizontal: px(size)};
    styles[`my_${size}`] = {marginVertical: pxH(size)};

    styles[`gap_${size}`] = {gap: px(size)};
    styles[`gapH_${size}`] = {gap: pxH(size)};

    styles[`radius_${size}`] = {borderRadius: moderateScale(size)};
  });

  return styles as SpacingTypes;
};

export const gutters = StyleSheet.create(generateSpacing());
