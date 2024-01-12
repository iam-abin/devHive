import React, { useState, ChangeEvent } from 'react';

interface FileUploadUploadProps {
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log("in file upload event.target.files ",files  );
    

    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform the upload action here
      console.log("in handleUpload selectedFile", selectedFile);
      
      onUpload(selectedFile);
    }
  };

  return (
    <div className="bg-gray-100 p-6 my-6 rounded-lg shadow-md">
      <label className="block mb-4 text-lg font-semibold">Upload Your Resume</label>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          name='file'
        // accept=".pdf, .doc, .docx"
          accept=".jpg , .jgeg, .png"
          className="border-2 border-gray-300 p-2 w-64"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2  rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Upload
        </button>
      </div>
      {selectedFile && <p className="mt-4">Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
