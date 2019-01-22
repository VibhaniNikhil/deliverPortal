module.exports = {
    "presets": [
        ["@babel/preset-env",
        {
            "targets": {
                "node": "current"
            },
            "shippedProposals": true
        }],
        "@babel/preset-react",
        "@babel/preset-flow"
    ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-react-jsx-self",
    "@babel/plugin-transform-react-jsx-source"
  ],

  "env": {
    "production": {
      "presets": ["minify"]
    }
  }
}

