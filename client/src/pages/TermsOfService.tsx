import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h2>
            <p className="text-gray-700">
              Welcome to the Pre-Election Survey for the 2025 Pradeshiya Sabha Elections. By accessing or using 
              our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Survey Participation</h2>
            <p className="text-gray-700">
              This survey is designed to gather opinions about political preferences ahead of the 2025 Pradeshiya Sabha 
              Elections. Participation is voluntary, and you must be at least 18 years old and eligible to vote in 
              Sri Lanka to participate.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Accuracy of Information</h2>
            <p className="text-gray-700">
              You agree to provide accurate and current information when participating in our survey. Each person may 
              submit only one response. Using false information or attempting to submit multiple responses is prohibited.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Unauthorized Use</h2>
            <p className="text-gray-700">
              The following activities are prohibited when using our service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Submitting false or misleading information</li>
              <li>Attempting to manipulate survey results</li>
              <li>Using automated systems to access or interact with the survey</li>
              <li>Interfering with the proper functioning of the website</li>
              <li>Attempting to access data not intended for you</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
            <p className="text-gray-700">
              All content, features, and functionality on this website, including text, graphics, logos, and images, 
              are owned by us or our licensors and are protected by copyright, trademark, and other intellectual 
              property laws. You may not reproduce, distribute, modify, or create derivative works without our express permission.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer</h2>
            <p className="text-gray-700">
              This survey is not affiliated with, endorsed by, or connected to the Election Commission of Sri Lanka 
              or any political party. The results are based on voluntary participation and do not claim to be 
              statistically representative of the entire voting population.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
            <p className="text-gray-700">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting 
              from your access to or use of, or inability to access or use, the website or any content on it. 
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
            <p className="text-gray-700">
              We may revise these Terms of Service from time to time. The most current version will always be posted on this page. 
              Your continued use of the website after any changes indicates your acceptance of the revised terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its 
              conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:terms@electionsurvey.example.com" className="text-primary hover:underline">terms@electionsurvey.example.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
