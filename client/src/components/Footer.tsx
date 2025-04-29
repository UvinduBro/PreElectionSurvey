import { Link } from "wouter";
import slElectionsLogo from "@/assets/sl-elections-logo.svg";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <img 
              src={slElectionsLogo} 
              alt="Election Commission Logo" 
              className="h-12 mb-4" 
            />
            <p className="text-sm text-gray-600 max-w-md">
              This is an unofficial pre-election survey to gauge public opinion ahead of the 2025 Pradeshiya Sabha Elections in Sri Lanka.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/survey-methodology" className="text-sm text-gray-600 hover:text-primary">Survey Methodology</Link></li>
                <li><Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://elections.gov.lk" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-primary">Election Information</a></li>
                <li><a href="https://www.gov.lk/sri-lanka/government" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-primary">Local Government</a></li>
                <li><a href="https://elections.gov.lk" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-primary">Election Commission</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:contact@electionsurvey.example.com" className="text-sm text-gray-600 hover:text-primary">Email Us</a></li>
                <li><a href="mailto:help@electionsurvey.example.com" className="text-sm text-gray-600 hover:text-primary">Help Center</a></li>
                <li><a href="mailto:feedback@electionsurvey.example.com" className="text-sm text-gray-600 hover:text-primary">Feedback</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2024 Pre-Election Survey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
