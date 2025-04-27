"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Camera, X, Check, Edit, Info, Sparkles, Clock, DollarSign, Tag, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for card sets
const cardSets = [
  { id: "base", name: "Base Set" },
  { id: "jungle", name: "Jungle" },
  { id: "fossil", name: "Fossil" },
  { id: "team-rocket", name: "Team Rocket" },
  { id: "gym-heroes", name: "Gym Heroes" },
  { id: "neo-genesis", name: "Neo Genesis" },
]

// Mock data for card rarities
const cardRarities = [
  { id: "common", name: "Common" },
  { id: "uncommon", name: "Uncommon" },
  { id: "rare", name: "Rare" },
  { id: "holo-rare", name: "Holo Rare" },
  { id: "ultra-rare", name: "Ultra Rare" },
]

// Mock data for card conditions
const cardConditions = [
  { id: "mint", name: "Mint", grade: "PSA 10" },
  { id: "near-mint", name: "Near Mint", grade: "PSA 9" },
  { id: "excellent", name: "Excellent", grade: "PSA 8" },
  { id: "very-good", name: "Very Good", grade: "PSA 7" },
  { id: "good", name: "Good", grade: "PSA 6" },
]

// Mock data for blockchains
const blockchains = [
  { id: "ethereum", name: "Ethereum" },
  { id: "polygon", name: "Polygon" },
  { id: "solana", name: "Solana" },
  { id: "flow", name: "Flow" },
]

export function CardListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [processingStep, setProcessingStep] = useState("")
  const [extractedData, setExtractedData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        simulateProcessing()
      }
      reader.readAsDataURL(file)
    }
  }

  // Simulate the processing of the card image
  const simulateProcessing = () => {
    setIsProcessing(true)
    setProcessingStep("Detecting card")
    setProcessingProgress(0)

    // Simulate the different steps of processing
    setTimeout(() => {
      setProcessingProgress(30)
      setProcessingStep("Reading text")
    }, 1500)

    setTimeout(() => {
      setProcessingProgress(60)
      setProcessingStep("Matching database")
    }, 3000)

    setTimeout(() => {
      setProcessingProgress(100)
      setProcessingStep("Complete")
      setIsProcessing(false)

      // Mock extracted data
      setExtractedData({
        name: "Charizard",
        set: "Base Set",
        number: "4/102",
        type: "Fire",
        rarity: "Holo Rare",
        condition: "Near Mint",
        grade: "PSA 9",
        year: "1999",
        artist: "Mitsuhiro Arita",
        isFirstEdition: true,
        isHolographic: true,
      })

      setConfidence(92)
      setCurrentStep(2)
    }, 4500)
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        simulateProcessing()
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle camera capture
  const handleCameraCapture = () => {
    // Check if the browser supports the MediaDevices API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Create a video element to show the camera stream
      const videoElement = document.createElement("video")
      videoElement.autoplay = true

      // Create a canvas element to capture the frame
      const canvasElement = document.createElement("canvas")

      // Create a modal for the camera
      const modal = document.createElement("div")
      modal.style.position = "fixed"
      modal.style.top = "0"
      modal.style.left = "0"
      modal.style.width = "100%"
      modal.style.height = "100%"
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
      modal.style.zIndex = "9999"
      modal.style.display = "flex"
      modal.style.flexDirection = "column"
      modal.style.alignItems = "center"
      modal.style.justifyContent = "center"

      // Add the video element to the modal
      videoElement.style.maxWidth = "100%"
      videoElement.style.maxHeight = "70vh"
      videoElement.style.borderRadius = "8px"
      modal.appendChild(videoElement)

      // Add capture and close buttons
      const buttonContainer = document.createElement("div")
      buttonContainer.style.display = "flex"
      buttonContainer.style.gap = "16px"
      buttonContainer.style.marginTop = "16px"

      const captureButton = document.createElement("button")
      captureButton.textContent = "Capture"
      captureButton.style.padding = "8px 24px"
      captureButton.style.borderRadius = "9999px"
      captureButton.style.backgroundColor = "#8075FF"
      captureButton.style.color = "white"
      captureButton.style.border = "none"
      captureButton.style.cursor = "pointer"

      const closeButton = document.createElement("button")
      closeButton.textContent = "Cancel"
      closeButton.style.padding = "8px 24px"
      closeButton.style.borderRadius = "9999px"
      closeButton.style.backgroundColor = "transparent"
      closeButton.style.color = "white"
      closeButton.style.border = "1px solid rgba(255, 255, 255, 0.2)"
      closeButton.style.cursor = "pointer"

      buttonContainer.appendChild(captureButton)
      buttonContainer.appendChild(closeButton)
      modal.appendChild(buttonContainer)

      // Add the modal to the document
      document.body.appendChild(modal)

      // Get the camera stream
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoElement.srcObject = stream

          // Handle capture button click
          captureButton.onclick = () => {
            // Set canvas dimensions to match the video
            canvasElement.width = videoElement.videoWidth
            canvasElement.height = videoElement.videoHeight

            // Draw the current video frame to the canvas
            const context = canvasElement.getContext("2d")
            context?.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)

            // Convert the canvas to a data URL
            const imageDataUrl = canvasElement.toDataURL("image/png")

            // Set the captured image
            setUploadedImage(imageDataUrl)

            // Start processing the image
            simulateProcessing()

            // Clean up
            const tracks = stream.getTracks()
            tracks.forEach((track) => track.stop())
            document.body.removeChild(modal)
          }

          // Handle close button click
          closeButton.onclick = () => {
            // Clean up
            const tracks = stream.getTracks()
            tracks.forEach((track) => track.stop())
            document.body.removeChild(modal)
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error)
          alert("Could not access the camera. Please make sure you have granted camera permissions.")
          document.body.removeChild(modal)
        })
    } else {
      alert("Your browser does not support camera access. Please try uploading an image instead.")
    }
  }

  // Handle edit field
  const handleEditField = (field: string) => {
    setIsEditing(field)
  }

  // Handle save field
  const handleSaveField = () => {
    setIsEditing(null)
  }

  // Handle proceed to listing
  const handleProceedToListing = () => {
    setCurrentStep(3)
  }

  // Handle submit listing
  const handleSubmitListing = () => {
    // In a real app, this would submit the listing to the backend
    alert("Card successfully listed!")
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-[#F8F9FF] to-[#E4E1FF]/50 dark:from-[#0A0A0A] dark:to-[#121212] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6C63FF]/5 dark:bg-[#6C63FF]/5 blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/5 blur-[120px] animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#121F3D] dark:text-white mb-2">List Your Card</h1>
          <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] max-w-2xl mx-auto">
            Upload your card image and we'll automatically extract the details to create your listing
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 max-w-md mx-auto">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-[#8075FF]" : "text-[#352F7E]"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1 ? "border-[#8075FF] bg-[#322F5D]" : "border-[#352F7E] bg-transparent"
                }`}
              >
                {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <span className="text-sm mt-1">Scan</span>
            </div>

            <div className={`w-16 h-0.5 ${currentStep >= 2 ? "bg-[#8075FF]" : "bg-[#352F7E]"}`}></div>

            <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#8075FF]" : "text-[#352F7E]"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2 ? "border-[#8075FF] bg-[#322F5D]" : "border-[#352F7E] bg-transparent"
                }`}
              >
                {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <span className="text-sm mt-1">Verify</span>
            </div>

            <div className={`w-16 h-0.5 ${currentStep >= 3 ? "bg-[#8075FF]" : "bg-[#352F7E]"}`}></div>

            <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#8075FF]" : "text-[#352F7E]"}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 3 ? "border-[#8075FF] bg-[#322F5D]" : "border-[#352F7E] bg-transparent"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-1">List</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload Card */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/80 dark:bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-lg shadow-[#352F7E]/10 border border-[#E4E1FF] dark:border-[#352F7E]/20 max-w-3xl mx-auto">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-8 text-center transition-all",
                    uploadedImage ? "border-[#8075FF]" : "border-[#352F7E] hover:border-[#8075FF]/50",
                  )}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {!uploadedImage ? (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-[#322F5D] flex items-center justify-center mb-4">
                        <Upload className="h-10 w-10 text-[#8075FF]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#121F3D] dark:text-white mb-2">
                        Drag your card image here
                      </h3>
                      <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] mb-6">or click to browse your files</p>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-full bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF] text-[#121F3D] dark:text-white"
                        >
                          Browse Files
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full border-[#8075FF] text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={handleCameraCapture}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Use Camera
                        </Button>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />

                      <p className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]/70 mt-6">
                        Supported formats: JPG, PNG, HEIF, TIFF
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-full max-w-xs mx-auto aspect-[2/3] rounded-lg overflow-hidden">
                        <Image
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded card"
                          fill
                          className="object-contain"
                        />

                        {isProcessing && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full border-2 border-[#8075FF] border-t-transparent animate-spin mb-4"></div>
                            <p className="text-[#121F3D] dark:text-white font-medium">{processingStep}</p>
                            <div className="w-48 mt-2">
                              <Progress value={processingProgress} className="h-1.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {!isProcessing && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-0 right-0 rounded-full bg-black/50 border-white/20 text-[#121F3D] dark:text-white hover:bg-black/70"
                          onClick={() => setUploadedImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <h4 className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm mb-3">Example results</h4>
                  <div className="flex justify-center gap-4 overflow-x-auto pb-2">
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden border border-[#E4E1FF] dark:border-[#352F7E]/50">
                      <Image src="/fiery-dragon.png" alt="Example card 1" fill className="object-cover" />
                    </div>
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden border border-[#E4E1FF] dark:border-[#352F7E]/50">
                      <Image src="/blastoise-hydro-pump.png" alt="Example card 2" fill className="object-cover" />
                    </div>
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden border border-[#E4E1FF] dark:border-[#352F7E]/50">
                      <Image src="/venusaur-jungle-power.png" alt="Example card 3" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Verify Extracted Data */}
          {currentStep === 2 && extractedData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Preview */}
                <div className="bg-white/80 dark:bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                  <h3 className="text-xl font-bold text-[#121F3D] dark:text-white mb-4">Card Preview</h3>

                  <div className="relative w-full max-w-xs mx-auto aspect-[2/3] rounded-lg overflow-hidden perspective-card">
                    <div className="w-full h-full transform-card">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Card preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <Sparkles className="h-4 w-4 text-[#FFE066] mr-2" />
                      <span className="text-[#121F3D] dark:text-white text-sm">
                        AI Confidence: <span className="text-[#FFE066] font-medium">{confidence}%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extracted Data */}
                <div className="bg-white/80 dark:bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#121F3D] dark:text-white">Extracted Data</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-[#8075FF] text-[#8075FF] hover:bg-[#322F5D]"
                      onClick={handleProceedToListing}
                    >
                      Accept All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Card Name */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Card Name</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={() => handleEditField("name")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {isEditing === "name" ? (
                        <div className="flex gap-2">
                          <Input
                            defaultValue={extractedData.name}
                            className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white"
                          />
                          <Button size="sm" className="rounded-full bg-[#8075FF]" onClick={handleSaveField}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-[#121F3D] dark:text-white font-medium">{extractedData.name}</p>
                      )}
                    </div>

                    {/* Card Set */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Card Set</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={() => handleEditField("set")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {isEditing === "set" ? (
                        <div className="flex gap-2">
                          <Select defaultValue={extractedData.set}>
                            <SelectTrigger className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              {cardSets.map((set) => (
                                <SelectItem key={set.id} value={set.name}>
                                  {set.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button size="sm" className="rounded-full bg-[#8075FF]" onClick={handleSaveField}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-[#121F3D] dark:text-white font-medium">{extractedData.set}</p>
                      )}
                    </div>

                    {/* Card Number */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Card Number</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={() => handleEditField("number")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {isEditing === "number" ? (
                        <div className="flex gap-2">
                          <Input
                            defaultValue={extractedData.number}
                            className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white"
                          />
                          <Button size="sm" className="rounded-full bg-[#8075FF]" onClick={handleSaveField}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-[#121F3D] dark:text-white font-medium">{extractedData.number}</p>
                      )}
                    </div>

                    {/* Card Rarity */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Rarity</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={() => handleEditField("rarity")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {isEditing === "rarity" ? (
                        <div className="flex gap-2">
                          <Select defaultValue={extractedData.rarity}>
                            <SelectTrigger className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              {cardRarities.map((rarity) => (
                                <SelectItem key={rarity.id} value={rarity.name}>
                                  {rarity.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button size="sm" className="rounded-full bg-[#8075FF]" onClick={handleSaveField}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-[#121F3D] dark:text-white font-medium">{extractedData.rarity}</p>
                      )}
                    </div>

                    {/* Card Condition */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Condition</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full text-[#8075FF] hover:bg-[#322F5D]"
                          onClick={() => handleEditField("condition")}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {isEditing === "condition" ? (
                        <div className="flex gap-2">
                          <Select defaultValue={extractedData.condition}>
                            <SelectTrigger className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                              {cardConditions.map((condition) => (
                                <SelectItem key={condition.id} value={condition.name}>
                                  {condition.name} ({condition.grade})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button size="sm" className="rounded-full bg-[#8075FF]" onClick={handleSaveField}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-[#121F3D] dark:text-white font-medium">
                          {extractedData.condition} ({extractedData.grade})
                        </p>
                      )}
                    </div>

                    {/* Special Attributes */}
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-3 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block mb-2">
                        Special Attributes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#322F5D] text-[#8075FF] border border-[#8075FF]/30">
                          {extractedData.isFirstEdition ? "First Edition" : "Unlimited"}
                        </Badge>
                        <Badge className="bg-[#322F5D] text-[#8075FF] border border-[#8075FF]/30">
                          {extractedData.isHolographic ? "Holographic" : "Non-Holographic"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      className="w-full rounded-full bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF] text-[#121F3D] dark:text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                      onClick={handleProceedToListing}
                    >
                      Continue to Listing
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Create Listing */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card Preview */}
                <div className="bg-white/80 dark:bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                  <h3 className="text-xl font-bold text-[#121F3D] dark:text-white mb-4">Card Preview</h3>

                  <div className="relative w-full max-w-xs mx-auto aspect-[2/3] rounded-lg overflow-hidden perspective-card">
                    <div className="w-full h-full transform-card">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Card preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-[#121F3D] dark:text-white font-medium mb-2">Card Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Name:</span>
                        <span className="text-[#121F3D] dark:text-white">{extractedData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Set:</span>
                        <span className="text-[#121F3D] dark:text-white">{extractedData.set}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Number:</span>
                        <span className="text-[#121F3D] dark:text-white">{extractedData.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Rarity:</span>
                        <span className="text-[#121F3D] dark:text-white">{extractedData.rarity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Condition:</span>
                        <span className="text-[#121F3D] dark:text-white">{extractedData.condition}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="bg-white/80 dark:bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#E4E1FF] dark:border-[#352F7E]/20 lg:col-span-2">
                  <h3 className="text-xl font-bold text-[#121F3D] dark:text-white mb-4">Listing Details</h3>

                  <Tabs defaultValue="fixed-price" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4 bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-full p-1 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <TabsTrigger
                        value="fixed-price"
                        className="rounded-full data-[state=active]:bg-[#1A1C36] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white text-[#121F3D]/70 dark:text-[#B6B8CF]"
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        Fixed Price
                      </TabsTrigger>
                      <TabsTrigger
                        value="auction"
                        className="rounded-full data-[state=active]:bg-[#1A1C36] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white text-[#121F3D]/70 dark:text-[#B6B8CF]"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Auction
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="fixed-price" className="space-y-4">
                      <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block mb-2">Price</label>
                        <div className="flex items-center">
                          <div className="bg-white dark:bg-[#1A1C36] rounded-l-lg p-2 border border-r-0 border-[#E4E1FF] dark:border-[#352F7E]">
                            <DollarSign className="h-5 w-5 text-[#8075FF]" />
                          </div>
                          <Input
                            type="number"
                            defaultValue="12500"
                            className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white rounded-l-none"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Market Average:</span>
                          <span className="text-[#5DDFB8] font-medium">$12,350</span>
                        </div>
                      </div>

                      <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Listing Duration</label>
                          <span className="text-[#8075FF] text-sm">30 days</span>
                        </div>
                        <Slider defaultValue={[30]} max={90} step={1} className="py-4" />
                        <div className="flex justify-between text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">
                          <span>1 day</span>
                          <span>90 days</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="auction" className="space-y-4">
                      <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block mb-2">
                          Starting Price
                        </label>
                        <div className="flex items-center">
                          <div className="bg-white dark:bg-[#1A1C36] rounded-l-lg p-2 border border-r-0 border-[#E4E1FF] dark:border-[#352F7E]">
                            <DollarSign className="h-5 w-5 text-[#8075FF]" />
                          </div>
                          <Input
                            type="number"
                            defaultValue="5000"
                            className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white rounded-l-none"
                          />
                        </div>
                      </div>

                      <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block mb-2">
                          Reserve Price (Optional)
                        </label>
                        <div className="flex items-center">
                          <div className="bg-white dark:bg-[#1A1C36] rounded-l-lg p-2 border border-r-0 border-[#E4E1FF] dark:border-[#352F7E]">
                            <DollarSign className="h-5 w-5 text-[#8075FF]" />
                          </div>
                          <Input
                            type="number"
                            placeholder="No reserve"
                            className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white rounded-l-none"
                          />
                        </div>
                      </div>

                      <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Auction Duration</label>
                          <span className="text-[#8075FF] text-sm">7 days</span>
                        </div>
                        <Slider defaultValue={[7]} max={14} step={1} className="py-4" />
                        <div className="flex justify-between text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">
                          <span>1 day</span>
                          <span>14 days</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 space-y-4">
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Blockchain</label>
                        <Info className="h-4 w-4 text-[#121F3D]/70 dark:text-[#B6B8CF]" />
                      </div>
                      <Select defaultValue="ethereum">
                        <SelectTrigger className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white">
                          {blockchains.map((blockchain) => (
                            <SelectItem key={blockchain.id} value={blockchain.id}>
                              {blockchain.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">Royalties</label>
                        <span className="text-[#8075FF] text-sm">5%</span>
                      </div>
                      <Slider defaultValue={[5]} max={10} step={0.5} className="py-4" />
                      <div className="flex justify-between text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        <span>0%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block">
                            Include Physical Card
                          </label>
                          <p className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]/70">
                            The physical card will be stored in our vault
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20">
                      <label className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm block mb-2">
                        Description (Optional)
                      </label>
                      <Textarea
                        placeholder="Add details about your card..."
                        className="bg-white dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="bg-[#F8F9FF]/80 dark:bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-4 border border-[#E4E1FF] dark:border-[#352F7E]/20 mb-4">
                      <div className="flex items-center mb-2">
                        <BarChart3 className="h-5 w-5 text-[#8075FF] mr-2" />
                        <h4 className="text-[#121F3D] dark:text-white font-medium">Market Analysis</h4>
                      </div>
                      <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm mb-3">
                        Based on recent sales, your card is priced competitively within the top 25% of similar listings.
                      </p>
                      <div className="h-2 bg-[#1A1C36] rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-[#8075FF] to-[#6C63FF]"></div>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <input type="checkbox" id="terms" className="rounded text-[#8075FF]" />
                      <label htmlFor="terms" className="ml-2 text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-[#8075FF] hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#8075FF] hover:underline">
                          Listing Guidelines
                        </a>
                      </label>
                    </div>

                    <Button
                      className="w-full rounded-full bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF] text-[#121F3D] dark:text-white shadow-[0_0_15px_rgba(108,99,255,0.3)] py-6 text-lg font-medium"
                      onClick={handleSubmitListing}
                    >
                      List Card Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
