// Profile.tsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { candidateGetProfileApi } from "../../api/axios/profile/candidate";

const EditProfile: React.FC = () => {
  const candidateData = useSelector(
    (state: RootState) => state.candidateData.candidate
  );

  const [candidateProfileData, setCandidateProfileData] = useState<any>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const { id } = candidateData;
      const candidateProfile = await candidateGetProfileApi(id);
      setCandidateProfileData(candidateProfile);
    })();
  }, [candidateData]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Implement logic to save the edited data to the backend
    setEditMode(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen md:w-9/12 p-8 mt-16">
      <div className="w-md mx-auto bg-white p-8 rounded shadow-md">
        <div className="hero h-56 bg-base-200 relative">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="w-1/6 max-w-sm rounded-lg shadow-2xl"
              alt="Profile"
            />
            <div className="flex flex-col items-start lg:items-end">
              <h1 className="text-5xl font-bold">
                I'm {(candidateProfileData?.data?.data?.name) ?? candidateData.name}
              </h1>
              <p className="py-6">
                {candidateProfileData?.data?.data?.about}
              </p>
              <div className="flex justify-end">
                {!editMode ? (
                  <button className="btn btn-primary" onClick={handleEditClick}>
                    Edit
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleSaveClick}>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile information */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Profile Information</h2>
          {/* Name */}
          <div className="flex flex-col w-full border-opacity-50 mt-3">
            <div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
              <div className="text-left">
                Name: {editMode ? (
                  <input
                    type="text"
                    value={candidateProfileData?.data?.data?.name ?? candidateData.name}
                    onChange={(e) => setCandidateProfileData({ ...candidateProfileData, data: { ...candidateProfileData.data, data: { ...candidateProfileData.data.data, name: e.target.value } } })}
                  />
                ) : (
                  (candidateProfileData?.data?.data?.name) ?? candidateData.name
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-full border-opacity-50 mt-3">
            <div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
              <div className="text-left">
                Email: {editMode ? (
                  <input
                    type="text"
                    value={candidateProfileData?.data?.data?.email ?? candidateData.email}
                    onChange={(e) => setCandidateProfileData({ ...candidateProfileData, data: { ...candidateProfileData.data, data: { ...candidateProfileData.data.data, email: e.target.value } } })}
                  />
                ) : (
                  (candidateProfileData?.data?.data?.email) ?? candidateData.email
                )}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col w-full border-opacity-50 mt-3">
            <div className="grid h-12 pl-5 card bg-base-300 rounded-box items-center">
              <div className="text-left">
                Phone: {editMode ? (
                  <input
                    type="text"
                    value={candidateProfileData?.data?.data?.phone ?? candidateData.phone}
                    onChange={(e) => setCandidateProfileData({ ...candidateProfileData, data: { ...candidateProfileData.data, data: { ...candidateProfileData.data.data, phone: e.target.value } } })}
                  />
                ) : (
                  (candidateProfileData?.data?.data?.phone) ?? candidateData.phone
                )}
              </div>
            </div>
          </div>

          {/* Add more fields as needed */}
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <ul className="list-disc pl-4">
            {/* Add more skills based on your data */}
            {candidateProfileData?.data?.data?.keySkills && (
              candidateProfileData.data.data.keySkills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
