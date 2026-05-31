// Зеркалит back/src/features/uploads/uploads.schema.ts

export type AllowedMimeType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
export type AllowedExt = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif';

export type SignUploadRequest = {
  contentType: AllowedMimeType;
  ext: AllowedExt;
};

export type SignUploadResponse = {
  uploadUrl: string;
  publicUrl: string;
  path: string;
};
