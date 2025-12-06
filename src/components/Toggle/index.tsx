import React from 'react';
import {appColors} from '../../theme/colors';
import {Switch} from 'react-native-switch';
import {px} from '../../utils';

interface ToggleProps {
  isOn: boolean;
  onToggle: ((isOn: boolean) => any) | undefined;
}
const Toggle = ({isOn, onToggle}: ToggleProps) => {
  return (
    <Switch
      value={isOn}
      onValueChange={onToggle}
      renderActiveText={false}
      renderInActiveText={false}
      circleBorderWidth={px(2)}
      circleBorderActiveColor={appColors.primary}
      circleBorderInactiveColor={appColors.gray500}
      backgroundActive={appColors.primary}
      backgroundInactive={appColors.gray500}
    />
  );
};

export default Toggle;
