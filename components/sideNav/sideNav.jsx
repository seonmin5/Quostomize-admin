
import { auth } from "../../auth"
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react"
import  Menus from "./menus";
import LogoutButton from "../../components/button/logoutButton";

const SideNav = async () => {
  const session = await auth();
  if (!session) {
    try {
      await fetch("api/auth/logout", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          cache:"no-store",
          credentials: "include"
        });
      await signOut({redirect:false});
      redirect("/");
    } catch {
      console.error("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.")
    }
  }

  return (
      <div className="w-60 min-h-[2200px] bg-[#2C2C2C]">
          <div className="p-4 pt-8 border-b border-[#000000] text-white">
              <div className="flex items-center mb-6">
                  <div className="text-[20px] font-bold flex items-center">
                      <img src="/icons/woori_ci.png" className="w-10 pr-1" /> WON 커스터마이징
                  </div>
              </div>
              <div className="text-gray-300 text-sm">{session.memberName}</div>
              <div
                className="text-gray-300 text-sm flex justify-between"
              >
                {session.memberLoginId}
                <LogoutButton />
              </div>
          </div>
          <Menus />
      </div>
  );
}

export default SideNav;