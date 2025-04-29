import { useAuth } from "@/hooks/useAuth";
import slElectionsLogo from "@/assets/sl-elections-logo.svg";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={slElectionsLogo} alt="Election Commission Logo" className="h-12" />
            <div className="ml-4">
              <h1 className="text-lg sm:text-xl font-bold text-primary">Pre-Election Survey</h1>
              <p className="text-sm text-gray-600">2025 Pradeshiya Sabha Election</p>
            </div>
          </div>
          <div className="hidden md:flex items-center text-sm">
            {isAuthenticated ? (
              <div className="flex items-center">
                {user?.photoURL && (
                  <img 
                    className="h-8 w-8 rounded-full mr-2" 
                    src={user.photoURL} 
                    alt={user.displayName || "User profile"} 
                  />
                )}
                <span className="text-gray-800 font-medium">
                  {user?.displayName || "Signed In User"}
                </span>
                <button 
                  onClick={logout}
                  className="ml-4 text-sm text-red-600 hover:text-red-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <span className="text-gray-600">Not signed in</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
