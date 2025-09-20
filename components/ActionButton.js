import { Pressable, StyleSheet, Platform } from 'react-native';
import React from 'react';
import theme from '../style/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';

const ActionButton = ({ style = {}, onPress, iconName = "add-outline", isVisible = true }) => {
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(isVisible ? scale.value : 0, { duration: 200 }) }
    ],
    opacity: withTiming(isVisible ? 1 : 0, { duration: 200 })
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onPress && onPress();
  };

  return (
    <Animated.View style={[styles.container, style, animatedStyles]}>
      <LinearGradient
        colors={theme.PRIMARY_GRADIENT}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable 
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.buttonStyle} 
          android_ripple={{ color: "rgba(255,255,255,0.3)", radius: 35 }}
        >
          <Ionicons name={iconName} size={28} color="white" />
        </Pressable>
      </LinearGradient>
    </Animated.View>
  )
}

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: theme.SPACING.XL,
    right: theme.SPACING.XL,
    zIndex: 1000,
  },
  gradient: {
    borderRadius: theme.RADIUS.FULL,
    ...Platform.select({
      ios: {
        shadowColor: theme.PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      }
    })
  },
  buttonStyle: {
    width: 70,
    height: 70,
    borderRadius: theme.RADIUS.FULL,
    justifyContent: "center",
    alignItems: "center",
  }
});
