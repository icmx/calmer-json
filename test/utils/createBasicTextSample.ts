import { createBasicJsonSample } from './createBasicJsonSample';

export const createBasicTextSample = () => {
  const json = createBasicJsonSample();
  const text = JSON.stringify(json);

  return text;
};
