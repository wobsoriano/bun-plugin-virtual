type VirtualOptions = Record<string, string | Record<string, unknown>>;

function generateNamedExports(obj: Record<string, unknown>) {
  const exportStrings = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      exportStrings.push(`export const ${key} = ${JSON.stringify(obj[key])};`);
    }
  }

  return exportStrings.join('\n');
}

export default function virtual(options: VirtualOptions): import('bun').BunPlugin {
  const namespace = 'virtual';

  const filter = new RegExp(
    Object.keys(options).map((name) => `^${name}$`).join("|"),
  );

  return {
    name: 'bun-plugin-virtual',
    setup({ onResolve, onLoad }) {
      onResolve({ filter }, (args) => ({ path: args.path, namespace }));

      onLoad(
        { filter: /.*/, namespace },
        (args) => {
          const contents = options[args.path]

          if (typeof contents === 'string') {
            return { contents, loader: 'js' }
          }

          return { contents: generateNamedExports(contents), loader: 'js' }
        },
      );
    }
  }
}
