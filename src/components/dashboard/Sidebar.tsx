import { LayoutDashboard, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      label: 'Analytics',
      path: '/',
      icon: LayoutDashboard,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "min-h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col border-r border-slate-700 transition-all duration-300 fixed lg:relative z-40",
          !isOpen && "hidden lg:flex"
        )}
      >
        {/* Logo Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
              <span className="text-blue-600 font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dataflow</h1>
              <p className="text-xs text-blue-100">Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-4">Menu</p>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform",
                  active ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className={cn(
                  "font-medium transition-all",
                  active ? "font-semibold" : ""
                )}>
                  {item.label}
                </span>
                {active && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Stats Section - Expanded */}
        <div className="px-4 py-6 bg-slate-700 bg-opacity-50 mx-4 rounded-xl mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Stats</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Active Users</span>
              <span className="text-sm font-bold text-green-400">2.5K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Response Time</span>
              <span className="text-sm font-bold text-blue-400">45ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Uptime</span>
              <span className="text-sm font-bold text-purple-400">99.9%</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-slate-700 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-4 py-3 text-center">
            <p className="text-xs font-semibold text-white">Premium Plan</p>
            <p className="text-xs text-blue-100 mt-2">Upgrade for more features</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;