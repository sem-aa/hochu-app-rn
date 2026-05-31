import { api } from '@/shared/api/api';
import type { SignUploadRequest, SignUploadResponse } from '../types';

export const uploadsApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUpload: build.mutation<SignUploadResponse, SignUploadRequest>({
      query: (body) => ({ url: '/uploads/sign', method: 'POST', body }),
    }),
  }),
});

export const { useSignUploadMutation } = uploadsApi;
