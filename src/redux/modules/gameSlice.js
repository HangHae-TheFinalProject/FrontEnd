import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMaster: true,
  stage: 0,
  // isMute: false,
  spotlightMember: '',
  popupStatus: 'VICTORY_LIER',
  gameBoardStatus: 'WAIT_START',
  memberList: [],
  readyMemberList: [],
  memberVoteResult: 'UESR',
  memberLier: '',
  isCamera: true,
  isCantGetDevice: false,
  item: {
    category: '',
    keyword: ''
  }
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
    removeMemberList(state, action) {
      state.memberList = state.memberList.filter((member) => {
        if(member !== action.payload) return member
      });
    },
    setReadyMemberList(state, action) {
      state.readyMemberList = action.payload;
    },
    addReadyMemberList(state, action) {
      state.readyMemberList = [...state.readyMemberList, action.payload];
    },
    setMemberVoteResult(state, action) {
      state.memberVoteResult = action.payload;
    },
    setMemberLier(state, action) {
      state.memberLier = action.payload;
    },
    setIsCamera(state, action) {
      state.isCamera = action.payload;
    },
    setIsCantGetDevice(state, action) {
      state.isCantGetDevice = action.payload;
    },
    setItem(state, action) {
      state.item = action.payload;
    },
  },
  extraReducers: {

  }
});

export const { setStage,
  setIsMaster,
  setSpotlightMember,
  setPopupStatus,
  setGameBoardStatus,
  setMemberList,
  removeMemberList,
  setMemberVoteResult,
  setMemberLier,
  setIsCamera,
  setIsCantGetDevice,
  setItem,
  setReadyMemberList,
  addReadyMemberList
} = gameSlice.actions;

export default gameSlice.reducer;