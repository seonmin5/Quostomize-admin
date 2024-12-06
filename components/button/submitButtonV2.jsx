import React from 'react';

const SubmitButtonV2 = ({ onClick, disabled, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={'w-24 p-2 text-white font-bold rounded-md bg-[#3081F7] hover:bg-[#0B5CD8]'}
        >
            {children}
        </button>
    );
};

export default SubmitButtonV2;
