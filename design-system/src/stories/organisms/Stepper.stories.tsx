// Stepper.stories.tsx
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperContent,
  StepperNav,
  StepperPanel,
} from "../../components/organisms/Stepper";
import { Button } from "../../components/atoms/Button";
import {
  BookUser,
  Check,
  CreditCard,
  ListTodo,
  LoaderCircleIcon,
  LockKeyhole,
} from "lucide-react";
import { Badge } from "../../components/atoms/Badge";

const meta: Meta<typeof Stepper> = {
  title: "Design-System/Components/Organisms/Stepper",
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// --- Horizontal with icons and badges ---
export const HorizontalWithIcons: Story = {
  render: () => {
    const steps = [
      { title: "User Details", icon: BookUser },
      { title: "Payment Info", icon: CreditCard },
      { title: "Auth OTP", icon: LockKeyhole },
      { title: "Preview Form", icon: ListTodo },
    ];
    const [currentStep, setCurrentStep] = useState(2);

    return (
      <Stepper
        value={currentStep}
        onValueChange={setCurrentStep}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-8"
      >
        <StepperNav className="gap-3 mb-5">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger
                className="flex flex-col items-start justify-center gap-2.5 grow"
                asChild
              >
                <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                  <step.icon className="size-4" />
                </StepperIndicator>
                <div className="flex flex-col items-start gap-1">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Step {index + 1}
                  </div>
                  <StepperTitle className="text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                    {step.title}
                  </StepperTitle>
                  <div>
                    <Badge
                      variant="default"
                      size="sm"
                      appearance="light"
                      className="hidden group-data-[state=active]/step:inline-flex"
                    >
                      In Progress
                    </Badge>
                    <Badge
                      variant="success"
                      size="sm"
                      appearance="light"
                      className="hidden group-data-[state=completed]/step:inline-flex"
                    >
                      Completed
                    </Badge>
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground"
                    >
                      Pending
                    </Badge>
                  </div>
                </div>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              Step {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>

        <div className="flex items-center justify-between gap-2.5">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
        </div>
      </Stepper>
    );
  },
};

// --- Simple horizontal stepper ---
export const HorizontalSimple: Story = {
  render: () => {
    const steps = [
      { title: "Step 1" },
      { title: "Step 2" },
      { title: "Step 3" },
    ];
    return (
      <Stepper
        defaultValue={2}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-8"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              Step {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    );
  },
};

// --- Vertical stepper ---
export const Vertical: Story = {
  render: () => {
    const steps = [1, 2, 3];
    return (
      <div className="flex items-center justify-center">
        <Stepper
          className="flex flex-col items-center justify-center gap-10"
          defaultValue={2}
          orientation="vertical"
          indicators={{
            completed: <Check className="size-4" />,
            loading: <LoaderCircleIcon className="size-4 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((step) => (
              <StepperItem key={step} step={step} loading={step === 2}>
                <StepperTrigger>
                  <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                    {step}
                  </StepperIndicator>
                </StepperTrigger>
                {steps.length > step && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
                )}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel className="text-sm w-56 text-center">
            {steps.map((step) => (
              <StepperContent key={step} value={step}>
                Step {step} content
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </div>
    );
  },
};
