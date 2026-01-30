import { Pressable, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAppTheme } from '../../theme';
import Text from '../Text';
import { appColors } from '../../theme/colors';

type ReadMoreText = {
  description: string;
  numberOfLines: number;
};

const ReadMoreText = ({ description, numberOfLines }: ReadMoreText) => {
  const { theme } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTrunc, setIsTrunc] = useState(false);

  return (
    <View>
      <Text
        style={styles.measurementHack}
        fontSize={14}
        onTextLayout={e => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setIsTrunc(true);
          }
        }}
      >
        {description}
      </Text>

      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        fontSize={14}
        color={theme.secondaryText}
      >
        {description}
        {/* Show Read More / Read Less */}
      </Text>

      {isTrunc && (
        <Pressable
          onPress={() => {
            setIsExpanded(prev => !prev);
          }}
        >
          <Text fontSize={14} color={appColors.primary}>
            {isExpanded ? 'Read less' : 'Read more'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  measurementHack: {
    height: 0,
    position: 'absolute',
  },
});

export default React.memo(ReadMoreText);
