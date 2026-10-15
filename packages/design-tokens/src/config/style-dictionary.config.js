import { transformGroups } from "style-dictionary/enums";
import { createPropertyFormatter } from "style-dictionary/utils";

export default {
  source: ["src/tokens/**/*.json"],

  hooks: {
    filters: {
      isBase: (token) =>
        token.path[0] !== "theme" && token.path[0] !== "component",

      isTheme: (token) => token.path[0] === "theme",

      isLightTheme: (token) =>
        token.path[0] === "theme" && token.path[1] === "light",

      isDarkTheme: (token) =>
        token.path[0] === "theme" && token.path[1] === "dark",

      isComponent: (token) =>
        token.path[0] === "theme" && token.path[2] === "component",

      isLightComponent: (token) =>
        token.path[0] === "theme" &&
        token.path[1] === "light" &&
        token.path[2] === "component",

      isDarkComponent: (token) =>
        token.path[0] === "theme" &&
        token.path[1] === "dark" &&
        token.path[2] === "component",
    },

    formats: {
      "css/organized": ({ dictionary, options }) => {
        const formatProperty = createPropertyFormatter({
          format: "css",
          dictionary,
          outputReferences: options.outputReferences,
          usesDtcg: true,
        });

        const baseTokens = dictionary.allTokens.filter(
          (token) => token.path[0] !== "theme" && token.path[0] !== "component"
        );

        const getThemeTokens = (theme) =>
          dictionary.allTokens.filter(
            (token) =>
              token.path[0] === "theme" &&
              token.path[1] === theme &&
              token.path[2] !== "component"
          );

        const getComponentGroups = (theme) => {
          const components = dictionary.allTokens.filter(
            (token) =>
              token.path[0] === "theme" &&
              token.path[1] === theme &&
              token.path[2] === "component"
          );

          const groups = new Map();

          for (const token of components) {
            const componentName = token.path[3];

            if (!componentName) continue;

            if (!groups.has(componentName)) {
              groups.set(componentName, []);
            }

            groups.get(componentName).push(token);
          }

          return [...groups.entries()]
            .map(([name, tokens]) => {
              const variables = tokens
                .map((token) =>
                  formatProperty({
                    ...token,
                    name: `component-${token.path.slice(3).join("-")}`,
                  })
                )
                .join("\n");

              return `  /* ${name} component */\n${variables
                .split("\n")
                .map((line) => `  ${line}`)
                .join("\n")}`;
            })
            .join("\n\n");
        };

        const formatTokens = (tokens) => tokens.map(formatProperty).join("\n");

        const baseVariables = formatTokens(baseTokens);
        const lightVariables = formatTokens(getThemeTokens("light"));
        const darkVariables = formatTokens(getThemeTokens("dark"));

        const lightComponents = getComponentGroups("light");
        const darkComponents = getComponentGroups("dark");

        return `/* Base tokens */
:root {
${baseVariables}
}

/* Light theme tokens */
[data-theme="light"] {
${lightVariables}

${lightComponents}
}

/* Dark theme tokens */
[data-theme="dark"] {
${darkVariables}

${darkComponents}
}
`;
      },
    },
  },

  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: "src/build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/organized",
          options: {
            outputReferences: true,
          },
        },
      ],
    },

    scss: {
      transformGroup: transformGroups.scss,
      buildPath: "src/build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
    },

    js: {
      transformGroup: transformGroups.js,
      buildPath: "src/build/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
