// Memoize imageSource so it's only recalculated if dependencies change
import {Image, Pressable} from 'react-native';
import React, {useMemo} from 'react';
import styles from './styles';
import {AppImages} from '../../assets/app_images';
interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
  isSquare?: boolean;
  localImage?: string;
  imageUrl?: string;
  onPress?: () => void;
  pointerEvents?: 'none' | 'auto';
}
const Avatar = ({
  size = 'medium',
  isSquare = false,
  localImage,
  imageUrl,
  onPress,
  pointerEvents = 'auto',
}: AvatarProps) => {
  const imageSource = useMemo(() => {
    if (imageUrl) return {uri: imageUrl};
    if (localImage) return localImage;
    return AppImages.avatar;
  }, [imageUrl, localImage]);

  return (
    <Pressable
      style={styles(size, isSquare).container}
      onPress={onPress}
      pointerEvents={pointerEvents}>
      <Image source={imageSource} style={styles().image} resizeMode="cover" />
    </Pressable>
  );
};

export default React.memo(Avatar);
