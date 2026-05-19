// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Package, FileText, MessageSquare, ShoppingCart, LogOut, Loader2, Instagram } from "lucide-react";
// import { Logo } from "@/components/logo/Logo";


// const navItems = [
//   {
//     label: "Products",
//     href: "/products",
//     icon: Package,
//   },
//   {
//     label: "Blogs",
//     href: "/blogs",
//     icon: FileText,
//   },
//   {
//     label: "Testimonials",
//     href: "/testimonials",
//     icon: MessageSquare,
//   },
//   {
//     label: "Reels",
//     href: "/reels",
//     icon: Instagram,
//   },
//   {
//     label: "Orders",
//     href: "/orders",
//     icon: ShoppingCart,
//   },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check authentication
//     const token = localStorage.getItem("adminToken");
//     const user = localStorage.getItem("adminUser");

//     if (!token || !user) {
//       router.push("/login");
//     } else {
//       setIsAuthenticated(true);
//     }
//     setIsLoading(false);
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminUser");
//     router.push("/login");
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
//         <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
//           <div className="flex items-center flex-shrink-0 px-6 py-5 border-b border-gray-200 gap-3">
//             <Logo iconOnly className="h-10 w-10" />
//             <h1 className="text-lg font-bold text-gray-900 tracking-tight">VCJ Admin</h1>
//           </div>
//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={cn("flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")}>
//                   <Icon className="mr-3 h-5 w-5" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>
//           {/* Logout Button */}
//           <div className="px-4 py-4 border-t border-gray-200">
//             <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
//               <LogOut className="mr-3 h-5 w-5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       <div className="md:pl-64 flex flex-col min-h-screen">
//         <main className="flex-1 pb-20 md:pb-0">
//           <div className="p-4 md:p-8">{children}</div>
//         </main>

//         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
//           <div className="grid grid-cols-5 h-16">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={cn("flex flex-col items-center justify-center text-xs font-medium transition-colors", isActive ? "text-blue-700 bg-blue-50" : "text-gray-600 hover:bg-gray-50")}>
//                   <Icon className="h-5 w-5 mb-1" />
//                   {item.label}
//                 </Link>
//               );
//             })}
//             {/* Mobile Logout */}
//             <button onClick={handleLogout} className="flex flex-col items-center justify-center text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
//               <LogOut className="h-5 w-5 mb-1" />
//               Logout
//             </button>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Package,
  FileText,
  MessageSquare,
  ShoppingCart,
  LogOut,
  Loader2,
  Instagram,
  Coins,
} from "lucide-react";

import { Logo } from "@/components/logo/Logo";

const navItems = [
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: FileText,
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    icon: MessageSquare,
  },
  {
    label: "Reels",
    href: "/reels",
    icon: Instagram,
  },

  // ✅ NEW GOLD RATE ROUTE
  {
    label: "Gold Rate",
    href: "/gold-rate",
    icon: Coins,
  },

  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-3 border-b border-gray-200 px-6 py-5">
            <Logo iconOnly className="h-10 w-10" />

            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              VCJ Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />

                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-200 px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />

              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Layout */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <main className="flex-1 pb-20 md:pb-0">
          <div className="p-4 md:p-8">{children}</div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
          <div className="grid grid-cols-6 h-16">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center text-xs font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="mb-1 h-5 w-5" />

                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="mb-1 h-5 w-5" />

              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}