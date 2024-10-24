import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  sourcemap: false,
  bundle: true,
  tsconfig: "tsconfig.json",
  platform: "node",
  outfile: "build/index.js",
  external:['@user-office-software/duo-logger', 'express', 'oracledb'],
});