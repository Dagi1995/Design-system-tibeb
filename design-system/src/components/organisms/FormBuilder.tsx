import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../atoms/Table';
import { FieldPropertiesPanel } from '../molecules/FieldPropertiesPanel';
import { Plus, Search, Save, Trash2, Pencil } from 'lucide-react';

type FieldType = 'Text' | 'Number' | 'Date' | 'Select' | 'Option'| 'Checkbox' | 'Email' | 'Phone' | 'URL' | 'Custom';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  mandatory: boolean;
  readOnly: boolean;
  foreignKey?: string;
  defaultValue?: string;
  description?: string;
  isActive?: boolean;
}

interface FormBuilderProps {
  initialFields: FormField[];
  fieldTypes: { value: FieldType; label: string }[];
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ initialFields, fieldTypes }) => {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const handleAddField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      name: `field_${fields.length + 1}`,
      label: `Field ${fields.length + 1}`,
      type: fieldTypes[0]?.value || 'Text', // Default to first field type
      mandatory: false,
      readOnly: false,
      isActive: false,
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
    setSelectedFieldId(newField.id);
    setIsSidebarOpen(true);
  };

  const handleDeleteField = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFields = fields.filter(field => field.id !== id);
    setFields(newFields);
    if (selectedField?.id === id) {
      setSelectedField(null);
      setSelectedFieldId(null);
      setIsSidebarOpen(false);
    }
  };

  const handleFieldSelect = (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      setSelectedField(field);
      setSelectedFieldId(id);
      setIsSidebarOpen(true);
    }
  };

  const handlePropertyChange = (property: keyof FormField, value: any) => {
    if (!selectedField) return;
    
    const updatedField = {
      ...selectedField,
      [property]: value,
    };
    
    setFields(fields.map(field => 
      field.id === selectedField.id ? updatedField : field
    ));
    
    setSelectedField(updatedField);
  };

  const fieldProperties = selectedField ? [
    {
      label: 'Field Name',
      name: 'name',
      type: 'text' as const,
      value: selectedField.name,
      onChange: (name: string, value: string) => handlePropertyChange('name', value),
      required: true,
    },
    {
      label: 'Label',
      name: 'label',
      type: 'text' as const,
      value: selectedField.label,
      onChange: (name: string, value: string) => handlePropertyChange('label', value),
      required: true,
    },
    {
      label: 'Type',
      name: 'type',
      type: 'select' as const,
      value: selectedField.type,
      options: fieldTypes,
      onChange: (name: string, value: FieldType) => handlePropertyChange('type', value),
    },
    {
      label: 'Mandatory',
      name: 'mandatory',
      type: 'checkbox' as const,
      value: selectedField.mandatory,
      onChange: (name: string, value: boolean) => handlePropertyChange('mandatory', value),
    },
    {
      label: 'Read Only',
      name: 'readOnly',
      type: 'checkbox' as const,
      value: selectedField.readOnly,
      onChange: (name: string, value: boolean) => handlePropertyChange('readOnly', value),
    },
    {
      label: 'Default Value',
      name: 'defaultValue',
      type: 'text' as const,
      value: selectedField.defaultValue || '',
      onChange: (name: string, value: string) => handlePropertyChange('defaultValue', value),
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea' as const,
      value: selectedField.description || '',
      onChange: (name: string, value: string) => handlePropertyChange('description', value),
    },
  ] : [];

  const filteredFields = fields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFieldTypeLabel = (type: FieldType) => {
    const typeMap: Record<FieldType, string> = {
      'Text': 'Text',
      'Number': 'Number',
      'Email': 'Email',
      'Select': 'Dropdown',
      'Option': 'Option',
      'Checkbox': 'Checkbox',
      'Date': 'Date',
      'Phone': 'Phone',
      'URL': 'URL',
      'Custom': 'Custom',
    };
    return typeMap[type] || type;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'mr-80' : ''} transition-all duration-300`}>


        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Form Fields</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search fields..."
                        className="pl-8 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button size="sm">Save</Button>
                  </div>
                </div>

                {filteredFields.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field Name</TableHead>
                          <TableHead>Label</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-center">Required</TableHead>
                          <TableHead className="text-center">Read Only</TableHead>
                          <TableHead>Default Value</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFields.map((field) => (
                          <TableRow 
                            key={field.id} 
                            className={`cursor-pointer hover:bg-gray-50 ${selectedFieldId === field.id ? 'bg-blue-50' : ''}`}
                            onClick={() => handleFieldSelect(field.id)}
                          >
                            <TableCell className="font-medium">{field.name}</TableCell>
                            <TableCell>{field.label}</TableCell>
                            <TableCell>{getFieldTypeLabel(field.type)}</TableCell>
                            <TableCell className="text-center">
                              {field.mandatory ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  No
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {field.readOnly ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  No
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {field.defaultValue || '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFieldSelect(field.id);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                                  onClick={(e) => handleDeleteField(field.id, e)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    {searchTerm ? (
                      <div className="text-gray-500">No fields match your search.</div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No fields added</h3>
                        <p className="text-sm text-gray-500 max-w-md">
                          Get started by adding your first field to the form.
                        </p>
                        <Button onClick={handleAddField}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Field
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            </div>
            <div className='flex justify-end '>
                      <Button size="sm" onClick={handleAddField}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Field
                      </Button>
                    </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && selectedField && (
        <div className="w-80 border-l border-gray-200 bg-white h-full overflow-y-auto shadow-lg fixed right-0 top-0 bottom-0">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">Field Properties</h3>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <FieldPropertiesPanel
              properties={fieldProperties}
              title=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;