import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { ButtonVariant, MainButton } from "./main-button";

type GoogleButtonProp = {
    onPress: () => void
    title: string
}


export function GoogleButton({ onPress, title }: GoogleButtonProp) {
    return (
        <MainButton style={styles.googleButton} onPress={onPress} variant={ButtonVariant.SECONDARY} title={title}>
            <Image source={require('@/assets/svg/google.svg')} style={{ width: 18, height: 18 }} />
        </MainButton>
    );
}

const styles = StyleSheet.create({
    googleButton: {
        width: '100%',
    },
});