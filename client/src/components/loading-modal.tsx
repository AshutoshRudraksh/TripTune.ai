import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoadingModal({ isOpen, onClose }: LoadingModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Searching flights...", icon: "fa-plane", completed: false },
    { label: "Finding best hotels...", icon: "fa-hotel", completed: false },
    { label: "Checking weather forecasts...", icon: "fa-cloud-sun", completed: false },
    { label: "Generating personalized itinerary...", icon: "fa-magic", completed: false },
  ];

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          const stepIndex = Math.floor(newProgress / 25);
          setCurrentStep(stepIndex);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(onClose, 500);
            return 100;
          }
          
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-loading">
        <div className="text-center p-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-plane text-primary text-2xl loading-plane"></i>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Creating Your Perfect Trip</h3>
            <p className="text-muted-foreground">AI is analyzing thousands of options...</p>
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                  index < currentStep 
                    ? 'bg-green-500' 
                    : index === currentStep 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-muted'
                }`}>
                  {index < currentStep ? (
                    <i className="fas fa-check text-white text-xs"></i>
                  ) : index === currentStep ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-spin"></div>
                  ) : null}
                </div>
                <span className={`flex-1 text-left ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {index < currentStep && (
                  <i className="fas fa-check text-green-500 ml-auto"></i>
                )}
                {index === currentStep && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-auto"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{width: `${progress}%`}}
              data-testid="progress-bar"
            ></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
