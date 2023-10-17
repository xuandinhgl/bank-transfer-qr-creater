import {computed, WritableComputedRef} from "vue";

export const useSyncProps = <T, PT>(
  props: PT,
  key: keyof PT,
  emit: any,
): WritableComputedRef<T> => {
  return computed({
    get() {
      return props[key] as T;
    },
    set(value) {
      emit(`update:${key as string}`, value);
    },
  });
};
