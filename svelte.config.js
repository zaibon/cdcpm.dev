import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';


export default {
    preprocess: [vitePreprocess()],
    kit: {
        adapter: adapter({
            // see the 'Deployment configuration' section below
        })
    },
};