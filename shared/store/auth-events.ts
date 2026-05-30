import { createAction } from '@reduxjs/toolkit';

/**
 * Dispatched by base-query when refresh-token обмен не удался.
 * features/auth обрабатывает это в extraReducers и очищает состояние.
 */
export const sessionExpired = createAction('session/expired');
