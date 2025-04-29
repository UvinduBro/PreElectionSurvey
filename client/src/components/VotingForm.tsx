import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { PARTIES, FORM_STEPS } from "@/lib/constants";
import { insertVoteSchema, type InsertVote } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface VotingFormProps {
  onSubmitSuccess: () => void;
  onError: (message: string) => void;
}

// Get districts and local governments
async function fetchDistricts() {
  const response = await fetch("/api/districts");
  if (!response.ok) {
    throw new Error("Failed to fetch districts");
  }
  return response.json();
}

async function fetchLocalGovernments(district: string) {
  const response = await fetch(`/api/local-governments?district=${encodeURIComponent(district)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch local governments");
  }
  return response.json();
}

// Extend the schema with more validations and add userId
const formSchema = insertVoteSchema.extend({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  userId: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function VotingForm({ onSubmitSuccess, onError }: VotingFormProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(FORM_STEPS.PERSONAL_DETAILS);
  const [districts, setDistricts] = useState<string[]>([]);
  const [localGovernments, setLocalGovernments] = useState<string[]>([]);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(true);
  const [isLoadingLocalGovs, setIsLoadingLocalGovs] = useState(false);
  const [fetchError, setFetchError] = useState("");
  
  // Use react-hook-form with zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      nic: "",
      district: "",
      localGovernment: "",
      party: "npp", // Default selection
      userId: user?.uid || "",
    },
  });

  // Update userId when user changes
  useEffect(() => {
    if (user?.uid) {
      form.setValue("userId", user.uid);
    }
  }, [user, form]);

  // Load districts from API
  useEffect(() => {
    async function loadDistricts() {
      setIsLoadingDistricts(true);
      setFetchError("");
      try {
        // In a real implementation, we would fetch from API
        // For now, hardcode some districts
        const districtsList = [
          "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", 
          "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
          "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
          "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
          "Monaragala", "Ratnapura", "Kegalle"
        ];
        setDistricts(districtsList);
      } catch (error) {
        console.error("Failed to load districts:", error);
        setFetchError("Failed to load districts. Please try again.");
      } finally {
        setIsLoadingDistricts(false);
      }
    }

    loadDistricts();
  }, []);

  // Load local governments when district changes
  const handleDistrictChange = async (district: string) => {
    form.setValue("district", district);
    form.setValue("localGovernment", ""); // Reset local government
    
    if (!district) return;
    
    setIsLoadingLocalGovs(true);
    setFetchError("");
    
    try {
      // In a real implementation, we would fetch from API based on district
      // For now, hardcode some local governments for demo
      const localGovMap: Record<string, string[]> = {
        "Colombo": [
          "Colombo Municipal Council", 
          "Dehiwala-Mount Lavinia Municipal Council", 
          "Sri Jayawardenepura Kotte Municipal Council",
          "Kaduwela Municipal Council",
          "Moratuwa Municipal Council",
          "Kolonnawa Urban Council"
        ],
        "Gampaha": [
          "Gampaha Municipal Council",
          "Negombo Municipal Council",
          "Wattala-Mabole Urban Council",
          "Ja-Ela Urban Council"
        ],
        "Kandy": [
          "Kandy Municipal Council",
          "Wattegama Urban Council",
          "Kadugannawa Urban Council",
          "Gampola Urban Council"
        ]
      };
      
      const localGovs = localGovMap[district] || [];
      setLocalGovernments(localGovs);
    } catch (error) {
      console.error("Failed to load local governments:", error);
      setFetchError("Failed to load local governments. Please try again.");
    } finally {
      setIsLoadingLocalGovs(false);
    }
  };

  // Submit mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/vote", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/results"] });
      onSubmitSuccess();
    },
    onError: (error: Error) => {
      console.error("Vote submission error:", error);
      onError(error.message || "Failed to submit your vote. Please try again.");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  // Navigate between form steps
  const goToStep = (newStep: number) => {
    // Validate current step before proceeding
    if (newStep > step) {
      switch (step) {
        case FORM_STEPS.PERSONAL_DETAILS:
          form.trigger(["fullName", "mobileNumber", "nic"]).then((isValid) => {
            if (isValid) setStep(newStep);
          });
          break;
        case FORM_STEPS.LOCATION:
          form.trigger(["district", "localGovernment"]).then((isValid) => {
            if (isValid) setStep(newStep);
          });
          break;
        default:
          setStep(newStep);
      }
    } else {
      // Going back doesn't need validation
      setStep(newStep);
    }
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Pre-Election Survey Form</h3>
        
        {/* Form Steps Progress */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${step >= FORM_STEPS.PERSONAL_DETAILS ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center ${step >= FORM_STEPS.PERSONAL_DETAILS ? 'text-white' : 'text-gray-500'} font-medium mr-2`}>1</div>
            <div className={`border-t-2 ${step >= FORM_STEPS.LOCATION ? 'border-primary' : 'border-gray-200'} flex-grow`}></div>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${step >= FORM_STEPS.LOCATION ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center ${step >= FORM_STEPS.LOCATION ? 'text-white' : 'text-gray-500'} font-medium mx-2`}>2</div>
            <div className={`border-t-2 ${step >= FORM_STEPS.VOTING ? 'border-primary' : 'border-gray-200'} flex-grow`}></div>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${step >= FORM_STEPS.VOTING ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center ${step >= FORM_STEPS.VOTING ? 'text-white' : 'text-gray-500'} font-medium ml-2`}>3</div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Details</span>
            <span>Location</span>
            <span>Voting Preference</span>
          </div>
        </div>
        
        {fetchError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{fetchError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === FORM_STEPS.PERSONAL_DETAILS && (
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="07X XXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National Identity Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="XXXXXXXXXV or XXXXXXXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={() => goToStep(FORM_STEPS.LOCATION)}
                    className="flex items-center"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Location Information */}
            {step === FORM_STEPS.LOCATION && (
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <Select 
                        disabled={isLoadingDistricts}
                        onValueChange={(value) => handleDistrictChange(value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="localGovernment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local Government</FormLabel>
                      <Select 
                        disabled={isLoadingLocalGovs || !form.watch("district")}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select local government" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {localGovernments.map((lg) => (
                            <SelectItem key={lg} value={lg}>{lg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => goToStep(FORM_STEPS.PERSONAL_DETAILS)}
                    className="flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => goToStep(FORM_STEPS.VOTING)}
                    className="flex items-center"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Voting Preference */}
            {step === FORM_STEPS.VOTING && (
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Select your preferred party</h4>
                
                <FormField
                  control={form.control}
                  name="party"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-4"
                        >
                          {PARTIES.map((party) => (
                            <label 
                              key={party.id}
                              className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200"
                            >
                              <RadioGroupItem 
                                value={party.id}
                                id={party.id}
                                className="h-5 w-5 text-primary"
                              />
                              <div className="flex items-center ml-3">
                                <div className={`flex-shrink-0 h-12 w-12 ${party.color} rounded-full flex items-center justify-center`}>
                                  <svg 
                                    className="h-8 w-8" 
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
                                  </svg>
                                </div>
                                <span className="ml-3 font-medium text-gray-700">{party.name}</span>
                              </div>
                            </label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => goToStep(FORM_STEPS.LOCATION)}
                    className="flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent/90"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit Vote"}
                  </Button>
                </div>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>Your response will be kept confidential and used only for statistical purposes.</p>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
