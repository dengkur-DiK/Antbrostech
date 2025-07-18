import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Upload, Save, Eye, Edit2, Trash2, Calendar, Phone, Mail, User, Plus, FileImage } from "lucide-react";
import AdminLogin from "./admin-login";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    stats: {
      projects: number;
      clients: number;
      experience: number;
    };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

function BookingsList() {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['/api/bookings'],
    queryFn: () => fetch('/api/bookings').then(res => res.json())
  });

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Calendar className="w-12 h-12 mx-auto mb-4" />
        <p>No bookings yet. This section will show customer booking requests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking: any) => (
        <div key={booking.id} className="border border-gray-600 rounded-lg p-4 bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">
                  {booking.firstName} {booking.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>{booking.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>{booking.phone}</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-orange-500">Service:</span> {booking.service}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-orange-500">Message:</span>
                <p className="mt-1 text-gray-300">{booking.message}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-1">
                {new Date(booking.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    image: '',
    category: ''
  });
  const { toast } = useToast();

  // Fetch portfolio items from database
  const { data: portfolioItems = [], isLoading: portfolioLoading } = useQuery({
    queryKey: ['/api/portfolio'],
    queryFn: () => fetch('/api/portfolio').then(res => res.json())
  });

  // Mutations for portfolio operations
  const addPortfolioMutation = useMutation({
    mutationFn: (data: Partial<PortfolioItem>) => apiRequest('POST', '/api/portfolio', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "Item Added",
        description: "New portfolio item added successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add portfolio item",
        variant: "destructive"
      });
    }
  });

  const updatePortfolioMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PortfolioItem> }) => 
      apiRequest('PUT', `/api/portfolio/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "Item Updated",
        description: "Portfolio item updated successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update portfolio item",
        variant: "destructive"
      });
    }
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/portfolio/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({
        title: "Item Deleted",
        description: "Portfolio item removed successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive"
      });
    }
  });

  // Initialize with current content
  useEffect(() => {
    const defaultContent: SiteContent = {
      hero: {
        title: "Creative Photography",
        subtitle: "for the Digital Age",
        description: "We capture innovation, technology, and human collaboration through stunning visual storytelling that elevates your brand.",
        backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
      },
      about: {
        title: "About AntBros",
        description: "We are a creative photography studio specializing in technology, innovation, and collaborative storytelling.",
        longDescription: "With years of experience in commercial photography, we understand the importance of visual communication in today's digital landscape. From startup tech companies to established enterprises, we help brands tell their stories through stunning photography.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        stats: {
          projects: 500,
          clients: 50,
          experience: 5
        }
      },
      contact: {
        address: "123 Creative Avenue, Innovation District, Tech City 12345",
        phone: "+1 (555) 123-4567",
        email: "hello@antbrosphotography.com",
        hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
      }
    };

    const defaultPortfolio: PortfolioItem[] = [
      {
        id: "1",
        title: "Studio Equipment",
        description: "Professional-grade equipment for tech photography",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "equipment"
      },
      {
        id: "2",
        title: "Tech Innovation",
        description: "Capturing cutting-edge technology and innovation",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "technology"
      },
      {
        id: "3",
        title: "Team Collaboration",
        description: "Dynamic team interactions and collaborative moments",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "team"
      },
      {
        id: "4",
        title: "Creative Spaces",
        description: "Inspiring workspaces that foster creativity",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "workspace"
      },
      {
        id: "5",
        title: "Studio Sessions",
        description: "Professional studio photography sessions",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "studio"
      },
      {
        id: "6",
        title: "Tech Workspaces",
        description: "Modern technology environments and setups",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "workspace"
      }
    ];

    setSiteContent(defaultContent);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isForNewItem = false) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      
      if (isForNewItem) {
        setNewItem(prev => ({ ...prev, image: imageUrl }));
      } else if (editingItem) {
        setEditingItem(prev => prev ? { ...prev, image: imageUrl } : null);
      }
      
      toast({
        title: "Image Selected",
        description: `${file.name} ready to use`
      });
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    // Create a local URL for the image
    const imageUrl = URL.createObjectURL(selectedFile);
    
    toast({
      title: "Image Ready",
      description: "Image is ready to use"
    });
    
    return imageUrl;
  };

  const savePortfolioItem = () => {
    if (editingItem && editingItem.title && editingItem.description) {
      updatePortfolioMutation.mutate({ 
        id: editingItem.id, 
        data: {
          title: editingItem.title,
          description: editingItem.description,
          image: editingItem.image,
          category: editingItem.category
        }
      });
      setEditingItem(null);
    }
  };

  const addNewPortfolioItem = () => {
    if (newItem.title && newItem.description && newItem.image && newItem.category) {
      addPortfolioMutation.mutate(newItem);
      setNewItem({
        title: '',
        description: '',
        image: '',
        category: ''
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including uploading an image",
        variant: "destructive"
      });
    }
  };

  const deletePortfolioItem = (id: number) => {
    deletePortfolioMutation.mutate(id);
  };

  const saveSiteContent = () => {
    // In a real implementation, this would save to your backend
    toast({
      title: "Content Saved",
      description: "Site content updated successfully"
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">AntBros Admin Panel</h1>
          <Button 
            onClick={() => window.open('/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Site
          </Button>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Management</CardTitle>
                <CardDescription>Add, edit, and manage your portfolio items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 bg-gray-800">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingItem({...item})}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deletePortfolioItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Edit Form */}
                {editingItem && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-800">
                    <h3 className="font-semibold mb-4">Edit Portfolio Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input 
                          id="edit-title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem(prev => prev ? {...prev, title: e.target.value} : null)}
                          className="bg-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Input 
                          id="edit-category"
                          value={editingItem.category}
                          onChange={(e) => setEditingItem(prev => prev ? {...prev, category: e.target.value} : null)}
                          className="bg-gray-700"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea 
                          id="edit-description"
                          value={editingItem.description}
                          onChange={(e) => setEditingItem(prev => prev ? {...prev, description: e.target.value} : null)}
                          className="bg-gray-700"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="edit-image">Image</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="edit-image"
                            value={editingItem.image}
                            onChange={(e) => setEditingItem(prev => prev ? {...prev, image: e.target.value} : null)}
                            className="bg-gray-700 flex-1"
                            placeholder="Image URL"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e)}
                            className="hidden"
                            id="edit-file-upload"
                          />
                          <Button 
                            type="button"
                            onClick={() => document.getElementById('edit-file-upload')?.click()}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <FileImage className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                        {editingItem.image && (
                          <img 
                            src={editingItem.image} 
                            alt="Preview" 
                            className="mt-2 w-32 h-24 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={savePortfolioItem}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button 
                        onClick={() => setEditingItem(null)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Add New Item Form */}
                <div className="mt-6 p-4 border rounded-lg bg-gray-800">
                  <h3 className="font-semibold mb-4">Add New Portfolio Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-title">Title</Label>
                      <Input 
                        id="new-title"
                        value={newItem.title || ''}
                        onChange={(e) => setNewItem(prev => ({...prev, title: e.target.value}))}
                        placeholder="Project title"
                        className="bg-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-category">Category</Label>
                      <Input 
                        id="new-category"
                        value={newItem.category || ''}
                        onChange={(e) => setNewItem(prev => ({...prev, category: e.target.value}))}
                        placeholder="e.g., technology, studio, team"
                        className="bg-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="new-description">Description</Label>
                      <Textarea 
                        id="new-description"
                        value={newItem.description || ''}
                        onChange={(e) => setNewItem(prev => ({...prev, description: e.target.value}))}
                        placeholder="Project description"
                        className="bg-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="new-image">Image</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="new-image"
                          value={newItem.image || ''}
                          onChange={(e) => setNewItem(prev => ({...prev, image: e.target.value}))}
                          className="bg-gray-700 flex-1"
                          placeholder="Image URL"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, true)}
                          className="hidden"
                          id="new-file-upload"
                        />
                        <Button 
                          type="button"
                          onClick={() => document.getElementById('new-file-upload')?.click()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <FileImage className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                      {newItem.image && (
                        <img 
                          src={newItem.image} 
                          alt="Preview" 
                          className="mt-2 w-32 h-24 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={addNewPortfolioItem}
                    className="mt-4 bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Portfolio Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Content</CardTitle>
                <CardDescription>Edit your site's text content and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {siteContent && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Hero Section</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hero-title">Main Title</Label>
                          <Input 
                            id="hero-title"
                            value={siteContent.hero.title}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              hero: { ...prev.hero, title: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hero-subtitle">Subtitle</Label>
                          <Input 
                            id="hero-subtitle"
                            value={siteContent.hero.subtitle}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              hero: { ...prev.hero, subtitle: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="hero-description">Description</Label>
                        <Textarea 
                          id="hero-description"
                          value={siteContent.hero.description}
                          onChange={(e) => setSiteContent(prev => prev ? {
                            ...prev,
                            hero: { ...prev.hero, description: e.target.value }
                          } : null)}
                          className="bg-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">About Section</h3>
                      <div>
                        <Label htmlFor="about-title">Title</Label>
                        <Input 
                          id="about-title"
                          value={siteContent.about.title}
                          onChange={(e) => setSiteContent(prev => prev ? {
                            ...prev,
                            about: { ...prev.about, title: e.target.value }
                          } : null)}
                          className="bg-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-description">Short Description</Label>
                        <Textarea 
                          id="about-description"
                          value={siteContent.about.description}
                          onChange={(e) => setSiteContent(prev => prev ? {
                            ...prev,
                            about: { ...prev.about, description: e.target.value }
                          } : null)}
                          className="bg-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-long">Long Description</Label>
                        <Textarea 
                          id="about-long"
                          value={siteContent.about.longDescription}
                          onChange={(e) => setSiteContent(prev => prev ? {
                            ...prev,
                            about: { ...prev.about, longDescription: e.target.value }
                          } : null)}
                          className="bg-gray-700"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="projects">Projects Completed</Label>
                          <Input 
                            id="projects"
                            type="number"
                            value={siteContent.about.stats.projects}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              about: { 
                                ...prev.about, 
                                stats: { ...prev.about.stats, projects: parseInt(e.target.value) || 0 }
                              }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clients">Happy Clients</Label>
                          <Input 
                            id="clients"
                            type="number"
                            value={siteContent.about.stats.clients}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              about: { 
                                ...prev.about, 
                                stats: { ...prev.about.stats, clients: parseInt(e.target.value) || 0 }
                              }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="experience">Years Experience</Label>
                          <Input 
                            id="experience"
                            type="number"
                            value={siteContent.about.stats.experience}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              about: { 
                                ...prev.about, 
                                stats: { ...prev.about.stats, experience: parseInt(e.target.value) || 0 }
                              }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address"
                            value={siteContent.contact.address}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, address: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            value={siteContent.contact.phone}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, phone: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            value={siteContent.contact.email}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, email: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hours">Business Hours</Label>
                          <Input 
                            id="hours"
                            value={siteContent.contact.hours}
                            onChange={(e) => setSiteContent(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, hours: e.target.value }
                            } : null)}
                            className="bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={saveSiteContent}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save All Changes
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Management</CardTitle>
                <CardDescription>Upload and manage your photography images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Upload New Image</h3>
                  <p className="text-gray-400 mb-4">
                    Drag and drop your image here, or click to select
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Choose File
                  </Button>
                  {selectedFile && (
                    <div className="mt-4 p-4 bg-gray-700 rounded">
                      <p className="text-sm">Selected: {selectedFile.name}</p>
                      <Button 
                        onClick={uploadImage}
                        className="mt-2 bg-green-600 hover:bg-green-700"
                      >
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Image Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-gray-800 rounded">
                      <h4 className="font-semibold mb-2">Recommended Sizes</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Hero background: 1920x1080px</li>
                        <li>• Portfolio images: 800x600px</li>
                        <li>• About section: 800x600px</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-800 rounded">
                      <h4 className="font-semibold mb-2">Best Practices</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Use high-quality images</li>
                        <li>• Keep file sizes under 2MB</li>
                        <li>• Use descriptive file names</li>
                        <li>• Consider image compression</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>View and manage photography session bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}