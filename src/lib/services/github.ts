import { env } from "$env/dynamic/private";
import type { GithubRepo } from "$lib/types";

const token = env.API_GITHUB_TOKEN;


const listUserRepositories = async (limit: number = 100): Promise<GithubRepo[]> => {
    const resp = await fetch(`https://api.github.com/users/zaibon/repos?per_page=${limit}&sort=pushed`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    return await resp.json();
};

const getUserRepository = async (name: string): Promise<GithubRepo> => {
    const resp = await fetch(`https://api.github.com/repos/zaibon/${name}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    return await resp.json();
};

export default {
    listUserRepositories,
    getUserRepository
};