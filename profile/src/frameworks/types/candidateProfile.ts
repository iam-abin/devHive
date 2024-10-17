export interface ICandidate {
    userId: string;
    email: string;
    name: string;
    phone: number;
    role: string;
    isActive: boolean;
}

export interface CandidateDataProfile extends ICandidate {
    isVarified: boolean;
    gender: string;
    currentLocation: string;
    address: object;
    skills: string[];
    profile_image: string;
    about: string;
    resume: string;
    experience: string;
}

export interface IResume {
    filename: string;
    url: string;
}

export interface IFileData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

export interface IUploadResponse {
    public_id: string;
    url: string;
}

export interface IPaymentData {
    candidateId: string;
}

export interface IAddress {
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}
