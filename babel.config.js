module.exports = function(api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: ['.tsx'],
          alias: {
            components: "./src/components",
            contexts: "./src/contexts",
            api: "./src/api",
            screens: "./src/screens",
            helpers: "./src/helpers",
            navigation: "./src/navigation"
          },
        },
      ],
    ],
  }
}
