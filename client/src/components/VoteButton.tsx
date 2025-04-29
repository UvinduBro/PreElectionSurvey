import { Button } from "@/components/ui/button";

interface VoteButtonProps {
  onClick: () => void;
}

export function VoteButton({ onClick }: VoteButtonProps) {
  return (
    <section className="text-center mb-12">
      <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Make Your Voice Heard</h3>
        <p className="mb-6 max-w-3xl mx-auto">
          Your opinion matters in shaping the future of local governance. Participate in our pre-election survey to help gauge public sentiment ahead of the 2025 Pradeshiya Sabha Elections.
        </p>
        <Button 
          onClick={onClick}
          className="bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          size="lg"
        >
          Vote Now
        </Button>
      </div>
    </section>
  );
}
