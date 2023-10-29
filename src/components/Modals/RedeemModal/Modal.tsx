import React from 'react';
import { RedeemModalProps } from '@/types/types';
import { motion } from 'framer-motion';
import Button from '../../Button/Button';


const Modal: React.FC<RedeemModalProps> = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-70">
            <div className="modal-overlay fixed inset-0 "></div>
            <div className={`modal bg-white w-full md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] overflow-auto max-h-[60vh] rounded-lg shadow-lg z-50 `}>
                <div className={`sticky top-0 mb-4 px-4 py-2`}>
                    <button
                        className="modal-close hover:opacity-75 duration-300 float-right text-4xl font-bold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className={`modal-content p-4 px-4 mt-4 lg:px-12`}>{children}</div>
            </div>
        </motion.div>
    );
};

export default Modal;
