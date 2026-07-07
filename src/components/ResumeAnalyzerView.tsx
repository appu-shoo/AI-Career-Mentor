import React, { useState, useRef } from 'react';
import { 
  FileText, Sparkles, AlertCircle, CheckCircle, Search, 
  ArrowRight, RefreshCw, FileSearch, HelpCircle, ArrowLeftRight,
  UploadCloud, Trash2, File as FileIcon
} from 'lucide-react';

interface OptimizedBullet {
  original: string;
  optimized: string;
  explanation: string;
}

interface AnalysisReport {
  atsScore: number;
  missingKeywords: string[];
  weakSections: string[];
  optimizedBulletPoints: OptimizedBullet[];
  recommendedProjects: string[];
  recommendedCertifications: string[];
  suggestedTechnicalSkills: string[];
}

export default function ResumeAnalyzerView() {
  const [resumeText, setResumeText] = useState('');
  
  const [jobDescription, setJobDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  // File upload state variables
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    base64: string;
    mimeType: string;
    size: string;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    setUploadError(null);
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File exceeds 5MB size limit.");
      return;
    }

    const sizeStr = (file.size / 1024).toFixed(1) + " KB";

    // TXT/MD/RTF plain text parsing
    if (file.type === 'text/plain' || file.type === 'text/markdown' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        setUploadedFile({
          name: file.name,
          base64: btoa(unescape(encodeURIComponent(text))),
          mimeType: 'text/plain',
          size: sizeStr
        });
      };
      reader.onerror = () => setUploadError("Failed to parse the text file.");
      reader.readAsText(file);
    } 
    // PDF file parsing
    else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const base64Data = result.split(',')[1];
        setUploadedFile({
          name: file.name,
          base64: base64Data,
          mimeType: 'application/pdf',
          size: sizeStr
        });
        setResumeText(`[PDF Document Uploaded: ${file.name}] - Document structure will be processed natively by Gemini.`);
      };
      reader.onerror = () => setUploadError("Failed to read the PDF file.");
      reader.readAsDataURL(file);
    } 
    // DOCX file explanation
    else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      setUploadError("To analyze Word documents (.docx), please convert them to PDF or copy-paste their text content below.");
    } 
    else {
      setUploadError("Unsupported file format. Please upload a PDF, TXT, or MD file.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setResumeText('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resumeText, 
          jobDescription,
          resumeFileBase64: uploadedFile?.base64 || null,
          resumeFileMimeType: uploadedFile?.mimeType || null
        })
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Resume analysis request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileSearch className="h-6 w-6 text-indigo-600" /> AI Resume Analyzer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Scan your existing resume achievements directly against enterprise ATS criteria and target job descriptors.
        </p>
      </div>

      {/* Main interface split: Inputs on left, analysis on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left pane: input fields */}
        <div className="flex flex-col gap-5 bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-amber-500" /> Analyzer Intake Parameters
          </h3>

          {/* Real Resume File Upload Block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Upload CV/Resume File (PDF, TXT, or MD)</label>
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10' 
                  : 'border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 hover:bg-slate-50/50 dark:hover:bg-[#16181D]/30'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf,.txt,.md"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <UploadCloud className="h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Drag and drop your file here, or <span className="text-indigo-600 hover:underline">browse</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Supports PDF, TXT, and MD up to 5MB</p>
            </div>

            {uploadError && (
              <div className="mt-1 p-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 border border-rose-100/60 dark:border-rose-900/40">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadedFile && (
              <div className="mt-1.5 p-2.5 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileIcon className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <div className="truncate text-[11px]">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate leading-tight">{uploadedFile.name}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{uploadedFile.size} • {uploadedFile.mimeType.split('/')[1].toUpperCase()} native</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeUploadedFile(); }}
                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  title="Remove uploaded resume"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Resume text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Resume Plain-text Content</label>
            <textarea 
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
              placeholder="Paste your CV structure, profile summary, work experiences, and academic achievements..."
            />
          </div>

          {/* Job description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Paste Target Job Description (Optional)</label>
            <textarea 
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
              placeholder="Paste the target job advertisement description to scan keyword alignments..."
            />
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-850 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Compiling ATS Matrix...
              </>
            ) : (
              <>
                Analyze Resume Competency <Sparkles className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Right pane: Analysis reports */}
        <div className="flex flex-col gap-5">
          {report ? (
            <div className="flex flex-col gap-6">
              
              {/* Score summary panel */}
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-center">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Analyzed ATS Score</span>
                <div className="mt-2 text-5xl font-display font-extrabold text-indigo-600 dark:text-indigo-400">{report.atsScore}%</div>
                <p className="text-[11px] text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  {report.atsScore >= 75 
                    ? "Excellent match! Your skill density and achievement structures look healthy."
                    : "Room for improvement. Incorporate missing keywords and optimize bullet metrics to pass recruiter stages."
                  }
                </p>
              </div>

              {/* Keyword density alignment card */}
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Search className="h-4 w-4 text-indigo-500" /> Missing High-Impact Keywords
                </h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {report.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-lg border border-rose-100 dark:border-rose-900/50">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weak spots */}
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-500" /> Structuring Weak Spots
                </h4>
                <ul className="flex flex-col gap-2 mt-3 text-xs text-slate-600 dark:text-slate-400">
                  {report.weakSections.map((wk, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side-by-Side Bullet Point Optimizations */}
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <ArrowLeftRight className="h-4 w-4 text-emerald-500" /> side-by-side achievement optimizer
                </h4>
                
                <div className="flex flex-col gap-5 mt-4">
                  {report.optimizedBulletPoints.map((pt, i) => (
                    <div key={i} className="flex flex-col gap-2.5 border-b border-slate-100 dark:border-slate-800/60 pb-4 last:border-0 last:pb-0">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100/50 dark:border-rose-950/20 rounded-xl">
                          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider font-mono">Original passive phrasing</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">"{pt.original}"</p>
                        </div>
                        <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-950/20 rounded-xl">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider font-mono">AI Metrics phrasing</span>
                          <p className="text-xs text-slate-800 dark:text-slate-100 font-bold mt-1">"{pt.optimized}"</p>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 bg-slate-50 dark:bg-[#16181D] px-3 py-1 rounded-md mt-1 border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-indigo-500">Edit Justification:</span> {pt.explanation}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-8 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center h-full min-h-[350px] gap-3">
              <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Awaiting Resume Inputs</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Click "Analyze Resume Competency" on the left panel to scan keywords, optimization steps, and side-by-side structures.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
