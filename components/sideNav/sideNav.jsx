
import { auth } from "../../auth"
import { redirect } from "next/navigation";

import  Menus from "./menus";

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
    } catch {

    } finally {
      redirect("/");
    }
  }

  return (
      <div className="w-60 min-h-[2200px] bg-[#2C2C2C]">
          <div className="p-8 border-b border-[#000000] text-white">
              <div className="flex items-center mb-6">
                  <div className="text-xl font-bold flex items-center">
                      WON 커스터마이징
                  </div>
              </div>
              <div className="text-gray-300 text-sm">{session.memberName}</div>
              <div
                className="text-gray-300 text-sm flex justify-between"
              >
                {session.memberLoginId}
                <div className="underline cursor-pointer text-xs">
                  로그아웃
                </div>
              </div>
          </div>
          <Menus />
      </div>
  );
}

export default SideNav;