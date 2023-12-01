// Profile.tsx

import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Name</h1>
        <p className="text-gray-600 mb-4">Web Developer</p>

        {/* Add more profile information as needed */}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <ul className="list-disc pl-4">
            <li>React.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            {/* Add more skills */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
