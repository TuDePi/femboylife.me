import { useState } from 'react';
import { jobs } from '../lib/jobs';

export default function OccupationModal({ onClose, onSchoolAction, onJobAction, education, stats, job }) {
  const [activeTab, setActiveTab] = useState('school'); // 'school' or 'job'

  const commonActions = [
    { name: "Study harder", icon: "✍️" },
    { name: "Skip class", icon: "땡" },
  ];

  const universityActions = [
    { name: "Apply to Law School", icon: "⚖️" },
    { name: "Apply to Medical School", icon: "⚕️" },
    { name: "Apply to Art School", icon: "🎨" },
    { name: "Apply to Business School", icon: "💼" },
  ];

  const schoolActions = education.level === 'Graduated' ? universityActions : commonActions;

  const availableJobs = jobs.filter(job => {
    const hasRequiredEducation = education.level === job.requiredEducation || job.requiredEducation === 'None';
    const hasRequiredSmarts = stats.smarts >= job.requiredSmarts;
    return hasRequiredEducation && hasRequiredSmarts;
  });

  const jobActions = [
    { name: "Work harder", icon: "💪" },
    { name: "Quit job", icon: "👋" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Occupation</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab('school')}
            className={`py-2 px-4 ${activeTab === 'school' ? 'border-b-2 border-trans-pink' : ''}`}
          >
            School
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={`py-2 px-4 ${activeTab === 'job' ? 'border-b-2 border-trans-pink' : ''}`}
          >
            Job
          </button>
        </div>
        <ul>
          {activeTab === 'school' && schoolActions.map((action) => (
            <li key={action.name} className="mb-2">
              <button
                onClick={() => onSchoolAction(action.name)}
                className="w-full flex items-center p-2 bg-trans-blue text-white rounded-lg hover:bg-trans-pink"
              >
                <span className="text-2xl mr-4">{action.icon}</span>
                <span>{action.name}</span>
              </button>
            </li>
          ))}
          {activeTab === 'job' && (
            job ? (
              <ul>
                {jobActions.map((action) => (
                  <li key={action.name} className="mb-2">
                    <button
                      onClick={() => onJobAction(action.name)}
                      className="w-full flex items-center p-2 bg-trans-blue text-white rounded-lg hover:bg-trans-pink"
                    >
                      <span className="text-2xl mr-4">{action.icon}</span>
                      <span>{action.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {availableJobs.map((job) => (
                  <li key={job.title} className="mb-2">
                    <button
                      onClick={() => onJobAction(job.title)}
                      className="w-full flex items-center p-2 bg-trans-blue text-white rounded-lg hover:bg-trans-pink"
                    >
                      <span className="text-2xl mr-4">🧑‍💼</span>
                      <span>{job.title} - ${job.salary}/yr</span>
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
        </ul>
      </div>
    </div>
  );
}