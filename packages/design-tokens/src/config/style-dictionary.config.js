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

        // Base tokens
        const baseTokens = dictionary.allTokens.filter(
          (token) => token.path[0] !== "theme" && token.path[0] !== "component"
        );

        // Light theme tokens
        const lightTokens = dictionary.allTokens.filter(
          (token) =>
            token.path[0] === "theme" &&
            token.path[1] === "light" &&
            token.path[2] !== "component"
        );

        // Dark theme tokens
        const darkTokens = dictionary.allTokens.filter(
          (token) =>
            token.path[0] === "theme" &&
            token.path[1] === "dark" &&
            token.path[2] !== "component"
        );

        // Light component tokens
        const lightComponentTokens = dictionary.allTokens.filter(
          (token) =>
            token.path[0] === "theme" &&
            token.path[1] === "light" &&
            token.path[2] === "component"
        );

        // Dark component tokens
        const darkComponentTokens = dictionary.allTokens.filter(
          (token) =>
            token.path[0] === "theme" &&
            token.path[1] === "dark" &&
            token.path[2] === "component"
        );

        const baseVariables = baseTokens.map(formatProperty).join("\n");

        const lightVariables = lightTokens.map(formatProperty).join("\n");

        const darkVariables = darkTokens.map(formatProperty).join("\n");

        const lightComponentVariables = lightComponentTokens
          .map((token) =>
            formatProperty({
              ...token,
              name: `component-${token.path.slice(3).join("-")}`,
            })
          )
          .join("\n");

        const darkComponentVariables = darkComponentTokens
          .map((token) =>
            formatProperty({
              ...token,
              name: `component-${token.path.slice(3).join("-")}`,
            })
          )
          .join("\n");

        return `/* Base tokens */
:root {
${baseVariables}
}

/* Light theme tokens */
[data-theme="light"] {
${lightVariables}

${lightComponentVariables}
}

/* Dark theme tokens */
[data-theme="dark"] {
${darkVariables}

${darkComponentVariables}
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
