// src/styles/jssSetup.ts
import { create } from 'jss';
import preset from 'jss-preset-default';
import { createGenerateId } from 'jss';

export const jss = create(preset());
export const generateId = createGenerateId({ minify: false });
