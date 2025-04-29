import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, error } = useAuth();

  const handleGoogleSignIn = async () => {
    await login();
    if (!error) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Sign in to continue</DialogTitle>
          <DialogDescription className="text-gray-600">
            Please sign in with your Google account to participate in the election survey
          </DialogDescription>
        </DialogHeader>

        <div className="text-center mb-6">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center px-4 py-6 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 font-medium"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google Logo" 
              className="h-6 w-6 mr-2"
            />
            Continue with Google
          </Button>
          
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error.message}
            </p>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 text-center">
          <p>
            By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
