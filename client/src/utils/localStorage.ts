export const setItemToLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string): string | null => {
    const token = localStorage.getItem(key);
    if (!token) return null;
    return JSON.parse(token);
};

export const clearItemFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
    localStorage.clear();
};
