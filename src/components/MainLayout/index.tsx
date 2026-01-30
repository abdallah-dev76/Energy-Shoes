import {
  Animated,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import React, { forwardRef } from 'react';
import { useAppTheme } from '../../theme';
import styles, { bottomPadding, headerMargin, scrollMargin, footerPadding } from './styles';
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
  onScroll?: () => void;
}

const MainLayout = forwardRef<ScrollView, MainLayoutProps>((props, ref) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor={props.statusBarBackgroundColor} // android only
        barStyle={props.statusBarStyle} //works for both IOS and Android
      />

      <View
        style={[
          styles(theme, props.statusBarBackgroundColor).mainContainer,
          bottomPadding(props.hideBottomTabs ? insets.bottom : BOTTOM_TAB_HEIGHT + insets.bottom),
        ]}
      >
        {props.isFixedHeader && (
          <View style={headerMargin(insets.top)}>{props.header}</View>
        )}
        {props.isScrollable ? (
          <>
            <Animated.ScrollView
              ref={ref}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={[
                styles(theme).scrollableContainer,
                scrollMargin(!props.isFixedHeader ? insets.top : 0),
              ]}
              keyboardShouldPersistTaps="handled"
              onScroll={props.onScroll}
            >
              {!props.isFixedHeader && props.header}
              {props.children}
              {!props.isFixedFooter && (
                <View style={footerPadding(insets.bottom)}>
                  {props.footer}
                </View>
              )}
            </Animated.ScrollView>
          </>
        ) : (
          <View style={[styles(theme).fixedContainer]}>{props.children}</View>
        )}

        {props.isFixedFooter && (
          <View style={footerPadding(insets.bottom)}>{props.footer}</View>
        )}
      </View>
    </>
  );
});

export default MainLayout;
