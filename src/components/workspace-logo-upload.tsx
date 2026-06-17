'use client'

import { useState } from 'react'
import { Upload, Trash2 } from 'lucide-react'

interface WorkspaceLogoUploadProps {
  currentLogoUrl?: string
  onLogoChange?: (logoUrl: string) => void
}

export function WorkspaceLogoUpload({
  currentLogoUrl,
  onLogoChange,
}: WorkspaceLogoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentLogoUrl || null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onLogoChange?.(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragActive
            ? 'border-[#635bff] bg-blue-50'
            : 'border-[#e3e8ee] hover:border-[#635bff]'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handleFileSelect(file)
            }
          }}
          className="hidden"
          id="logo-input"
        />
        <label
          htmlFor="logo-input"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Upload className="w-6 h-6 text-[#8898aa]" />
          <div>
            <p className="text-[13px] font-semibold text-[#0a2540]">
              Drop your logo here or click to upload
            </p>
            <p className="text-[12px] text-[#8898aa] mt-1">
              PNG, JPG or GIF (max 5MB)
            </p>
          </div>
        </label>
      </div>

      {preview && (
        <div className="space-y-3">
          <div className="flex items-center justify-center p-4 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee]">
            <img
              src={preview}
              alt="Logo preview"
              className="max-w-xs max-h-32 object-contain"
            />
          </div>
          <button
            onClick={() => {
              setPreview(null)
              onLogoChange?.('')
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-[13px] font-semibold hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove Logo
          </button>
        </div>
      )}

      <p className="text-[11px] text-[#8898aa]">
        Note: Logo upload is a placeholder. In production, this would be integrated with a storage service.
      </p>
    </div>
  )
}
