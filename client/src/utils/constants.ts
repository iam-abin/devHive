export const CONSTANTS = Object.freeze({
    CANDIDATE_DEFAULT_PROFILE_IMAGE:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o6VzWIuaRNqFtT-necsi1hEqh8YsPQ-p7Q&s",
    RECRUITER_DEFAULT_PROFILE_IMAGE:
        "https://static.vecteezy.com/ti/vetor-gratis/p3/19494949-servico-call-center-homem-usuario-avatar-pessoa-pessoas-estilo-contorno-colorido-vetor.jpg",
});

export const LOCAL_STORAGE = Object.freeze({
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken"
});


// import { IUserRole } from "../types/role";

export const ROLES = Object.freeze({
    ADMIN: "admin",
    CANDIDATE: "candidate",
    RECRUITER: "recruiter",
});


export const SEARCH_RESOURCE_TYPES = Object.freeze({
    CANDIDATE: 'candidate',
    RECRUITER: 'recruiter',
    JOBS: 'jobs',
    PAYMENTS: 'payments',
    PLANS: 'palns',
});