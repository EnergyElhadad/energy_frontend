import { useSession } from "next-auth/react";
import { Dropdown } from "@/shared/components/ui/Dropdown";
import { UserIcon } from "@/shared/components/icons/User";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BagIcon } from "@/shared/components/icons/Bag";
import { LogoutIcon } from "@/shared/components/icons/Logout";
import { ArrowDownIcon } from "@/shared/components/icons/ArrowDown";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export const UserMenu = () => {
  const { data: session } = useSession();
  const t = useTranslations("Auth");
  const { logout, isLoading } = useLogout();

  const userName = session?.user?.first_name || "User";

  const links = [
    {
      href: "/profile",
      icon: <UserIcon className="text-primary" />,
      label: t("profile"),
    },
    {
      href: "/orders",
      icon: <BagIcon className="text-primary" />,
      label: t("orders"),
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="group border-Stroke flex h-[42px] min-w-[127px] cursor-pointer items-center gap-[8px] rounded-full border px-[12px] py-[8px] transition-all duration-300 ease-in-out">
          <UserIcon className="text-primary group-aria-expanded:text-white" />
          <span className="text-WetGray text-[12px] font-semibold group-aria-expanded:text-white">
            {userName}
          </span>

          <ArrowDownIcon className="text-WetGray ms-auto group-aria-expanded:text-white" />
        </button>
      }
      triggerMode="click"
      menuClassName="!max-w-[220px] !p-0 overflow-hidden"
      activeClassName="!bg-primary"
    >
      <div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary flex items-center gap-[8px] px-[16px] py-[20px] transition-colors hover:bg-gray-50"
          >
            {link.icon}
            <span className="text-[14px] font-semibold">{link.label}</span>
          </Link>
        ))}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex w-full items-center gap-[8px] bg-white px-[16px] py-[20px] transition-colors hover:bg-red-100 hover:*:text-red-500">
              <LogoutIcon className="text-primary" />
              <span className="text-[14px] font-semibold">
                {t("logout_button") || "Logout"}
              </span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>{t("logout_confirm_title")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("logout_confirm_desc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    return;
                  }
                  logout();
                }}
                disabled={isLoading}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading && <Spinner className="text-white" />}
                {t("confirm")}
              </AlertDialogAction>
              <AlertDialogCancel disabled={isLoading}>
                {t("cancel")}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Dropdown>
  );
};
