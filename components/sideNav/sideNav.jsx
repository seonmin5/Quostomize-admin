import Link from "next/link";
import NavMenuItem from "./navMenuItem";

const SideNav = async () => {
  return (
    <div className="w-full h-full sticky top-0 left-0 bg-gray-800 text-white">
      <div className="px-4 pt-9 pb-4 h-48 border-white border-2">
        <div className="mb-4">로고</div>
        <div>현재 로그인한 사용자 이름</div>
        <div>현재 로그인한 사용자 아이디</div>
      </div>
      <ul className="pt-4 space-y-4">
        <NavMenuItem menuName={"카드 정보 관리"} menuHref={"card-details"} />
        <NavMenuItem menuName={"카드 신청 관리"} menuHref={"card-applicants"} />
        <NavMenuItem menuName={"회원 관리"} menuHref={"members"} />
        <NavMenuItem menuName={"가맹점 관리"} menuHref={"franchises"} />
        <NavMenuItem menuName={"알림 보내기"} menuHref={"notifications"} />
        <li>
          <Link href="#" className="flex items-center space-x-3 text-xl rounded-md bg-transparent px-3 py-2 hover:bg-gray-600 hover:font-semibold " target="_blank">
            <span>모니터링</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;