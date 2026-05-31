import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useSignUploadMutation } from '@/features/uploads';
import type { AllowedMimeType, AllowedExt } from '@/features/uploads';

type UploadState = {
  imageUri: string | null;
  imageUrl: string | null;
  isUploading: boolean;
};

type UseImageUploadReturn = UploadState & {
  /** Return publicUrl after successful upload */
  pickAndUpload: () => Promise<string | undefined>;
  /** Reset preview and URL — when imageUrl is not sent to API */
  removeImage: () => void;
  reset: () => void;
};

function getMimeAndExt(uri: string, mimeType?: string | null): { mime: AllowedMimeType; ext: AllowedExt } {
  const mime = (mimeType ?? '').toLowerCase();

  if (mime === 'image/jpeg' || mime === 'image/jpg' || uri.match(/\.(jpg|jpeg)$/i)) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }
  if (mime === 'image/png' || uri.match(/\.png$/i)) return { mime: 'image/png', ext: 'png' };
  if (mime === 'image/webp' || uri.match(/\.webp$/i)) return { mime: 'image/webp', ext: 'webp' };
  if (mime === 'image/gif' || uri.match(/\.gif$/i)) return { mime: 'image/gif', ext: 'gif' };

  // iOS HEIC — после Compatible-режима пикера обычно приходит JPEG
  if (mime === 'image/heic' || mime === 'image/heif' || uri.match(/\.heic$/i)) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }

  return { mime: 'image/jpeg', ext: 'jpg' };
}

async function uploadFileToSignedUrl(localUri: string, uploadUrl: string, contentType: string): Promise<void> {
  const result = await FileSystem.uploadAsync(uploadUrl, localUri, {
    httpMethod: 'PUT',
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Upload failed: ${result.status} ${result.body}`);
  }
}

export function useImageUpload(): UseImageUploadReturn {
  const [state, setState] = useState<UploadState>({
    imageUri: null,
    imageUrl: null,
    isUploading: false,
  });

  const [signUpload] = useSignUploadMutation();

  const pickAndUpload = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Дозвіл', 'Потрібен доступ до галереї для вибору фото.');
      return undefined;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      allowsEditing: true,
      aspect: [1, 1],
      // iOS: convert HEIC to JPEG/PNG for upload
      preferredAssetRepresentationMode: ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
    });

    if (result.canceled || !result.assets[0]) return undefined;

    const asset = result.assets[0];
    const typeInfo = getMimeAndExt(asset.uri, asset.mimeType);

    setState({ imageUri: asset.uri, imageUrl: null, isUploading: true });

    try {
      const { uploadUrl, publicUrl } = await signUpload({
        contentType: typeInfo.mime,
        ext: typeInfo.ext,
      }).unwrap();

      await uploadFileToSignedUrl(asset.uri, uploadUrl, typeInfo.mime);

      setState({ imageUri: asset.uri, imageUrl: publicUrl, isUploading: false });
      return publicUrl;
    } catch (e: unknown) {
      setState({ imageUri: asset.uri, imageUrl: null, isUploading: false });
      const details = e instanceof Error ? e.message : '';
      Alert.alert('Помилка', `Не вдалося завантажити фото. ${details}`.trim());
      return undefined;
    }
  };

  const removeImage = () => setState({ imageUri: null, imageUrl: null, isUploading: false });

  return { ...state, pickAndUpload, removeImage, reset: removeImage };
}
