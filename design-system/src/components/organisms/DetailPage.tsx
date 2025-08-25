/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DetailPage.tsx
"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../atoms/Tabs";
import { Input } from "../atoms/Input";
import { Checkbox } from "../atoms/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/Select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../atoms/Collapsible";
import { Button } from "../atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../molecules/Dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../atoms/Tooltip";
import { HelpCircle, ChevronDown, Plus } from "lucide-react";

// Base field type
interface BaseField {
  name: string;
  label: string;
  tooltip?: string;
  layout?: { span?: number };
}

// Field types
interface InputField extends BaseField {
  type: "input";
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
  defaultValue?: number;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue?: boolean;
  disabled?: boolean;
}

interface SelectField extends BaseField {
  type: "select";
  options: string[];
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  addable?: boolean;
  onAddOption?: (newOption: string) => void;
}

interface CustomField extends BaseField {
  type: "custom";
  component: React.ReactNode;
}

type Field =
  | InputField
  | NumberField
  | CheckboxField
  | SelectField
  | CustomField;

interface CollapsibleGroup {
  title: string;
  fields: Field[];
}

interface Section {
  title: string;
  columns?: 1 | 2 | 3 | 4;
  collapsible?: boolean;
  fields: Field[];
  collapsibleGroups?: CollapsibleGroup[];
}

type TabConfig = {
  id: string;
  label: string;
  sections: Section[];
};

interface DetailPageProps {
  tabs: TabConfig[];
  onSave?: (data: Record<string, any>) => void;
  onCancel?: () => void;
  title?: string;
  initialData?: Record<string, any>;
}

export function DetailPage({
  tabs,
  onSave,
  onCancel,
  title,
  initialData = {},
}: DetailPageProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, string[]>
  >({});
  const [newOptionInputs, setNewOptionInputs] = useState<
    Record<string, string>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState<Record<string, boolean>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOption = (fieldName: string, newOption: string) => {
    if (!newOption.trim()) return;
    setDynamicOptions((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), newOption.trim()],
    }));
    setNewOptionInputs((prev) => ({ ...prev, [fieldName]: "" }));
    setIsDialogOpen((prev) => ({ ...prev, [fieldName]: false }));
  };

  const openAddOptionDialog = (fieldName: string) => {
    setIsDialogOpen((prev) => ({ ...prev, [fieldName]: true }));
  };

  // Type guards
  const isInputField = (field: Field): field is InputField =>
    field.type === "input";
  const isNumberField = (field: Field): field is NumberField =>
    field.type === "number";
  const isCheckboxField = (field: Field): field is CheckboxField =>
    field.type === "checkbox";
  const isSelectField = (field: Field): field is SelectField =>
    field.type === "select";
  const isCustomField = (field: Field): field is CustomField =>
    field.type === "custom";

  const renderField = (field: Field) => {
    const fieldWithTooltip = (element: React.ReactNode) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {element}
          {field.tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{field.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    );

    if (isInputField(field)) {
      return fieldWithTooltip(
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            {field.label}
            {field.required && " *"}
          </label>
          <Input
            placeholder={field.placeholder}
            value={formData[field.name] || field.defaultValue || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            disabled={field.disabled}
          />
        </div>
      );
    }

    if (isNumberField(field)) {
      return fieldWithTooltip(
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            {field.label}
            {field.required && " *"}
          </label>
          <Input
            type="number"
            placeholder={field.placeholder}
            value={formData[field.name] || field.defaultValue || ""}
            onChange={(e) =>
              handleInputChange(field.name, parseFloat(e.target.value) || 0)
            }
            required={field.required}
            disabled={field.disabled}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        </div>
      );
    }

    if (isCheckboxField(field)) {
      return fieldWithTooltip(
        <div className="flex items-center gap-2">
          <Checkbox
            id={field.name}
            checked={formData[field.name] || field.defaultValue || false}
            onCheckedChange={(checked) =>
              handleInputChange(field.name, checked)
            }
            disabled={field.disabled}
          />
          <label
            htmlFor={field.name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {field.label}
          </label>
        </div>
      );
    }

    if (isSelectField(field)) {
      const allOptions = [
        ...field.options,
        ...(dynamicOptions[field.name] || []),
      ];

      const selectElement = fieldWithTooltip(
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            {field.label}
            {field.required && " *"}
          </label>
          <Select
            value={formData[field.name] || field.defaultValue || ""}
            onValueChange={(value) => handleInputChange(field.name, value)}
            disabled={field.disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {allOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
              {field.addable && (
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    openAddOptionDialog(field.name);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add new option
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      );

      if (field.addable) {
        return (
          <div className="flex flex-col gap-2">
            {selectElement}
            <Dialog
              open={isDialogOpen[field.name]}
              onOpenChange={(open) =>
                setIsDialogOpen((prev) => ({ ...prev, [field.name]: open }))
              }
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Option</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      New Option
                    </label>
                    <Input
                      placeholder="Enter new option"
                      value={newOptionInputs[field.name] || ""}
                      onChange={(e) =>
                        setNewOptionInputs((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button
                    onClick={() =>
                      handleAddOption(
                        field.name,
                        newOptionInputs[field.name] || ""
                      )
                    }
                    disabled={!newOptionInputs[field.name]?.trim()}
                  >
                    Add Option
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      }

      return selectElement;
    }

    if (isCustomField(field)) {
      return <div key={field.name}>{field.component}</div>;
    }

    return null;
  };

  const getGridColsClass = (columns: number = 2) => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-background">
        {title && (
          <h1 className="text-2xl font-bold mb-6 px-6 pt-4">{title}</h1>
        )}

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex-grow flex flex-col"
        >
          <div className="px-6">
            <TabsList className="w-full overflow-x-auto">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-grow overflow-auto p-6">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                {tab.sections.map((section) => (
                  <Card key={section.title}>
                    {section.collapsible ? (
                      <Collapsible defaultOpen={true}>
                        <CardHeader className="pb-3">
                          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                            <CardTitle className="text-lg">
                              {section.title}
                            </CardTitle>
                            <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CardContent>
                          <CollapsibleContent>
                            <div
                              className={`grid ${getGridColsClass(
                                section.columns
                              )} gap-4`}
                            >
                              {section.fields.map(renderField)}
                            </div>

                            {/* Nested collapsible groups inside section */}
                            {section.collapsibleGroups?.map((group, i) => (
                              <Collapsible key={i}>
                                <CollapsibleTrigger className="font-medium cursor-pointer mt-4 flex items-center justify-between w-full text-left">
                                  {group.title}
                                  <ChevronDown className="flex flex-row justify-between h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="grid gap-4 mt-2">
                                  {group.fields.map(renderField)}
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </CollapsibleContent>
                        </CardContent>
                      </Collapsible>
                    ) : (
                      <CardContent>
                        <div
                          className={`grid ${getGridColsClass(
                            section.columns
                          )} gap-4`}
                        >
                          {section.fields.map(renderField)}
                        </div>
                        {section.collapsibleGroups?.map((group, i) => (
                          <Collapsible key={i}>
                            <CollapsibleTrigger className="font-medium cursor-pointer mt-4">
                              {group.title}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="grid gap-4 mt-2">
                              {group.fields.map(renderField)}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {(onSave || onCancel) && (
          <div className="flex justify-end gap-2 p-6 border-t">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            {onSave && <Button onClick={() => onSave(formData)}>Save</Button>}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
