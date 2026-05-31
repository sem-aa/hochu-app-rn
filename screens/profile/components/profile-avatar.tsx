import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';

import { IconButton } from '@/shared/ui/buttons';
import { ThemedView } from '@/shared/ui/themed';
import { radius, semanticColors, spacing } from '@/constants';
import { useUpdateMeMutation } from '@/entities/user';
import { useImageUpload } from '@/shared/hooks/use-image-upload';

type Props = {
  avatarUrl: string | null | undefined;
  name: string | undefined;
};

function getProfileErrorMessage(e: unknown): string {
  if (typeof e !== 'object' || e === null) {
    return 'Спробуй ще раз.';
  }

  const err = e as { data?: { error?: { message?: string } }; status?: string | number };

  if (err.status === 'FETCH_ERROR' || err.status === 'TIMEOUT_ERROR') {
    return 'Не вдалося підключитися до сервера.';
  }

  return err.data?.error?.message ?? 'Спробуй ще раз.';
}

export function ProfileAvatar({ avatarUrl, name: _name }: Props) {
  const [updateMe, { isLoading: isSaving }] = useUpdateMeMutation();
  const { imageUri, isUploading, pickAndUpload, removeImage } = useImageUpload();

  const displayUri = imageUri ?? avatarUrl ?? null;
  const hasAvatar = Boolean(avatarUrl);
  const isBusy = isUploading || isSaving;

  const saveAvatarUrl = async (url: string) => {
    try {
      await updateMe({ avatarUrl: url }).unwrap();
      removeImage();
    } catch (e: unknown) {
      Alert.alert('Помилка', getProfileErrorMessage(e));
    }
  };

  const handleUpload = async () => {
    const url = await pickAndUpload();
    if (url) {
      await saveAvatarUrl(url);
    }
  };

  const handleRemove = async () => {
    try {
      await updateMe({ avatarUrl: null }).unwrap();
      removeImage();
    } catch (e: unknown) {
      Alert.alert('Помилка', getProfileErrorMessage(e));
    }
  };

  return (
    <View style={styles.wrapper}>
      <ThemedView
        style={styles.photo}
        lightColor={semanticColors.light.bg.primary}
        darkColor={semanticColors.dark.bg.primary}
      >
        {isBusy ? (
          <ActivityIndicator color={semanticColors.light.text.secondary} />
        ) : displayUri ? (
          <>
            <Image source={{ uri: displayUri }} style={styles.image} resizeMode="cover" />
            {hasAvatar ? (
              <View style={styles.removeOverlay}>
                <IconButton
                  icon="trash.fill"
                  variant="secondary"
                  size="sm"
                  sizeIcon={14}
                  onPress={handleRemove}
                  disabled={isBusy}
                />
              </View>
            ) : null}
          </>
        ) : (
          <View style={styles.avatarLetterContainer}>
            <IconButton size="sm" variant="secondary" icon="photo" onPress={handleUpload} disabled={isBusy} />
          </View>
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: spacing[3],
  },
  photo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  removeOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  avatarLetterContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
