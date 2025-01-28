import { EntryMapper } from '../types/EntryMapper';
import { ErrorHandler } from '../types/ErrorHandler';
import { createDefaultErrorHandler } from '../utils/createDefaultErrorHandler';

export type FromJsonOptions<T = unknown> = {
  reviver?: EntryMapper;
  onError?: ErrorHandler<T>;
};

export const fromJson = <T = unknown>(
  text: string,
  options: FromJsonOptions<T> = {}
): T => {
  const reviver = options.reviver || undefined;
  const onError = options.onError || createDefaultErrorHandler();

  try {
    return JSON.parse(text, reviver);
  } catch (error) {
    return onError(error);
  }
};
