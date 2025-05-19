'use client';
import React, { useEffect, useRef } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

export type ModalType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode; // Permite texto con formato (JSX)
    type?: ModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void; // onCancel es opcional ahora
    onClose?: () => void; // Prop para cerrar el modal desde fuera
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    type = 'confirm',
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node) && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="text-green-600 text-5xl" />;
            case 'error':
                return <FaTimesCircle className="text-red-600 text-5xl" />;
            case 'warning':
                return <FaExclamationTriangle className="text-yellow-600 text-5xl" />;
            case 'info':
            case 'confirm':
            default:
                return <FaInfoCircle className="text-blue-600 text-5xl" />;
        }
    };

    const getButtonColors = (isConfirm: boolean) => {
        const base = 'px-5 py-3 rounded-md text-white font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
        switch (type) {
            case 'success':
                return isConfirm ? `${base} cursor-pointer bg-green-600 hover:bg-green-700 focus:ring-green-500` : `${base} cursor-pointer bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500`;
            case 'error':
                return isConfirm ? `${base} cursor-pointer bg-red-600 hover:bg-red-700 focus:ring-red-500` : `${base} cursor-pointer bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500`;
            case 'warning':
                return isConfirm ? `${base} bg-red-800 hover:bg-red-600 focus:ring-red-600 text-black cursor-pointer ` : `${base} cursor-pointer bg-gray-900 text-gray-700 hover:bg-gray-600 focus:ring-gray-500`;
            case 'info':
            case 'confirm':
            default:
                return isConfirm ? `${base} cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-blue-500` : `${base} cursor-pointer bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500`;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-black/30 backdrop-blur-sm bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-6">
            <div
                ref={modalRef}
                className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all duration-300 ease-out scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-3 right-3">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4">{getIcon()}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                    <div className="text-gray-700 mb-6">{message}</div>
                    <div className="flex justify-center space-x-4">
                        {onCancel && (
                            <button onClick={onCancel} className={getButtonColors(false)}>
                                {cancelText}
                            </button>
                        )}
                        <button onClick={onConfirm} className={getButtonColors(true)}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;