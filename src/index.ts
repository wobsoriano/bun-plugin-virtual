type VirtualOptions = Record<string, string | Record<string, unknown>>;

const moduleMap = new Map<string, string>()

export default function virtual(options: VirtualOptions): import('bun').BunPlugin {
  const namespace = 'virtual';

  const filter = new RegExp(
    Object.keys(options).map((name) => `^${name}$`).join("|"),
  );

  generateModuleMap(options);

  return {
    name: 'bun-plugin-virtual',
    setup({ onResolve, onLoad }) {
      onResolve({ filter }, (args) => ({ path: args.path, namespace }));

      onLoad(
        { filter: /.*/, namespace },
        (args) => {
          const contents = moduleMap.get(args.path)!;

          if (typeof contents === 'string') {
            return { contents, loader: 'js' }
          }

          return { contents, loader: 'js' }
        },
      );
    }
  }
}

function generateNamedExports(obj: Record<string, unknown>) {
  const exportStrings = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      exportStrings.push(`export const ${key} = ${JSON.stringify(obj[key])};`);
    }
  }

  return exportStrings.join('\n');
}

function generateModuleMap(options: VirtualOptions) {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const contents = options[key];

      if (typeof contents === 'string') {
        moduleMap.set(key, contents);
      } else {
        moduleMap.set(key, generateNamedExports(contents));
      }
    }
  }
}
