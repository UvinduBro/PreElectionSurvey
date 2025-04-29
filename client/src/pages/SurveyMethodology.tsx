import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SurveyMethodology() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Survey Methodology</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Overview</h2>
            <p className="text-gray-700">
              This pre-election survey aims to gauge public opinion ahead of the 2025 Pradeshiya Sabha Elections 
              in Sri Lanka. The survey employs a transparent methodology to collect and analyze voter preferences.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Survey Design</h2>
            <p className="text-gray-700">
              Our survey follows a structured approach to collect data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Authentication: Google Sign-In is used to verify unique participants</li>
              <li>Personal Information: Basic details to establish demographic information</li>
              <li>Geographic Data: District and local government information to analyze regional trends</li>
              <li>Political Preference: Selection of preferred political party from the major parties contesting the election</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Sampling Method</h2>
            <p className="text-gray-700 mb-3">
              This survey uses a self-selected sampling methodology, where participants voluntarily opt to respond. 
              Key characteristics include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Open participation: Any eligible voter can participate</li>
              <li>Verification: National ID Card (NIC) number is used to prevent duplicate submissions</li>
              <li>Authentication: Google account verification helps ensure each person responds only once</li>
            </ul>
            <p className="text-gray-700 mt-3">
              <strong>Note:</strong> Self-selected sampling means that results may not be statistically representative 
              of the entire voting population, as participants choose to take part rather than being randomly selected.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Analysis</h2>
            <p className="text-gray-700 mb-3">
              The survey results are analyzed in the following ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Vote counting: Each verified vote is counted once</li>
              <li>Percentage calculation: The proportion of votes for each party is calculated</li>
              <li>Regional analysis: Results are filtered by district and local government area</li>
              <li>Real-time updates: Results are displayed immediately as votes are cast</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitations</h2>
            <p className="text-gray-700 mb-3">
              We acknowledge the following limitations of our methodology:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Self-selection bias: Participants who choose to respond may not represent the general population</li>
              <li>Digital divide: The survey requires internet access and a Google account, potentially excluding some voter segments</li>
              <li>Timing effects: Opinions captured may change closer to the actual election date</li>
              <li>Regional representation: Participation rates may vary by region, potentially over or under-representing certain areas</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Transparency</h2>
            <p className="text-gray-700">
              We are committed to transparency in our survey process. While protecting individual privacy, 
              we make the following information available:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Aggregate results showing party preferences</li>
              <li>Regional distribution of responses</li>
              <li>Total number of participants</li>
              <li>Updates to methodology or analysis approaches</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
            <p className="text-gray-700">
              For questions about our survey methodology or to provide feedback, please contact us at:
              <br />
              <a href="mailto:methodology@electionsurvey.example.com" className="text-primary hover:underline">methodology@electionsurvey.example.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
