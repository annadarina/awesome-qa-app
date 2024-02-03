import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalTypes } from '../../types';

interface ModalState {
  currentModal: ModalTypes | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps: { [key: string]: any };
}

const initialState: ModalState = {
  currentModal: null,
  modalProps: {},
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        modalType: ModalTypes;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modalProps?: any;
      }>
    ) {
      const { modalType, modalProps } = action.payload;
      state.currentModal = modalType;
      state.modalProps = modalProps || {};
    },
    hideModal(state) {
      state.currentModal = null;
      state.modalProps = {};
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
