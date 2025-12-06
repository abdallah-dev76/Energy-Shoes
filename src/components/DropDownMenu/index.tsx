import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import appFonts from '../../assets/fonts';
import {appColors} from '../../theme/colors';
import {useAppTheme} from '../../theme';
import {gutters, Theme} from '../../constants';
import {moderateScale, pxH} from '../../utils';
import {useTranslation} from 'react-i18next';

type DropdownProps = {
  data: any;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const DropdownMenu = ({data, value, setValue}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  return (
    <Dropdown
      style={[
        styles(theme).dropdown,
        isFocus && {borderColor: appColors.primary},
      ]}
      placeholderStyle={styles(theme).placeholderStyle}
      selectedTextStyle={styles(theme).selectedTextStyle}
      dropdownPosition="top"
      containerStyle={styles(theme).container}
      activeColor={theme.activeDropDown}
      itemTextStyle={styles(theme).itemText}
      iconStyle={styles(theme).iconStyle}
      data={data}
      fontFamily={appFonts.regular}
      maxHeight={pxH(300)}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? t('selectSize') : '...'}
      value={value}
      showsVerticalScrollIndicator={false}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropdownMenu;

const styles = (theme?: Theme) =>
  StyleSheet.create({
    dropdown: {
      height: pxH(50),
      backgroundColor: theme?.dropdownBackgroundColor,
      borderColor: theme?.infoBorder,
      borderWidth: 0.5,
      ...gutters.radius_8,
      ...gutters.px_8,
    },
    container: {
      ...gutters.radius_8,
      backgroundColor: theme?.dropdownBackgroundColor,
      borderColor: theme?.infoBorder,
    },
    placeholderStyle: {
      fontSize: moderateScale(16),
      color: theme?.secondaryText,
    },
    selectedTextStyle: {
      fontSize: moderateScale(16),
      color: theme?.primaryText,
    },
    itemText: {color: theme?.primaryText},
    iconStyle: {
      position: 'absolute',
      end: 0,
    },
  });
