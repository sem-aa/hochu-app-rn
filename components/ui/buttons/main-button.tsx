import { radius, semanticColors, spacing } from "@/constants";
import { Pressable, StyleProp, StyleSheet, ViewStyle, } from "react-native";
import { ThemedText } from "../../themed-text";

export enum ButtonVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

type MainButtonProp = {
    variant?: ButtonVariant
    disabled?: boolean
    onPress: () => void
    title?: string
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}

export function MainButton({ variant = ButtonVariant.PRIMARY, disabled = false, onPress, title, children, style }: MainButtonProp) {
    const buttonStyle = variant === ButtonVariant.PRIMARY ? styles.primaryButton : styles.secondaryButton;
    const buttonTextStyle = variant === ButtonVariant.PRIMARY ? styles.primaryButtonText : styles.secondaryButtonText;
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.baseButton,
                buttonStyle,
                pressed && (variant === ButtonVariant.PRIMARY ? styles.primaryPressed : styles.secondaryPressed),
                disabled && styles.disabledButton,
                style,
            ]}
        >
            {children}
            {title && <ThemedText style={buttonTextStyle} variant="bodyLg">{title}</ThemedText>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: semanticColors.light.border.secondary,
        paddingVertical: spacing[3],
        paddingHorizontal: spacing[8],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[2],
    },
    primaryButton: {
        backgroundColor: semanticColors.light.action.primaryBg,
    },
    primaryButtonText: {
        color: semanticColors.light.action.primaryFg,
    },
    secondaryButton: {
        backgroundColor: semanticColors.light.action.secondaryBg,
    },
    secondaryButtonText: {
        color: semanticColors.light.action.secondaryFg,
    },
    primaryPressed: {
        backgroundColor: semanticColors.light.action.primaryPressed,
        opacity: 0.9,
    },
    secondaryPressed: {
        backgroundColor: semanticColors.light.state.pressed,
    },
    disabledButton: {
        backgroundColor: semanticColors.light.action.disabledBg,
        opacity: 0.5,
    },
    disabledButtonText: {
        color: semanticColors.light.action.disabledFg,
    },
});