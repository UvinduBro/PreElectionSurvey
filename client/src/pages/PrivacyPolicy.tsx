import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h2>
            <p className="text-gray-700">
              Welcome to the Pre-Election Survey for the 2025 Pradeshiya Sabha Elections. 
              We are committed to protecting your privacy and handling your data with transparency and care.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Collection</h2>
            <p className="text-gray-700 mb-3">
              We collect the following personal information when you participate in our survey:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>National Identity Card Number (NIC)</li>
              <li>District and Local Government area</li>
              <li>Political party preference</li>
              <li>Google account information (when signing in)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Data</h2>
            <p className="text-gray-700 mb-3">
              The information you provide is used solely for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Conducting pre-election surveys and research</li>
              <li>Generating anonymous statistical data</li>
              <li>Preventing duplicate voting in our survey system</li>
              <li>Improving our survey methodology and user experience</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Protection</h2>
            <p className="text-gray-700 mb-3">
              We take data protection seriously. Here's how we safeguard your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>All data is stored securely with appropriate technical and organizational measures</li>
              <li>Access to personal data is strictly limited to authorized personnel</li>
              <li>We implement industry-standard security practices to protect against unauthorized access</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Sharing</h2>
            <p className="text-gray-700">
              <strong>We do not sell, trade, or otherwise transfer your personal information to third parties.</strong> 
              The data collected is for internal use only and will not be shared with political parties, 
              candidates, or commercial entities. We may share anonymous, aggregated statistical data 
              that does not identify any individual person.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information only for as long as necessary to fulfill the purposes 
              outlined in this privacy policy. After the 2025 Pradeshiya Sabha Elections conclusion, 
              personal identifiers will be anonymized while preserving statistical data for research purposes.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
            <p className="text-gray-700 mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw your consent at any time</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise any of these rights, please contact us using the details provided in the Contact section.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              <a href="mailto:privacy@electionsurvey.example.com" className="text-primary hover:underline">privacy@electionsurvey.example.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
