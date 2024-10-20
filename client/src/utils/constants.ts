export const CONSTANTS = Object.freeze({
    CANDIDATE_DEFAULT_PROFILE_IMAGE:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o6VzWIuaRNqFtT-necsi1hEqh8YsPQ-p7Q&s",
    RECRUITER_DEFAULT_PROFILE_IMAGE:
        "https://static.vecteezy.com/ti/vetor-gratis/p3/19494949-servico-call-center-homem-usuario-avatar-pessoa-pessoas-estilo-contorno-colorido-vetor.jpg",
});

export const LOCAL_STORAGE = Object.freeze({
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",

    ADMIN_ACCESS_TOKEN: "adminAccessToken",
    ADMIN_REFRESH_TOKEN: "adminRefreshToken",

    CANDIDATE_ACCESS_TOKEN: "candidateAccessToken",
    CANDIDATE_REFRESH_TOKEN: "candidateRefreshToken",

    RECRUITER_ACCESS_TOKEN: "recruiterAccessToken",
    RECRUITER_REFRESH_TOKEN: "recruiterRefreshToken",
});


// import { IUserRole } from "../types/role";

export const ROLES = Object.freeze({
    ADMIN: "admin",
    CANDIDATE: "candidate",
    RECRUITER: "recruiter",
});
