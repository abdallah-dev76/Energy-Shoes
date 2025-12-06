import React from 'react';
import {Image, ImageProps, Pressable, View} from 'react-native';
import {Text} from '../../../../components';
import {styles} from './styles';
import {isArabic} from '../../../../localization/i18next';
import {MMKV_KEYS} from '../../../../constants';
import {changeLanguage, getData} from '../../../../utils';
import {useAppTheme} from '../../../../theme';

type LanguageRadioButton = {
  language: string;
  label: string;
  flag: ImageProps;
};

export const LanguageRedioButton = ({
  language,
  label,
  flag,
}: LanguageRadioButton) => {
  const currentLang = getData(MMKV_KEYS.LANGUAGE) ?? 'en';
  const {theme} = useAppTheme();
  return (
    <Pressable
      style={styles(theme).optionContainer}
      onPress={() => changeLanguage(isArabic ? 'en' : 'ar')}>
      <View
        style={[
          styles(theme).optionStyle,
          {backgroundColor: currentLang === language ? theme.primaryText : ''},
        ]}
      />
      <View style={styles(theme).valueLanguage}>
        <Image source={flag} style={styles(theme).flag} />
        <Text>{label}</Text>
      </View>
    </Pressable>
  );
};

export default LanguageRedioButton;
