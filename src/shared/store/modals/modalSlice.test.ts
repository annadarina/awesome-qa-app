import { ModalTypes } from 'shared/types';
import { showModal, hideModal, modalsSlice } from './modalsSlice';

describe('modalSlice', () => {
  const mockInitialState = {
    currentModal: null,
    modalProps: {},
  };

  it('should show modal', () => {
    const state = { ...mockInitialState };
    const modalType = ModalTypes.ADD;
    const modalProps = { foo: 'bar' };
    const nextState = modalsSlice.reducer(
      state,
      showModal({ modalType, modalProps })
    );
    expect(nextState.currentModal).toEqual(modalType);
    expect(nextState.modalProps).toEqual(modalProps);
  });

  it('should hide modal', () => {
    const state = {
      currentModal: ModalTypes.ADD,
      modalProps: { foo: 'bar' },
    };
    const nextState = modalsSlice.reducer(state, hideModal());
    expect(nextState.currentModal).toBeNull();
    expect(nextState.modalProps).toEqual({});
  });
});
