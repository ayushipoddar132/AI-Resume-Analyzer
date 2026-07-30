import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from '../components/Accordion';
import { cn } from '~/lib/utils';

interface Tip {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
}

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let bgColor = 'bg-red-100';
  let textColor = 'text-red-600';
  let icon = null;

  if (score > 69) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-600';
    icon = (
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  } else if (score > 39) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-600';
  }

  return (
    <div
      className={cn(
        'flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium',
        bgColor,
        textColor
      )}
    >
      {icon}
      {score}/100
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-6">
      {/* Two-column grid of tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              {tip.type === 'good' ? (
                <img src="/icons/check.svg" alt="Good" className="w-5 h-5" />
              ) : (
                <img src="/icons/warning.svg" alt="Improve" className="w-5 h-5" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-800">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* List of explanation boxes */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg border',
              tip.type === 'good'
                ? 'bg-green-50 border-green-100'
                : 'bg-red-50 border-red-100'
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  'text-xs font-bold uppercase tracking-wider',
                  tip.type === 'good' ? 'text-green-700' : 'text-red-700'
                )}
              >
                {tip.type === 'good' ? 'Strength' : 'Improvement'}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  const categories = [
    {
      id: 'tone',
      title: 'Tone & Style',
      data: feedback.toneAndStyle,
    },
    {
      id: 'content',
      title: 'Content',
      data: feedback.content,
    },
    {
      id: 'structure',
      title: 'Structure',
      data: feedback.structure,
    },
    {
      id: 'skills',
      title: 'Skills',
      data: feedback.skills,
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Accordion allowMultiple className="space-y-0">
        {categories.map((category) => (
          <AccordionItem key={category.id} id={category.id} className="border-b last:border-b-0 border-gray-100">
            <AccordionHeader itemId={category.id} className="hover:bg-gray-50 py-4 px-6">
              <CategoryHeader
                title={category.title}
                categoryScore={category.data.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={category.id} className="bg-white px-6 pb-6">
              <CategoryContent tips={category.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;