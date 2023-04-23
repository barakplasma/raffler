import { Directus } from "@directus/sdk";
import type { CustomDirectusTypes } from "./types";

export const directus = new Directus<CustomDirectusTypes>("https://directus-846u.onrender.com");

const password = localStorage.getItem("directus-password");
(async () => {
    if (password) {
        await directus.auth.login({
            email: "barakplasma@gmail.com",
            password
        });
    }
})()