
const ApprovalButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="py-2 px-4 transition text-white font-bold rounded-md bg-[#3081F7] hover:bg-[#0B5CD8]"
        >
            결재 요청
        </button>
    )
}
export default ApprovalButton;