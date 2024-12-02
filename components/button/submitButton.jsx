const Submitbutton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="w-full p-2 mt-4 font-bold bg-[#3081F7] text-white rounded-md hover:bg-[#0B5CD8]"
        >
            필터 적용
        </button>
    );
};

export default Submitbutton;