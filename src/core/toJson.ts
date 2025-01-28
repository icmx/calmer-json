import { EntryMapper } from '../types/EntryMapper';
import { ErrorHandler } from '../types/ErrorHandler';
import { createDefaultErrorHandler } from '../utils/createDefaultErrorHandler';
import { createDefaultReplacer } from '../utils/createDefaultReplacer';

export type ToJsonOptions = {
  replacer?: EntryMapper;
  space?: string | number;
  onError?: ErrorHandler<string>;
};

export const toJson = <T = unknown>(
  value: T,
  options: ToJsonOptions = {}
): string => {
  const replacer = options.replacer || createDefaultReplacer();
  const space = options.space || undefined;
  const onError = options.onError || createDefaultErrorHandler();

  try {
    return JSON.stringify(value, replacer, space);
  } catch (error) {
    return onError(error);
  }
};
