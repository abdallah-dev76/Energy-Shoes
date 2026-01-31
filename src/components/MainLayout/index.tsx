import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import React, { forwardRef } from 'react';
import { useAppTheme } from '../../theme';
import styles, { bottomPadding } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import { appColors } from '../../theme/colors';

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
  onScroll?: () => void;
}

const MainLayout = forwardRef<ScrollView, MainLayoutProps>((props, ref) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor={props.statusBarBackgroundColor || appColors.primary} // android only
        barStyle={props.statusBarStyle} //works for both IOS and Android
      />

      <View
        style={[
          styles(theme, props.statusBarBackgroundColor).mainContainer,
          bottomPadding(
            Platform.OS === 'android'
              ? props.hideBottomTabs
                ? insets.bottom
                : BOTTOM_TAB_HEIGHT + insets.bottom
              : Platform.OS === 'ios' && !props.hideBottomTabs
              ? BOTTOM_TAB_HEIGHT
              : 0,
          ),
        ]}
      >
        {props.isFixedHeader && (
          <View
            style={{
              paddingTop: Platform.OS === 'ios' ? insets.top : 0,
              marginTop: Platform.OS === 'android' ? insets.top : 0,
              backgroundColor: theme.backgroundColor,
            }}
          >
            {props.header}
          </View>
        )}

        {props.isScrollable ? (
          <View style={{ flex: 1 }}>
            <Animated.ScrollView
              ref={ref}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={[
                styles(theme).scrollableContainer,
                {
                  marginTop: insets.top,
                  paddingBottom: Platform.OS === 'android' ? insets.top : 0,
                },
              ]}
              keyboardShouldPersistTaps="handled"
              onScroll={props.onScroll}
            >
              {!props.isFixedHeader && props.header}
              {props.children}
              {!props.isFixedFooter && props.footer}
            </Animated.ScrollView>
          </View>
        ) : (
          <View style={[styles(theme).fixedContainer]}>{props.children}</View>
        )}

        {props.isFixedFooter && props.footer}
      </View>
    </>
  );
});

export default MainLayout;
