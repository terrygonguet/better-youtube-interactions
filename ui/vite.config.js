import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import Icons from "unplugin-icons/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({ emitCss: false }),
		Icons({
			compiler: "svelte",
			customCollections: {
				custom: FileSystemIconLoader("./assets/svg"),
			},
		}),
	],
	build: {
		lib: {
			entry: "src/main.js",
			formats: ["es"],
		},
		outDir: "../dist/scripts",
		emptyOutDir: false,
		target: "esnext",
	},
	server: {
		hmr: false,
	},
})
