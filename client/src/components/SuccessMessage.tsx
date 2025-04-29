import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessMessage({ isOpen, onClose }: SuccessMessageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your vote has been successfully recorded. Thank you for participating in our pre-election survey.
          </p>
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Return to Survey Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
