import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import React, { forwardRef } from 'react';
import { useAppTheme } from '../../theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_TAB_HEIGHT } from '../../constants';

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

const MainLayout = forwardRef<ScrollView, MainLayoutProps>((props, ref) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const bottomIndicatorHeight = insets.bottom;
  const bottomTabHeight = props.hideBottomTabs
    ? 0
    : Platform.OS === 'ios'
    ? BOTTOM_TAB_HEIGHT - bottomIndicatorHeight
    : BOTTOM_TAB_HEIGHT;
  return (
    <>
      {/* Handle StatusBar in IOS and Android */}
      <SafeAreaView
        style={{ backgroundColor: props.statusBarBackgroundColor }}
      />
      <StatusBar
        backgroundColor={props.statusBarBackgroundColor}
        barStyle={props.statusBarStyle} //works for both IOS and Android
      />

      <View
        style={[
          styles(theme).mainContainer,
          { paddingBottom: bottomTabHeight },
        ]}
      >
        {props.isFixedHeader && props.header}
        {props.isScrollable ? (
          <>
            <Animated.ScrollView
              ref={ref}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles(theme).scrollableContainer}
              keyboardShouldPersistTaps="handled"
              onScroll={props.onScroll}
            >
              {!props.isFixedHeader && props.header}
              {props.children}
              {!props.isFixedFooter && props.footer}
            </Animated.ScrollView>
          </>
        ) : (
          <View style={styles(theme).fixedContainer}>{props.children}</View>
        )}
        {props.isFixedFooter && props.footer}
      </View>
      <SafeAreaView
        style={{
          backgroundColor: props.bottomIndicatorColor ?? theme.backgroundColor,
        }}
      />
    </>
  );
});

export default MainLayout;
