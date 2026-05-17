import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from "react-native";
import { ButtonVariant, MainButton } from "./main-button";

type AppleButtonProp = {
    onPress: () => void
    title: string
}

export function AppleButton({ onPress, title }: AppleButtonProp) {
    return (
        <MainButton style={styles.appleButton} onPress={onPress} variant={ButtonVariant.SECONDARY} title={title} >
            <FontAwesome name={"apple"} size={18} color={"black"} />
        </MainButton>
    );
}

const styles = StyleSheet.create({
    appleButton: {
        width: '100%',
    },
});