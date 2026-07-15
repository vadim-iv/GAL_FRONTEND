"use client"

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
    handleDelete: () => void;
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message?: string;
    // Set to false when nested inside another modal that already stops/starts Lenis
    // itself — otherwise this modal's unmount would re-enable scroll prematurely
    // while the parent modal is still open.
    manageLenis?: boolean;
}

export function ConfirmDeleteModal({ handleDelete, setDeleteModalOpen, message, manageLenis = true }: Props) {

    const lenis = useLenis();
    const t = useTranslations("Admin")

    useEffect(() => {
       if (!manageLenis) return

       lenis?.stop()

       return () => lenis?.start()
    }, [lenis, manageLenis]);

    return createPortal(
        <motion.div
            className="fixed inset-0 flex items-center backdrop-blur-[0.25rem] justify-center bg-black/35 z-[50000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.stopPropagation()}
        >
            <motion.div
                initial={{ y: "-10%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-10%" }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className="bg-white max-w-[26.5rem] w-full rounded-[1rem] p-[1.5rem] h-[11.25rem] flex flex-col justify-between"
            >
                <p className="text-[1.125rem] font-[400] leading-[100%]">{message ?? t('delete_question')}</p>
                <div className="flex justify-end gap-[1.5rem] items-center">
                    <p onClick={() => setDeleteModalOpen(false)} className="leading-[1.125rem] cursor-pointer text-[1rem] hover:opacity-60 transition-opacity duration-300">{t('cancel_delete')}</p>
                    <div
                        onClick={() => {
                            handleDelete();
                            setDeleteModalOpen(false);
                        }}
                        className="h-[2.5rem] px-[1rem] cursor-pointer flex items-center justify-center bg-error hover:bg-red-700 transition-colors duration-300 rounded-[2rem] text-white text-[1rem] font-[400] leading-[1.125rem]">
                        {t("confirm_delete")}
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}
