"use client";
import { AppSidebar } from "../../design-system/src/components/template/item_list/sidebar";
import { SiteHeader } from "../../design-system/src/components/template/item_list/side-header";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "../../design-system/src/components/organisms/SideBar";
import Topbar from "../../design-system/src/components/template/item_list/top-navbar";
import { DataTable } from "../../design-system/src/components/template/item_list/table";
import defaultData from "./data.json";

const DESKTOP_SIDEBAR_WIDTH = 136; // 16rem
const DESKTOP_SIDEBAR_COLLAPSED = 8; // 3rem
const MOBILE_SIDEBAR_WIDTH = 288; // 18rem

type PageProps = {
  data?: typeof defaultData;
};

export default function Page({ data = defaultData }: PageProps) {
  return (
    <div className="[--header-height:theme(spacing.16)] [--toolbar-height:theme(spacing.16)] w-full">
      <SidebarProvider className="flex flex-col min-h-screen w-full">
        <SiteHeader />
        <Topbar />
        <MainLayout data={data} />
      </SidebarProvider>
    </div>
  );
}

function MainLayout({ data }: { data: typeof defaultData }) {
  const { open, openMobile, isMobile } = useSidebar();
  const sidebarOpen = isMobile ? openMobile : open;

  const sidebarWidth = isMobile
    ? MOBILE_SIDEBAR_WIDTH
    : sidebarOpen
    ? DESKTOP_SIDEBAR_WIDTH
    : DESKTOP_SIDEBAR_COLLAPSED;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar wrapper */}
      <div
        className="relative md:flex-shrink-0 transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <AppSidebar className="md:relative md:top-auto md:left-auto !border-0" />
      </div>

      {/* Main content */}
      <SidebarInset
        className="flex-1 transition-all duration-150"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        <div className="flex flex-1 flex-col overflow-auto p-4 w-full text-base">
          <DataTable data={data} />
        </div>
      </SidebarInset>
    </div>
  );
}
