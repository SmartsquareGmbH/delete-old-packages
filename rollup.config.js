// @ts-check
import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: {
    esModule: true,
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve({ preferBuiltins: true }), commonjs()],
}
