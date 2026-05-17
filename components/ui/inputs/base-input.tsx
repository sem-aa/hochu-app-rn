import { radius, semanticColors, spacing } from '@/constants';
import { forwardRef } from 'react';
import { StyleSheet, TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ANIMATION_DURATION = 150;

export type BaseInputProps = {
    containerStyle?: StyleProp<ViewStyle>;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
} & TextInputProps;

export const BaseInput = forwardRef<TextInput, BaseInputProps>(function BaseInput(
    { containerStyle, leftSlot, rightSlot, onFocus, onBlur, ...rest },
    ref,
) {
    const progress = useSharedValue(0);

    const animatedBorder = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            progress.value,
            [0, 1],
            [semanticColors.light.border.primary, semanticColors.light.border.focus],
        ),
    }));

    const handleFocus: TextInputProps['onFocus'] = (e) => {
        progress.value = withTiming(1, { duration: ANIMATION_DURATION });
        onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = (e) => {
        progress.value = withTiming(0, { duration: ANIMATION_DURATION });
        onBlur?.(e);
    };

    return (
        <Animated.View style={[styles.container, animatedBorder, containerStyle]}>
            <View style={styles.leftSlot}>
                {leftSlot}
            </View>
            <TextInput
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholderTextColor={semanticColors.light.text.tertiary}
                style={styles.input}
                {...rest}
            />
            <View style={styles.rightSlot}>
                {rightSlot}
            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: radius.full,
        paddingVertical: spacing[3],
        paddingHorizontal: spacing[4],
        gap: spacing[2],
    },
    input: {
        flex: 1,
        padding: 0,
        margin: 0,
        color: semanticColors.light.text.primary,
    },
    leftSlot: {
        position: 'absolute',
        left: spacing[1],
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing[1],
    },
    rightSlot: {
        position: 'absolute',
        right: spacing[1],
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing[1],
    },
});
