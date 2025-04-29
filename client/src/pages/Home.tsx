import { useState } from "react";
import { Header } from "@/components/Header";
import { IntroSection } from "@/components/IntroSection";
import { ResultsSection } from "@/components/ResultsSection";
import { VoteButton } from "@/components/VoteButton";
import { LoginModal } from "@/components/LoginModal";
import { VotingForm } from "@/components/VotingForm";
import { SuccessMessage } from "@/components/SuccessMessage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showVotingForm, setShowVotingForm] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVoteButtonClick = () => {
    if (isAuthenticated) {
      setShowVotingForm(true);
      setTimeout(() => {
        // Scroll to the form
        const formElement = document.getElementById("voting-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    if (isAuthenticated) {
      setShowVotingForm(true);
    }
  };

  const handleVoteSuccess = () => {
    setShowVotingForm(false);
    setIsSuccessModalOpen(true);
  };

  const handleVoteError = (message: string) => {
    setErrorMessage(message);
    setIsErrorModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleErrorModalClose = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IntroSection />
        <ResultsSection />
        <VoteButton onClick={handleVoteButtonClick} />
        
        {showVotingForm && (
          <div id="voting-form">
            <VotingForm 
              onSubmitSuccess={handleVoteSuccess} 
              onError={handleVoteError} 
            />
          </div>
        )}
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={handleLoginModalClose} 
        />
        
        <SuccessMessage 
          isOpen={isSuccessModalOpen} 
          onClose={handleSuccessModalClose} 
        />
        
        <ErrorMessage 
          isOpen={isErrorModalOpen} 
          onClose={handleErrorModalClose} 
          message={errorMessage}
        />
      </main>
      
      <Footer />
    </div>
  );
}
