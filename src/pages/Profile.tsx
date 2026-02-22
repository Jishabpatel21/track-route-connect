
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { UserRound, Edit, Save, ShieldCheck, Key } from "lucide-react";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the user profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to change the password
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });

    setUserData({
      ...userData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-railway-blue mb-6">
            User Profile
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="railway-card md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <UserRound className="mr-2 h-5 w-5 text-railway-blue" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <Save className="mr-2 h-4 w-4" />
                    ) : (
                      <Edit className="mr-2 h-4 w-4" />
                    )}
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
                <CardDescription>
                  Manage your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-2">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-railway-blue text-white text-xl">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Change Photo
                      </Button>
                    )}
                  </div>
                  
                  {/* Profile Details */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        name="contact"
                        value={userData.contact}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    
                    {user?.role === "admin" && (
                      <div className="flex items-center mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                        <ShieldCheck className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="text-amber-800">
                          Administrator Account
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                {isEditing && (
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Password Card */}
            <Card className="railway-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5 text-railway-blue" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your account password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={userData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={userData.newPassword}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </CardFooter>
            </Card>
            
            {/* Activity Card */}
            <Card className="railway-card md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent account activities and logins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Password Changed</p>
                      <p className="text-sm text-gray-500">Your account password was updated</p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Login from New Device</p>
                      <p className="text-sm text-gray-500">Login detected from Chrome on Windows</p>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Profile Updated</p>
                      <p className="text-sm text-gray-500">Your profile information was updated</p>
                    </div>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
