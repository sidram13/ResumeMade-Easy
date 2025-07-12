import React, { useState } from 'react';
import { Sparkles, Download, Globe, AlertCircle, CheckCircle, TrendingUp, FileText } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { geminiService } from '../services/geminiService';
import { enhancedPdfService } from '../services/enhancedPdfService';
import { portfolioService } from '../services/portfolioService';
import { ATSScoreCard } from './ATSScoreCard';

export const ReviewForm: React.FC = () => {
  const { 
    resumeData, 
    aiEnhancedContent, 
    setAiEnhancedContent, 
    isGenerating, 
    setIsGenerating 
  } = useResume();
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [enhancementStep, setEnhancementStep] = useState<'idle' | 'analyzing' | 'enhancing' | 'complete'>('idle');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState(false);

  const handleEnhanceResume = async () => {
    setIsGenerating(true);
    setEnhancementStep('analyzing');
    
    try {
      // Step 1: Analyze and enhance
      setEnhancementStep('enhancing');
      const enhanced = await geminiService.enhanceResume(resumeData);
      setAiEnhancedContent(enhanced);
      
      // Step 2: Get improvement suggestions
      const improvementSuggestions = await geminiService.generateImprovementSuggestions(resumeData);
      setSuggestions(improvementSuggestions);
      
      setEnhancementStep('complete');
    } catch (error) {
      console.error('Error enhancing resume:', error);
      alert('Failed to enhance resume. Please check your Gemini API key and try again.');
      setEnhancementStep('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await enhancedPdfService.generatePDF(resumeData, aiEnhancedContent, 'ashish-template');
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

  const getEnhancementStatusContent = () => {
    switch (enhancementStep) {
      case 'analyzing':
        return {
          icon: <Sparkles className="w-8 h-8 text-blue-600 animate-spin" />,
          title: 'Analyzing Your Resume...',
          description: 'AI is reviewing your content and identifying improvement opportunities.',
          progress: 25
        };
      case 'enhancing':
        return {
          icon: <TrendingUp className="w-8 h-8 text-purple-600 animate-pulse" />,
          title: 'Enhancing Content...',
          description: 'Creating industry-standard descriptions with quantified achievements.',
          progress: 75
        };
      case 'complete':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-600" />,
          title: 'Enhancement Complete!',
          description: 'Your resume has been optimized with professional content and keywords.',
          progress: 100
        };
      default:
        return null;
    }
  };

  const statusContent = getEnhancementStatusContent();

  return (
    <div className="space-y-8">
      {/* Single Tab Header */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
            <Sparkles className="w-6 h-6 mr-3" />
            AI Enhancement & Download
          </div>
        </div>
      </div>

      {/* AI Enhancement Section */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Enhancement
          </h2>
        </div>
        
        {statusContent ? (
          <div className="text-center py-8">
            <div className="mb-4">{statusContent.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{statusContent.title}</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">{statusContent.description}</p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${statusContent.progress}%` }}
              ></div>
            </div>
            
            {enhancementStep === 'complete' && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="px-6 py-2 backdrop-blur-sm bg-white/30 border border-white/40 text-gray-700 rounded-lg hover:bg-white/40 transition-colors"
                >
                  {showBeforeAfter ? 'Hide' : 'Show'} Before/After
                </button>
                
                <button
                  onClick={handleEnhanceResume}
                  disabled={isGenerating}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
                >
                  Re-enhance
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Transform your resume with AI-powered enhancements. Get industry-standard descriptions, 
                quantified achievements, and ATS-optimized keywords using Ashish's professional template format.
              </p>
            </div>
            
            {!aiEnhancedContent ? (
              <button
                onClick={handleEnhanceResume}
                disabled={isGenerating}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                Enhance with AI
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <span className="font-semibold text-lg">Resume Enhanced Successfully!</span>
                </div>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className="px-6 py-3 backdrop-blur-sm bg-white/30 border border-white/40 text-gray-700 rounded-lg hover:bg-white/40 transition-colors"
                  >
                    {showBeforeAfter ? 'Hide' : 'Show'} Before/After
                  </button>
                  
                  <button
                    onClick={handleEnhanceResume}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
                  >
                    Re-enhance
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="backdrop-blur-sm bg-blue-50/50 border border-blue-200/50 rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Professional Descriptions</h4>
                <p className="text-blue-800 text-sm">Transform basic descriptions into compelling, achievement-focused content</p>
              </div>
              <div className="backdrop-blur-sm bg-purple-50/50 border border-purple-200/50 rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-900 mb-2">Ashish Template Format</h4>
                <p className="text-purple-800 text-sm">Uses proven professional template structure and formatting</p>
              </div>
              <div className="backdrop-blur-sm bg-green-50/50 border border-green-200/50 rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-2">ATS Optimization</h4>
                <p className="text-green-800 text-sm">Include industry keywords to pass applicant tracking systems</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Download Your Resume
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your resume is ready! Download it as a professional PDF using Ashish's template or get a complete portfolio website.
          </p>
        </div>

        {/* Template Preview */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ashish Professional Template
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Clean, professional layout based on Ashish Pratap Singh's proven resume format with modern styling and ATS optimization
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Professional Industry Standard</span>
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
                  <li>• Ashish's proven template format</li>
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
      </div>

      {/* ATS Score Card */}
      <ATSScoreCard />

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Improvement Suggestions</h2>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start p-4 backdrop-blur-sm bg-orange-50/50 border border-orange-200/50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-orange-800 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before/After Comparison */}
      {showBeforeAfter && aiEnhancedContent && (
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Before vs After Comparison</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                Before (Original)
              </h3>
              <div className="space-y-4">
                {resumeData.careerObjective && (
                  <div className="p-4 backdrop-blur-sm bg-red-50/50 border border-red-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Career Objective</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{resumeData.careerObjective}</p>
                  </div>
                )}
                
                {resumeData.experience.length > 0 && (
                  <div className="p-4 backdrop-blur-sm bg-red-50/50 border border-red-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Experience Sample</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{resumeData.experience[0]?.description}</p>
                  </div>
                )}

                {resumeData.projects.length > 0 && (
                  <div className="p-4 backdrop-blur-sm bg-red-50/50 border border-red-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Project Sample</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{resumeData.projects[0]?.description}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                After (AI Enhanced with Ashish Template)
              </h3>
              <div className="space-y-4">
                {aiEnhancedContent.careerSummary && (
                  <div className="p-4 backdrop-blur-sm bg-green-50/50 border border-green-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Professional Summary</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{aiEnhancedContent.careerSummary}</p>
                  </div>
                )}
                
                {aiEnhancedContent.professionalExperience.length > 0 && (
                  <div className="p-4 backdrop-blur-sm bg-green-50/50 border border-green-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Experience Enhanced</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{aiEnhancedContent.professionalExperience[0]?.description}</p>
                  </div>
                )}

                {aiEnhancedContent.optimizedProjects.length > 0 && (
                  <div className="p-4 backdrop-blur-sm bg-green-50/50 border border-green-200/50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Project Enhanced</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{aiEnhancedContent.optimizedProjects[0]?.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 backdrop-blur-sm bg-blue-50/50 border border-blue-200/50 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3">✨ Enhancement Highlights:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>• Applied Ashish's professional template structure</div>
              <div>• Added quantified achievements and metrics</div>
              <div>• Improved action verbs and professional language</div>
              <div>• Enhanced technical descriptions and impact statements</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};