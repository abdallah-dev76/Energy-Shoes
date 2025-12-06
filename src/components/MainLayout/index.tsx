import {
  Animated,
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import React from 'react';
import {useAppTheme} from '../../theme';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BOTTOM_TAB_HEIGHT} from '../../constants';
import {appColors} from '../../theme/colors';
interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isFixedHeader?: boolean;
  isScrollable?: boolean;
  statusBarStyle?: StatusBarStyle;
  statusBarBackgroundColor?: string;
  isFixedFooter?: boolean;
  hideBottomTabs?: boolean;
  bottomIndicatorColor?: string;
  onScroll?: () => void;
}

const MainLayout = ({
  children,
  header,
  isFixedHeader = false,
  footer,
  isFixedFooter,
  isScrollable = false,
  statusBarBackgroundColor = appColors.primary,
  statusBarStyle = 'light-content',
  hideBottomTabs = false,
  bottomIndicatorColor,
  onScroll,
}: MainLayoutProps) => {
  const {theme} = useAppTheme();
  const insets = useSafeAreaInsets();
  const bottomIndicatorHeight = insets.bottom;
  const bottomTabHeight = hideBottomTabs
    ? 0
    : Platform.OS === 'ios'
    ? BOTTOM_TAB_HEIGHT - bottomIndicatorHeight
    : BOTTOM_TAB_HEIGHT;
  return (
    <>
      {/* Handle StatusBar in IOS and Android */}
      <SafeAreaView style={{backgroundColor: statusBarBackgroundColor}} />
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarStyle} //works for both IOS and Android
      />

      <View
        style={[styles(theme).mainContainer, {paddingBottom: bottomTabHeight}]}>
        {isFixedHeader && header}
        {isScrollable ? (
          <>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles(theme).scrollableContainer}
              keyboardShouldPersistTaps="handled"
              onScroll={onScroll}>
              {!isFixedHeader && header}
              {children}
              {!isFixedFooter && footer}
            </Animated.ScrollView>
          </>
        ) : (
          <View style={styles(theme).fixedContainer}>{children}</View>
        )}
        {isFixedFooter && footer}
      </View>
      <SafeAreaView
        style={{backgroundColor: bottomIndicatorColor ?? theme.backgroundColor}}
      />
    </>
  );
};

export default MainLayout;
