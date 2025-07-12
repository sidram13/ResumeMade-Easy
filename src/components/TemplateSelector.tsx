import React from 'react';
import { FileText } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Template Selection
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Template selection has been moved to the AI Enhancement tab for a streamlined experience.
      </p>
    </div>
  );
};