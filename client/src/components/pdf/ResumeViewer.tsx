// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// interface PDFViewerProps {
//   pdfFile: string; // PDF file URL or base64 data
// }

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist/build/pdf.worker.min.js`;

// const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div className="pdf-viewer">
//       <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div className="pdf-navigation">
//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//         <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
//           Previous
//         </button>
//         <button disabled={pageNumber >= numPages!} onClick={() => setPageNumber(pageNumber + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;