import React from 'react';

interface ATSSuggestion {
  type: 'good' | 'improve';
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: ATSSuggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const getGradient = () => {
    if (score > 69) return 'from-green-100';
    if (score > 49) return 'from-yellow-100';
    return 'from-red-100';
  };

  const getIcon = () => {
    if (score > 69) return '/icons/ats-good.svg';
    if (score > 49) return '/icons/ats-warning.svg';
    return '/icons/ats-bad.svg';
  };

  return (
    <div className={`rounded-2xl p-6 bg-gradient-to-br ${getGradient()} to-white shadow-sm border border-gray-100`}>
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-4">
        <img src={getIcon()} alt="ATS Status" className="w-8 h-8" />
        <h2 className="text-xl font-bold text-gray-900">ATS Score - {score}/100</h2>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Applicant Tracking System (ATS) Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">
            ATS software is used by employers to scan resumes for keywords and formatting. 
            A higher score means your resume is more likely to pass these automated filters.
          </p>
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <img 
                src={item.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'} 
                alt={item.type} 
                className="w-5 h-5 mt-0.5"
              />
              <p className="text-sm text-gray-700">{item.tip}</p>
            </div>
          ))}
        </div>

        <p className="italic text-gray-700">
          Keep refining your resume to ensure it stands out to both bots and recruiters!
        </p>
      </div>
    </div>
  );
};

export default ATS;