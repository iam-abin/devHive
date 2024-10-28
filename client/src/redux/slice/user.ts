import { createSlice } from "@reduxjs/toolkit";
import { clearItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage";
import { LOCAL_STORAGE } from "../../utils/constants";
import { IUserData } from "../../types/user";


interface IUserSlice {
    authData: IUserData | null,
    myProfile: any,
    otherUserProfile: any,
    accessToken: string | null,
    refreshToken: string | null,
}


const initialState: IUserSlice = {
    authData: null,
    myProfile: null,
    otherUserProfile: null,
    accessToken: null,
    refreshToken: null,
};

const UserSlice = createSlice({
    name: "user-data",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authData = action.payload.data;

            setItemToLocalStorage(
                LOCAL_STORAGE.ACCESS_TOKEN,
                JSON.stringify(action.payload?.accessToken)
            );
            setItemToLocalStorage(
                LOCAL_STORAGE.REFRESH_TOKEN,
                JSON.stringify(action.payload?.refreshToken)
            );
        },
        clearUser: (state) => {
            state.authData = null;
            clearItemFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);
            clearItemFromLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN);
        },

        setMyProfileData: (state, action) => {
			state.myProfile = action.payload;
		},

        clearMyProfileData: (state) => {
			state.myProfile = null;
		}
    },
});

export const { setUser, clearUser, setMyProfileData, clearMyProfileData } = UserSlice.actions; //we can use it in login page
export default UserSlice.reducer;
