"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileSettings({ isOpen, onClose }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState("profile")

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white dark:bg-[#131525] shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-bold text-[#121F3D] dark:text-white">Settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-[#F9F9FB] dark:hover:bg-[#1A1C36]"
                  onClick={onClose}
                >
                  <X className="h-5 w-5 text-[#121F3D]/70 dark:text-[#B6B8CF]" />
                </Button>
              </div>

              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-full p-1 w-full mb-6">
                  <TabsTrigger
                    value="profile"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] flex-1"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] flex-1"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] flex-1"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-[#1A1C36] shadow-lg mb-4">
                      <Image src="/placeholder.svg?key=b86ly" alt="Profile" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#6C63FF] dark:text-[#8075FF] border-[#6C63FF] dark:border-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
                    >
                      Change Photo
                    </Button>
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="CardCollector"
                        className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        Location
                      </Label>
                      <Input
                        id="location"
                        defaultValue="New York, USA"
                        className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        defaultValue="Passionate Pokémon card collector since 1999. Specializing in first edition holos and Japanese promos."
                        className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white mt-1 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label className="text-[#121F3D]/70 dark:text-[#B6B8CF]">Social Links</Label>
                      <div className="space-y-2 mt-1">
                        <Input
                          placeholder="Twitter"
                          defaultValue="https://twitter.com/cardcollector"
                          className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white"
                        />
                        <Input
                          placeholder="Instagram"
                          defaultValue="https://instagram.com/cardcollector"
                          className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white"
                        />
                        <Input
                          placeholder="YouTube"
                          defaultValue="https://youtube.com/cardcollector"
                          className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                  {/* Account Settings */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="collector@example.com"
                        className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-[#121F3D]/70 dark:text-[#B6B8CF]">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        defaultValue="••••••••••••"
                        className="bg-[#F9F9FB] dark:bg-[#1A1C36] border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D] dark:text-white mt-1"
                      />
                    </div>

                    <div className="pt-2">
                      <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white mb-4">Connected Wallets</h4>

                      <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#121F3D] dark:text-white">Ethereum Wallet</div>
                          <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">0x1a2b...3c4d</div>
                        </div>
                        <div className="bg-[#4ECCA3]/10 text-[#4ECCA3] px-2 py-1 rounded-full text-xs flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Connected
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 rounded-full text-[#6C63FF] dark:text-[#8075FF] border-[#6C63FF] dark:border-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
                      >
                        Connect Another Wallet
                      </Button>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white mb-4">Privacy</h4>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#121F3D] dark:text-white font-medium">Public Profile</Label>
                            <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                              Allow others to view your profile
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#121F3D] dark:text-white font-medium">Show Collection Value</Label>
                            <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                              Display the total value of your collection
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white">Email Notifications</h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">New Offers</Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Receive emails when someone makes an offer
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">Price Alerts</Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Get notified about price changes on watched cards
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">New Drops</Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Receive emails about new card drops
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">Marketing Emails</Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Receive promotional emails and newsletters
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white pt-4">Push Notifications</h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">
                            Enable Push Notifications
                          </Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Receive notifications on your device
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-[#121F3D] dark:text-white font-medium">Transaction Updates</Label>
                          <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            Get notified about your transaction status
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D]/70 dark:text-[#B6B8CF] hover:bg-[#F9F9FB] dark:hover:bg-[#1A1C36]"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full bg-[#6C63FF] dark:bg-[#8075FF] text-white hover:bg-[#5D51FF] dark:hover:bg-[#6C63FF]"
                  onClick={onClose}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
