import React from "react";

interface PdfViewerProps {
  url: string;
}

function PdfViewer({ url }: PdfViewerProps) {
  return <iframe src={url} width="50%" height="500px" title="PDF Viewer" />;
}

export default PdfViewer;
