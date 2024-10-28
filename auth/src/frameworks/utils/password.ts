import bcrypt from 'bcryptjs';

export const generateHashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};
