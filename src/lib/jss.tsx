import { create } from 'jss';
import preset from 'jss-preset-default';
import { createGenerateId } from 'jss';

const generateId = createGenerateId({
  minify: true, // Consistent class names
});

const jss = create(preset());
jss.setup({ createGenerateId: () => generateId });

export default jss;
