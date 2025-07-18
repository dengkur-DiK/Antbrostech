import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function Booking() {
  const [formData, setFormData] = useState<BookingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const { toast } = useToast();

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const response = await apiRequest('POST', '/api/booking', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted",
        description: "Thank you for your booking! We'll get back to you soon.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-20 px-6 md:px-12" style={{ backgroundColor: 'var(--dark-secondary)' }}>
      <div className="max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] mb-6">Ready to Create?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Let's discuss your photography needs and create something amazing together
        </p>
        <div className="rounded-xl p-8 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--dark-primary)' }}>
          <h3 className="text-2xl font-semibold mb-6">Book Your Session</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-gray-800 border-gray-600 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-gray-800 border-gray-600 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-gray-800 border-gray-600 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="service">Select Service</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-orange-500">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio Photography</SelectItem>
                  <SelectItem value="tech">Tech Photography</SelectItem>
                  <SelectItem value="team">Team Photography</SelectItem>
                  <SelectItem value="corporate">Corporate Events</SelectItem>
                  <SelectItem value="video">Video Production</SelectItem>
                  <SelectItem value="postproduction">Post-Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Tell us about your project</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="bg-gray-800 border-gray-600 focus:border-orange-500"
                rows={4}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-semibold"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? "Submitting..." : "Book Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
