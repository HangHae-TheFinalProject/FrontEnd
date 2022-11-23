import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMaster: false,
  stage: 0,
  isMute: false,
  spotlightMember: '',
  popupStatus: 'LIER_USER',
  gameBoardStatus: 'WAIT_START',
  memberList: ['A', 'B', 'C', 'D', 'E', 'F'],
  memberVoteResult: 'TEST_LIAR'
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage(state, action) {
      state.stage = action.payload;
    },
    setIsMaster(state, action) {
      state.isMaster = action.payload;
    },
    setSpotlightMember(state, action) {
      state.spotlightMember = action.payload;
    },
    setPopupStatus(state, action) {
      state.popupStatus = action.payload;
    },
    setGameBoardStatus(state, action) {
      state.gameBoardStatus = action.payload;
    },
    setMemberList(state, action) {
      state.memberList = action.payload;
    },
    setMemberVoteResult(state, action) {
      state.memberVoteResult = action.payload;
    }


  },
  extraReducers: {
    
  }
});

export const { setStage, setIsMaster, setSpotlightMember, setPopupStatus, setGameBoardStatus, setMemberList, setMemberVoteResult } = gameSlice.actions;
export default gameSlice.reducer;