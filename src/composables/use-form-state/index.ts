import { computed, ref } from "vue";

export function useFormState<T extends Record<string, any>>(obj: T) {
    const data = ref<T>({
        ...obj
    });
    
    const errorsObj: Record<string, string> = { message: '' };

    Object.keys(obj).forEach((key) => errorsObj[key] = ''); 

    const errors = ref(errorsObj);

    const isSubmitDisabled = computed(() => {
        const isNotFullFilled = Object.keys(data.value).some((key) => !data.value[key]);

        return isNotFullFilled;
    });

    return { data, errors, isSubmitDisabled };
};
