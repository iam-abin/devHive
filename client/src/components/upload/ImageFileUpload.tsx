// FileUploadComponent.jsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const ImageFileUpload: React.FC<{uploadImage: any}> = ({uploadImage}) => {
	// const [selectedFile, setSelectedFile] = useState<any>(null);

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		console.log("in fileChange selectedFile", file);
		uploadImage(file);
	};

	return (
		<div className="flex items-center">
			<label
				htmlFor="fileInput"
				className="cursor-pointer flex items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 rounded-md"
			>
				<AiOutlinePlus className="text-gray-500 text-xl" />
				<input
					type="file"
					name="image"
                    id="fileInput"
					accept=".jpg , .jgeg, .png"
                    className="sr-only"

					onChange={handleFileChange}
				/>
			</label>
			{/* <span className="ml-2">
        {selectedFile ? selectedFile?.name : 'No file selected'}
      </span> */}
		</div>
	);
};

export default ImageFileUpload;
