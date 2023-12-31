
import { createSlice, } from '@reduxjs/toolkit';
// import { RootState } from '../../reducer/reducer';

interface ApiState {
  isLoading: boolean;
}

const initialState: ApiState = {
  isLoading: false,
};

const apiCallLoadingSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setLoaded: (state) => {
      state.isLoading = false;
    },
  },
});

// export const selectApiLoading = (state: RootState) => state.api.loading;

export const { setLoading, setLoaded } = apiCallLoadingSlice.actions;
export default apiCallLoadingSlice.reducer;
