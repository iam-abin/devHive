import React from 'react';

// ShimmerLine Component
interface ShimmerLineProps {
    width?: string;
    height?: string;
    className?: string;
}

const ShimmerLine: React.FC<ShimmerLineProps> = ({ width = "100%", height = "1.5rem", className = "" }) => {
    return (
        <div className={`bg-gray-300 rounded ${className}`} style={{ width, height }} />
    );
};

// JobDetailsCardShimmer Component
interface ShimmerJobDetailsProps {
    lines: number;
}

const JobDetailsCardShimmer: React.FC<ShimmerJobDetailsProps> = ({ lines }) => {
    return (
        <div className="container mx-auto my-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md animate-pulse">
                <div className="flex justify-between items-center my-8 mb-4">
                    <ShimmerLine width="60%" height="2rem" />
                    <div className="mb-4 flex gap-2 items-center my-8">
                        <ShimmerLine width="2rem" height="2rem" className="rounded-full" />
                        <ShimmerLine width="40%" height="1.5rem" />
                    </div>
                </div>
                {/* Repeat ShimmerLine for job details */}
                {Array.from({ length: lines }).map((_, index) => (
                    <div key={index} className="mb-4 flex items-center my-8">
                        <ShimmerLine width="60%" height="1.5rem" className="font-extrabold" />
                        <ShimmerLine width="60%" height="1.5rem" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobDetailsCardShimmer;
