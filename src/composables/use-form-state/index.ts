import { computed, ref } from "vue";

export function useFormState<T>(obj: T) {
    const data = ref<T>({
        ...obj
    });
    
    const errors = ref({
        message: '',
        ...obj,
    });

    const isSubmitDisabled = computed(() => {
        const isNotFullFilled = Object.keys(data.value).some((key) => !data.value[key]);

        return isNotFullFilled;
    });

    return { data, errors, isSubmitDisabled };
};
