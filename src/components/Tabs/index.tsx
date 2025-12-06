import {FlatList, Pressable} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Text from '../Text';
import {appColors} from '../../theme/colors';
import styles from './styles';
import {useAppTheme} from '../../theme';
interface TabsProps {
  tabs: string[] | number[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  variant: 'categories' | 'sizes';
}

interface TabProps {
  item: string | number;
  index: number;
}
const Tabs = ({tabs, activeTab, setActiveTab, variant}: TabsProps) => {
  const {theme} = useAppTheme();
  const tabsRef = useRef<FlatList>(null);
  const handleOnPress = useCallback(
    (_: unknown, index: number) => {
      setActiveTab(() => index);
      tabsRef?.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
        animated: true,
      });
    },
    [setActiveTab],
  );

  const tabItem = ({item, index}: TabProps) => (
    <Pressable onPress={() => handleOnPress(item, index)}>
      <Text
        style={[
          styles(theme, variant).tabContainer,
          activeTab === index
            ? styles(theme,variant).activeTabContainer
            : styles(theme).inactiveTabColor,
        ]}
        fontWeight="medium"
        color={activeTab === index ? appColors.white : theme.primaryText}>
        {item}
      </Text>
    </Pressable>
  );
  return (
    <FlatList
      ref={tabsRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles(theme,variant).tabsContainer}
      data={tabs}
      keyExtractor={item => item.toString()}
      renderItem={tabItem}
    />
  );
};

export default Tabs;
