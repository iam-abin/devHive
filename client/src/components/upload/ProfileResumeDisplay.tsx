import React, { useState } from 'react';
import { FaFilePdf, FaPencilAlt, FaTrash } from 'react-icons/fa';

interface ResumeProps {
  resumeFile: any
  onEditResume: any
  onDeleteResume: any
}

const ProfileResumeDisplay: React.FC<ResumeProps> = ({ resumeFile, onEditResume, onDeleteResume }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="resume-component">
      <div className="resume-header">
        <label htmlFor="resume-file">Resume:</label>
        <div className="resume-file-container">
          {isEditing ? (
            <input type="file" id="resume-file" name="resume" />
          ) : (
            <span>{resumeFile}</span>
          )}
        </div>
      </div>
      <div className="resume-actions">
        <button onClick={() => setIsEditing(true)}>
          <FaPencilAlt />
        </button>
        <button onClick={onEditResume} disabled={!isEditing}>
          Save
        </button>
        <button onClick={onDeleteResume}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProfileResumeDisplay;