import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./cluster-cli/index.ts"],
  sourcemap: false,
  bundle: true,
  tsconfig: "tsconfig.json",
  platform: "node",
  outfile: "cluster-cli/build/index.cjs",
});