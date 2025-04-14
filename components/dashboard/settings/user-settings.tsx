"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, User } from "lucide-react"
import ProfileForm from "./profile-form"
import DeleteAccount from "./delete-account"

export default function UserSettings() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2 md:w-auto">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Perfil</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Segurança</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <ProfileForm />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <DeleteAccount />
      </TabsContent>
    </Tabs>
  )
}
