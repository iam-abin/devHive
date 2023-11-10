import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 3000, // This is the port which we will use in docker
		watch: {
			usePolling: true
		}
	},
	build: {
		chunkSizeWarningLimit: 1600
	},
	preview: {
		port: 3000
	}
});