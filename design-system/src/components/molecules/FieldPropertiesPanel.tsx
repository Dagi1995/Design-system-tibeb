import React from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../atoms/Select';
import { Checkbox } from '../atoms/Checkbox';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';
import * as SelectPrimitive from '@radix-ui/react-select'; // Import Radix UI Select for type safety

type InputType = 'text' | 'select' | 'number' | 'checkbox' | 'textarea';

interface FieldProperty {
  label: string;
  name: string;
  type: InputType;
  value: any;
  options?: { label: string; value: string }[];
  required?: boolean;
  onChange: (name: string, value: any) => void;
}

interface FieldPropertiesPanelProps {
  properties: FieldProperty[];
  title: string;
}

export const FieldPropertiesPanel: React.FC<FieldPropertiesPanelProps> = ({
  properties,
  title = 'Field Properties',
}) => {
  const renderPropertyInput = (prop: FieldProperty) => {
    switch (prop.type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={prop.type}
            value={prop.value || ''}
            onChange={(e) => prop.onChange(prop.name, e.target.value)}
            className="w-full"
            required={prop.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={prop.value || ''}
            onChange={(e) => prop.onChange(prop.name, e.target.value)}
            className="w-full min-h-[80px]"
            required={prop.required}
          />
        );
      case 'select':
        return (
          <Select
            value={prop.value}
            onValueChange={(value: string) => prop.onChange(prop.name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id={prop.name}
              checked={!!prop.value}
              onCheckedChange={(checked) => prop.onChange(prop.name, checked)}
            />
            {prop.required && <span className="text-red-500">*</span>}
          </div>
        );
      default:
        return null;
    }
  };

  if (properties.length === 0) {
    return (
      <div className="w-80 border-l border-gray-200 h-full overflow-y-auto p-4 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Select a field to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-gray-200 h-full overflow-y-auto overflow-x-hidden bg-white">
      <div className="sticky top-0 bg-white  px-4 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      
      <div className="px-4 space-y-6">
        {properties.map((prop) => (
          <div key={prop.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={prop.name} className="text-sm font-medium text-gray-700">
                {prop.label}
                {prop.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {prop.name === 'option' && (
                <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-800">
                  Add Option
                </Button>
              )}
            </div>
            <div className={prop.type === 'checkbox' ? '' : 'mt-1'}>
              {renderPropertyInput(prop)}
            </div>
            {prop.name === 'defaultValue' && prop.value && (
              <p className="mt-1 text-xs text-gray-500">
                Default value: {prop.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldPropertiesPanel;