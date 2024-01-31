import useCounterStore from './user';

export default function useStore() {
  return {
    user: useCounterStore(),
  };
}
