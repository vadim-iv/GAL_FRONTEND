import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { useGetManagement } from "./useGetManagement";
import { TypeMainImageFormState } from "@/types/management.types";

export function useInitialMainImageData(reset: UseFormReset<TypeMainImageFormState>) {
  const { management, isSuccess, isLoading } = useGetManagement()

    useEffect(() => {
            if(isSuccess && management){
                reset({
                    main_image: management.main_image
                })
            }
    }, [isSuccess, management, reset])

    return { isLoading }
}
