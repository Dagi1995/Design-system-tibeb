/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
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

// Import your custom components
import { TextEditor } from "./TextEditor";
import FileUploadCompact from "../molecules/FileUploadCompact";
import { PhoneInput } from "../molecules/PhoneInput";
import { BirthdateInput } from "../molecules/DateInput";

// ---------------- Types ----------------

interface BaseField {
  name: string;
  label: string;
  tooltip?: string;
  layout?: { span?: number };
  collapsible?: boolean;
  collapsibleLabel?: string;
}

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

interface TextEditorField extends BaseField {
  type: "textEditor";
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  showSubmitButton?: boolean;
  submitButtonText?: string;
}

interface FileUploadField extends BaseField {
  type: "fileUpload";
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

interface PhoneField extends BaseField {
  type: "phone";
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  countryCode?: string;
}

interface DateField extends BaseField {
  type: "date";
  placeholder?: string;
  defaultValue?: Date;
  required?: boolean;
  disabled?: boolean;
  description?: string;
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
  | TextEditorField
  | FileUploadField
  | PhoneField
  | DateField
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

export type TabConfig = {
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
  hideBuiltInButtons?: boolean;
}

export interface DetailPageRef {
  getFormData: () => Record<string, any>;
}

// ---------------- Component ----------------

export const DetailPage = forwardRef<DetailPageRef, DetailPageProps>(
  (
    {
      tabs,
      onSave,
      onCancel,
      title,
      initialData = {},
      hideBuiltInButtons = false,
    },
    ref
  ) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData);
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);
    const [dynamicOptions, setDynamicOptions] = useState<
      Record<string, string[]>
    >({});
    const [newOptionInputs, setNewOptionInputs] = useState<
      Record<string, string>
    >({});
    const [isDialogOpen, setIsDialogOpen] = useState<Record<string, boolean>>(
      {}
    );
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>(
      {}
    );

    // Expose form data via ref
    useImperativeHandle(ref, () => ({
      getFormData: () => formData,
    }));

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

    const handleFileUploadChange = (fieldName: string, files: any[]) => {
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: files }));
      handleInputChange(fieldName, files);
    };

    // ---------------- Field Renderer ----------------

    const renderFieldContent = (field: Field) => {
      const withTooltip = (element: React.ReactNode) => (
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-2">{element}</div>
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
      );

      switch (field.type) {
        case "input":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <Input
                className="w-full"
                placeholder={field.placeholder}
                value={formData[field.name] ?? field.defaultValue ?? ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
                disabled={field.disabled}
              />
            </div>
          );
        case "number":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <Input
                className="w-full"
                type="number"
                placeholder={field.placeholder}
                value={formData[field.name] ?? field.defaultValue ?? ""}
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
        case "checkbox":
          return withTooltip(
            <div className="flex items-center gap-2 w-full">
              <Checkbox
                id={field.name}
                checked={formData[field.name] ?? field.defaultValue ?? false}
                onCheckedChange={(checked) =>
                  handleInputChange(field.name, checked)
                }
                disabled={field.disabled}
              />
              <label
                htmlFor={field.name}
                className="text-sm font-medium leading-none"
              >
                {field.label}
              </label>
            </div>
          );
        case "select":
          const allOptions = [
            ...field.options,
            ...(dynamicOptions[field.name] || []),
          ];
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">{field.label}</label>
              <Select
                value={formData[field.name] ?? field.defaultValue ?? ""}
                onValueChange={(value) => handleInputChange(field.name, value)}
                disabled={field.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {allOptions.map((opt, idx) => (
                    <SelectItem key={`${field.name}-${opt}-${idx}`} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                  {field.addable && (
                    <div
                      className="relative flex cursor-default items-center py-1.5 pl-2 pr-8 text-sm hover:bg-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDialogOpen((prev) => ({
                          ...prev,
                          [field.name]: true,
                        }));
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add new option
                    </div>
                  )}
                </SelectContent>
              </Select>
              {field.addable && (
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
              )}
            </div>
          );
        case "textEditor":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <TextEditor
                content={formData[field.name] ?? field.defaultValue ?? ""}
                onChange={(content) => handleInputChange(field.name, content)}
                placeholder={field.placeholder}
                showSubmitButton={field.showSubmitButton}
                submitButtonText={field.submitButtonText}
              />
            </div>
          );
        case "fileUpload":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <FileUploadCompact
                maxFiles={field.maxFiles || 3}
                maxSize={field.maxSize || 2 * 1024 * 1024}
                accept={field.accept}
                multiple={field.multiple}
                onFilesChange={(files) =>
                  handleFileUploadChange(field.name, files)
                }
              />
            </div>
          );
        case "phone":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <PhoneInput
                placeholder={field.placeholder}
                value={formData[field.name] ?? field.defaultValue ?? ""}
                onChange={(value) => handleInputChange(field.name, value)}
                disabled={field.disabled}
              />
            </div>
          );
        case "date":
          return withTooltip(
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                {field.label}
                {field.required && " *"}
              </label>
              <BirthdateInput
                placeholder={field.placeholder}
                onChange={(date) => handleInputChange(field.name, date)}
                description={field.description}
              />
            </div>
          );
        case "custom":
          return (
            <div key={field.name} className="w-full">
              {field.component}
            </div>
          );
        default:
          return null;
      }
    };

    const renderField = (field: Field) =>
      field.collapsible ? (
        <Collapsible
          key={`field-${field.name}`}
          defaultOpen={false}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-left border rounded-md bg-muted/30">
            <span className="font-medium">
              {field.collapsibleLabel || field.label}
            </span>
            <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 pl-4">
            {renderFieldContent(field)}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div key={`field-${field.name}`}>{renderFieldContent(field)}</div>
      );

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

    const renderSectionContent = (section: Section) => (
      <div className={`grid ${getGridColsClass(section.columns)} gap-4`}>
        {section.fields.map((field) => renderField(field))}

        {section.collapsibleGroups?.map((group, idx) => (
          <Collapsible
            key={`group-${section.title}-${group.title}-${idx}`}
            className="col-span-full space-y-2"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full px-0 py-5 text-left rounded bg-muted/40">
              <span className="font-medium">{group.title}</span>
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={`mt-2 grid ${getGridColsClass(
                section.columns
              )} gap-4 pl-4`}
            >
              {group.fields.map((field) => renderField(field))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );

    return (
      <TooltipProvider>
        <div className="flex flex-col h-full bg-background rounded-2xl">
          {title && (
            <h1 className="text-2xl font-bold mb-6 px-6 pt-4">{title}</h1>
          )}

          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full flex-grow flex flex-col py-4"
          >
            <div className="px-6">
              <TabsList className="w-full overflow-x-auto">
                {tabs.map((tab) => (
                  <TabsTrigger key={`tab-${tab.id}`} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-grow overflow-auto p-6">
              {tabs.map((tab) => (
                <TabsContent
                  key={`tab-content-${tab.id}`}
                  value={tab.id}
                  className="space-y-6"
                >
                  {tab.sections.map((section, sIdx) => (
                    <Card key={`section-${tab.id}-${section.title}-${sIdx}`}>
                      {section.collapsible ? (
                        <Collapsible defaultOpen>
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
                              {renderSectionContent(section)}
                            </CollapsibleContent>
                          </CardContent>
                        </Collapsible>
                      ) : (
                        <CardContent>
                          {renderSectionContent(section)}
                        </CardContent>
                      )}
                      {!hideBuiltInButtons && (onSave || onCancel) && (
                        <div className="flex justify-end gap-2 pr-4 pt-10">
                          {onCancel && (
                            <Button variant="outline" onClick={onCancel}>
                              Cancel
                            </Button>
                          )}
                          {onSave && (
                            <Button onClick={() => onSave(formData)}>
                              Save
                            </Button>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </TooltipProvider>
    );
  }
);

DetailPage.displayName = "DetailPage";
