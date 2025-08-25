import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { MoreHorizontal, GripVertical, X, Plus, ChevronDown } from 'lucide-react';

interface FormFieldProps {
  label?: string;
  type: string;
  name: string;
  onDelete?: () => void;
  onAdd?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  isActive?: boolean;
  onFieldClick?: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  onDelete,
  onAdd,
  onMove,
  isActive = false,
  onFieldClick,
}) => {
  return (
    <div 
      className={`p-3 border rounded-md mb-2 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
      onClick={onFieldClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
          <Label className="text-sm font-medium">{label || 'No Label'}</Label>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onDelete}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input 
          value={type} 
          readOnly 
          className="flex-1 text-sm h-8"
        />
      </div>
    </div>
  );
};

export default FormField;
