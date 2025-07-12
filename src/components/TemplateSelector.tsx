import React, { useState } from 'react';
import { Download, Award, Globe } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { pdfService } from '../services/pdfService';
import { portfolioService } from '../services/portfolioService';

export const TemplateSelector: React.FC = () => {
  const { resumeData, aiEnhancedContent } = useResume();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await pdfService.generatePDF(resumeData, aiEnhancedContent, 'executive-pro');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPortfolio = () => {
    setIsGeneratingPortfolio(true);
    try {
      portfolioService.downloadPortfolio(resumeData, aiEnhancedContent);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      alert('Failed to generate portfolio. Please try again.');
    } finally {
      setIsGeneratingPortfolio(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Download Your Resume
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your resume is ready! Download it as a professional PDF or get a complete portfolio website.
        </p>
      </div>

      {/* Template Preview */}
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Executive Pro Template
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Professional layout perfect for senior positions with clean typography and elegant design
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Classic Professional Style</span>
            </div>
          </div>

          {/* Download Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Resume'}
            </button>
            
            <button
              onClick={handleDownloadPortfolio}
              disabled={isGeneratingPortfolio}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              {isGeneratingPortfolio ? 'Generating...' : 'Download Portfolio'}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📄 PDF Resume</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• Print-ready format</li>
                <li>• ATS-friendly design</li>
                <li>• Professional layout</li>
                <li>• Perfect for job applications</li>
              </ul>
            </div>
            
            <div className="bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 mb-2">🌐 Portfolio Website</h4>
              <ul className="text-green-800 space-y-1">
                <li>• Complete HTML website</li>
                <li>• Responsive design</li>
                <li>• SEO optimized</li>
                <li>• Ready to host online</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg border border-white/30 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Choose Executive Pro Template?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">ATS Optimized</h4>
            <p className="text-sm text-gray-600">Passes through 95%+ of applicant tracking systems</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Professional Design</h4>
            <p className="text-sm text-gray-600">Crafted by HR experts for maximum impact</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Dual Format</h4>
            <p className="text-sm text-gray-600">Get both PDF resume and portfolio website</p>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-amber-50/50 backdrop-blur-sm border border-amber-200/50 rounded-xl p-6">
        <h4 className="font-semibold text-amber-900 mb-3">💡 Usage Tips:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-800">
          <div>
            <strong>PDF Resume:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Use for job applications</li>
              <li>• Email to recruiters</li>
              <li>• Print for interviews</li>
            </ul>
          </div>
          <div>
            <strong>Portfolio Website:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Host on your domain</li>
              <li>• Share via LinkedIn</li>
              <li>• Include in email signatures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};