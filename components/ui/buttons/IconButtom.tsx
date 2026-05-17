import { semanticColors } from "@/constants/color-tokens";
import { spacing } from "@/constants/spacing-tokens";
import { SymbolViewProps } from "expo-symbols";
import { StyleSheet } from "react-native";
import { IconSymbol } from "../icon-symbol";
import { ButtonVariant, MainButton } from "./main-button";

type IconButtonProp = {
    icon: SymbolViewProps['name']
    onPress: () => void
    title?: string
    variant?: ButtonVariant
    sizeIcon?: number
}

export function IconButton({ icon, onPress, title, variant = ButtonVariant.PRIMARY, sizeIcon = 20 }: IconButtonProp) {
    const iconColor = variant === ButtonVariant.PRIMARY ? semanticColors.dark.text.primary : semanticColors.light.text.primary
    return (
        <MainButton onPress={onPress} variant={variant} title={title} style={title ? "" : styles.iconButton} >
            <IconSymbol name={icon} size={sizeIcon} color={iconColor} />
        </MainButton>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[2],
    },
});