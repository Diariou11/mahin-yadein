import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnboardingPassenger from "./pages/OnboardingPassenger";
import OnboardingDriver from "./pages/OnboardingDriver";
import CompleteProfile from "./pages/onboarding/CompleteProfile";
import VerifyIdentity from "./pages/onboarding/VerifyIdentity";
import PaymentMethodSetup from "./pages/onboarding/PaymentMethodSetup";
import TravelPreferences from "./pages/onboarding/TravelPreferences";
import OnboardingTutorial from "./pages/onboarding/OnboardingTutorial";
import DriverCompleteProfile from "./pages/onboarding/driver/DriverCompleteProfile";
import AddVehicle from "./pages/onboarding/driver/AddVehicle";
import DriverVerifyDocuments from "./pages/onboarding/driver/DriverVerifyDocuments";
import DriverPaymentSetup from "./pages/onboarding/driver/DriverPaymentSetup";
import DriverTutorial from "./pages/onboarding/driver/DriverTutorial";
import DriverProfile from "./pages/driver/DriverProfile";
import ManageBookings from "./pages/driver/ManageBookings";
import TripInProgress from "./pages/driver/TripInProgress";
import TripComplete from "./pages/driver/TripComplete";
import Home from "./pages/Home";
import SearchRides from "./pages/SearchRides";
import RideDetail from "./pages/RideDetail";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Tracking from "./pages/Tracking";
import Rides from "./pages/Rides";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DriverDashboard from "./pages/DriverDashboard";
import PublishRide from "./pages/PublishRide";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import EmergencyContacts from "./pages/EmergencyContacts";
import Loyalty from "./pages/Loyalty";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding-passenger" element={<OnboardingPassenger />} />
          <Route path="/onboarding-driver" element={<OnboardingDriver />} />
          <Route path="/onboarding/complete-profile" element={<CompleteProfile />} />
          <Route path="/onboarding/verify-identity" element={<VerifyIdentity />} />
          <Route path="/onboarding/payment-method" element={<PaymentMethodSetup />} />
          <Route path="/onboarding/travel-preferences" element={<TravelPreferences />} />
          <Route path="/onboarding/tutorial" element={<OnboardingTutorial />} />
          <Route path="/onboarding/driver/complete-profile" element={<DriverCompleteProfile />} />
          <Route path="/onboarding/driver/add-vehicle" element={<AddVehicle />} />
          <Route path="/onboarding/driver/verify-documents" element={<DriverVerifyDocuments />} />
          <Route path="/onboarding/driver/payment-setup" element={<DriverPaymentSetup />} />
          <Route path="/onboarding/driver/tutorial" element={<DriverTutorial />} />
          
          {/* Driver Pages */}
          <Route path="/driver/profile" element={<DriverProfile />} />
          <Route path="/driver/manage-bookings" element={<ManageBookings />} />
          <Route path="/driver/trip-in-progress" element={<TripInProgress />} />
          <Route path="/driver/trip-complete" element={<TripComplete />} />
          
          <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchRides />} />
              <Route path="/ride/:id" element={<RideDetail />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/rides" element={<Rides />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
              <Route path="/publish-ride" element={<PublishRide />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/emergency-contacts" element={<EmergencyContacts />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/chat/:conversationId" element={<Chat />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
