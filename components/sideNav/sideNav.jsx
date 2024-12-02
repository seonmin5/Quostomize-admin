import NavMenuItem from "./navMenuItem";

const SideNav = async () => {
  return (
      <div className="w-60 min-h-screen bg-[#2C2C2C]">
          <div className="p-8 border-b border-[#000000] text-white">
              <div className="flex items-center mb-6">
                  <div className="text-xl font-bold flex items-center">
                      WON 커스터마이징
                  </div>
              </div>
              <div className="text-gray-300 text-sm">로그인한 사용자 이름</div>
              <div className="text-gray-300 text-sm">로그인한 사용자 아이디</div>
          </div>
          <div className="">
              <h2 className="pt-8 pr-8 pl-8 pb-6 font-bold text-white text-lg">사이트 관리</h2>
              <ul className="space-y-1">
                  <NavMenuItem menuName={"알림 설정"} menuHref={"notifications"} iconSrc={"/icons/notification.png"}/>
                  <NavMenuItem menuName={"정보 조회"} menuHref={"information"} iconSrc={"/icons/information.png"}/>
                  <NavMenuItem menuName={"이용자 관리"} menuHref={"members"} iconSrc={"/icons/user.png"}/>
                  <NavMenuItem menuName={"카드 관리"} menuHref={"cards"} iconSrc={"/icons/card.png"}/>
                  <NavMenuItem menuName={"가맹점 관리"} menuHref={"franchises"} iconSrc={"/icons/franchise.png"}/>
                  <NavMenuItem menuName={"대시보드"} menuHref={"https://grafana.com/products/cloud/"}
                               iconSrc={"/icons/dashboard.png"}/>
                  <NavMenuItem menuName={"환경설정"} menuHref={"setting"} iconSrc={"/icons/setting.png"}/>
              </ul>
          </div>
      </div>
  );
}

export default SideNav;