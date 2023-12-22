// src/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer/reducer';
import { recruiterGetProfileApi } from '../../axios/api/profile/recruiter';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
const recruiterData = useSelector(
		(state: RootState) => state.recruiterData.recruiter
	);

	const [recruiterProfileData, setRecruiterProfileData] = useState<any>([]);
	// const [updateCandidateProfileData, setUpdateCandidateProfileData] = useState<
	// 	any
	// >([]);

	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			console.log("before",recruiterData);
			
			const { id } = recruiterData;
			const candidateProfile = await recruiterGetProfileApi(id);
			console.log("candidateGetProfileApi", candidateProfile);
			
			setRecruiterProfileData(candidateProfile);
		})();
	}, []);
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-8 shadow-md rounded-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt="Recruiter Avatar"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{(recruiterProfileData?.data?.data?.name)?? recruiterData.name}</h1>
                <p className="text-gray-600">Recruiter at ABC Company</p>
              </div>
            </div>
            <button onClick={()=> navigate("/recruiter/edit-profile")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Edit
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About Me</h2>
            <p className="text-gray-600">
              I am a seasoned recruiter with expertise in technical hiring and talent acquisition.
            </p>
          </div>

		  <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">
			{(recruiterProfileData?.data?.data?.email)?? recruiterData.email}
            </p>
          </div>

		  <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Phone</h2>
            <p className="text-gray-600">
			{(recruiterProfileData?.data?.data?.phone)?? recruiterData.phone}
            </p>
          </div>

		  <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
            <p className="text-gray-600">
			{recruiterProfileData?.data?.data?.about ??
									"Not specified"}
            </p>
          </div>




          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Job Postings</h2>
            <ul>
              <li className="mb-4">
                <h3 className="text-blue-500 font-semibold">Software Engineer</h3>
                <p className="text-gray-600">ABC Company - Full-time - Remote</p>
              </li>
              {/* Add more job postings */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;