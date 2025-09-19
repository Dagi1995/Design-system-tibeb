// design-system/src/stories/organisms/DetailPage.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../components/atoms/Button";
import { TooltipProvider } from "../../components/atoms/Tooltip";
import { DetailPage } from "../../components/organisms/DetailPage";

interface BaseField {
  name: string;
  label: string;
  tooltip?: string;
}

interface InputField extends BaseField {
  type: "input";
  defaultValue?: string;
  required?: boolean;
}

interface NumberField extends BaseField {
  type: "number";
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue?: boolean;
}

interface SelectField extends BaseField {
  type: "select";
  options: string[];
  defaultValue?: string;
  addable?: boolean;
}

interface TextEditorField extends BaseField {
  type: "textEditor";
  defaultValue?: string;
  required?: boolean;
  showSubmitButton?: boolean;
  submitButtonText?: string;
  placeholder?: string;
}

interface FileUploadField extends BaseField {
  type: "fileUpload";
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

interface PhoneField extends BaseField {
  type: "phone";
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

interface DateField extends BaseField {
  type: "date";
  defaultValue?: Date;
  required?: boolean;
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

interface TabConfig {
  id: string;
  label: string;
  sections: Section[];
}

const meta: Meta<typeof DetailPage> = {
  title: "Design-system/Components/Organisms/DetailPage",
  component: DetailPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `DetailPage` component is a dynamic form builder with support for tabs, collapsible sections, fields, and even custom React components. Below are different usage examples.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailPage>;

/* --------------------------------
   1. Minimal Example
-------------------------------- */
export const MinimalWithTabs: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "basic",
        label: "Basic",
        sections: [
          {
            title: "Basic Info",
            columns: 2,
            fields: [
              {
                type: "input",
                name: "name",
                label: "Product Name",
                defaultValue: "Sample Product",
              },
              {
                type: "checkbox",
                name: "isActive",
                label: "Is Active?",
                defaultValue: true,
              },
            ],
          },
        ],
      },
      {
        id: "details",
        label: "Details",
        sections: [
          {
            title: "More Info",
            columns: 2,
            fields: [
              {
                type: "number",
                name: "stock",
                label: "Stock Qty",
                defaultValue: 100,
              },
              {
                type: "select",
                name: "category",
                addable: true,
                label: "Category",
                options: ["Electronics", "Furniture", "Toys"],
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Minimal Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   2. Collapsible Section with Groups
-------------------------------- */
export const CollapsibleWithGroups: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "general",
        label: "General",
        sections: [
          {
            title: "General Settings",
            collapsible: true,
            columns: 2,
            fields: [
              {
                type: "input",
                name: "title",
                label: "Title",
                defaultValue: "Super Widget",
              },
              {
                type: "select",
                name: "category",
                label: "Category",
                options: ["Electronics", "Furniture", "Toys"],
              },
            ],
            collapsibleGroups: [
              {
                title: "Advanced Settings",
                fields: [
                  {
                    type: "number",
                    name: "price",
                    label: "Price",
                    defaultValue: 199,
                  },
                  {
                    type: "checkbox",
                    name: "discount",
                    label: "Allow Discount?",
                    defaultValue: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Collapsible Section + Groups"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   3. Non-Collapsible Section with Groups
-------------------------------- */
export const NonCollapsibleWithGroups: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "inventory",
        label: "Inventory",
        sections: [
          {
            title: "Stock Info (Always Open)",
            collapsible: false,
            columns: 2,
            fields: [
              {
                type: "number",
                name: "minQty",
                label: "Minimum Qty",
                defaultValue: 1,
              },
              {
                type: "number",
                name: "maxQty",
                label: "Maximum Qty",
                defaultValue: 500,
              },
            ],
            collapsibleGroups: [
              {
                title: "Warehouse Settings",
                fields: [
                  {
                    type: "checkbox",
                    name: "trackStock",
                    label: "Track Stock?",
                    defaultValue: true,
                  },
                  {
                    type: "checkbox",
                    name: "backOrder",
                    label: "Allow Back Order?",
                    defaultValue: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Non-Collapsible Section + Groups"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   4. With Custom Component Field
-------------------------------- */
export const WithCustomComponent: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "custom",
        label: "Custom",
        sections: [
          {
            title: "Custom Fields",
            columns: 1,
            fields: [
              {
                type: "custom",
                name: "extraInfo",
                label: "Extra Info",
                component: (
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Custom Component</h3>
                    <p className="text-sm text-muted-foreground">
                      You can inject any React component here.
                    </p>
                    <Button size="sm" variant="secondary">
                      Click Me
                    </Button>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Custom Component Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   5. Three Column Layout
-------------------------------- */
export const ThreeColumns: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "layout3",
        label: "3-Column",
        sections: [
          {
            title: "Three Column Form",
            columns: 3,
            fields: [
              {
                type: "input",
                name: "firstName",
                label: "First Name",
                defaultValue: "John",
              },
              {
                type: "input",
                name: "lastName",
                label: "Last Name",
                defaultValue: "Doe",
              },
              {
                type: "number",
                name: "age",
                label: "Age",
                defaultValue: 30,
              },
              {
                type: "select",
                name: "gender",
                label: "Gender",
                options: ["Male", "Female", "Other"],
              },
              {
                type: "checkbox",
                name: "subscribe",
                label: "Subscribe to Newsletter?",
                defaultValue: true,
              },
              {
                type: "input",
                name: "city",
                label: "City",
                defaultValue: "New York",
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Three Column Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   6. Four Column Layout
-------------------------------- */
export const FourColumns: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "layout4",
        label: "4-Column",
        sections: [
          {
            title: "Four Column Form",
            columns: 4,
            fields: [
              {
                type: "input",
                name: "col1",
                label: "Column 1",
              },
              {
                type: "input",
                name: "col2",
                label: "Column 2",
              },
              {
                type: "input",
                name: "col3",
                label: "Column 3",
              },
              {
                type: "input",
                name: "col4",
                label: "Column 4",
              },
              {
                type: "number",
                name: "budget",
                label: "Budget",
              },
              {
                type: "checkbox",
                name: "approved",
                label: "Approved?",
              },
              {
                type: "select",
                name: "priority",
                label: "Priority",
                options: ["Low", "Medium", "High"],
                addable: true,
              },
              {
                type: "custom",
                name: "customNote",
                label: "Note",
                component: (
                  <div className="text-xs text-muted-foreground">
                    Custom content
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Four Column Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   7. Complete Example with All Field Types
-------------------------------- */
export const CompleteWithAllFieldTypes: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "basic",
        label: "Basic Info",
        sections: [
          {
            title: "Personal Information",
            columns: 2,
            fields: [
              {
                type: "input",
                name: "firstName",
                label: "First Name",
                defaultValue: "John",
                required: true,
              },
              {
                type: "input",
                name: "lastName",
                label: "Last Name",
                defaultValue: "Doe",
                required: true,
              },
              {
                type: "phone",
                name: "phoneNumber",
                label: "Phone Number",
                placeholder: "Enter phone number",
                required: true,
              },
              {
                type: "date",
                name: "duedate",
                label: "Duedate",
                description: "Select your date",
              },
            ],
          },
        ],
      },
      {
        id: "content",
        label: "Content",
        sections: [
          {
            title: "Rich Content",
            columns: 1,
            fields: [
              {
                type: "textEditor",
                name: "description",
                label: "Description",
                placeholder: "Write a detailed description...",
                showSubmitButton: false,
              },
            ],
          },
        ],
      },
      {
        id: "media",
        label: "Media",
        sections: [
          {
            title: "Files & Media",
            columns: 1,
            fields: [
              {
                type: "fileUpload",
                name: "documents",
                label: "Upload Documents",
                accept: "image/*,.pdf,.doc,.docx",
                multiple: true,
                maxFiles: 5,
                maxSize: 5 * 1024 * 1024, // 5MB
              },
              {
                type: "fileUpload",
                name: "profilePicture",
                label: "Profile Picture",
                accept: "image/*",
                multiple: false,
                maxFiles: 1,
              },
            ],
          },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        sections: [
          {
            title: "Preferences",
            columns: 2,
            fields: [
              {
                type: "select",
                name: "language",
                label: "Language",
                options: ["English", "Spanish", "French", "German"],
                defaultValue: "English",
              },
              {
                type: "select",
                name: "timezone",
                label: "Timezone",
                options: ["EST", "PST", "CST", "MST"],
                addable: true,
              },
              {
                type: "checkbox",
                name: "notifications",
                label: "Enable Notifications",
                defaultValue: true,
              },
              {
                type: "checkbox",
                name: "newsletter",
                label: "Subscribe to Newsletter",
                defaultValue: false,
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Complete User Profile"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   8. Advanced Form with Mixed Field Types
-------------------------------- */
export const AdvancedFormWithMixedFields: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "product",
        label: "Product",
        sections: [
          {
            title: "Product Details",
            columns: 2,
            collapsible: true,
            fields: [
              {
                type: "input",
                name: "productName",
                label: "Product Name",
                required: true,
              },
              {
                type: "select",
                name: "category",
                label: "Category",
                options: ["Electronics", "Clothing", "Home", "Books"],
                addable: true,
              },
              {
                type: "number",
                name: "price",
                label: "Price",
                min: 0,
                step: 0.01,
              },
              {
                type: "number",
                name: "quantity",
                label: "Quantity",
                min: 0,
              },
            ],
            collapsibleGroups: [
              {
                title: "Advanced Product Settings",
                fields: [
                  {
                    type: "checkbox",
                    name: "isFeatured",
                    label: "Featured Product",
                  },
                  {
                    type: "checkbox",
                    name: "inStock",
                    label: "In Stock",
                    defaultValue: true,
                  },
                ],
              },
            ],
          },
          {
            title: "Product Description",
            columns: 1,
            fields: [
              {
                type: "textEditor",
                name: "description",
                label: "Product Description",
                showSubmitButton: true,
                submitButtonText: "Save Description",
              },
            ],
          },
        ],
      },
      {
        id: "media",
        label: "Media",
        sections: [
          {
            title: "Product Images",
            columns: 1,
            fields: [
              {
                type: "fileUpload",
                name: "productImages",
                label: "Upload Product Images",
                accept: "image/*",
                multiple: true,
                maxFiles: 10,
                maxSize: 10 * 1024 * 1024, // 10MB
              },
            ],
          },
          {
            title: "Product Videos",
            columns: 1,
            fields: [
              {
                type: "fileUpload",
                name: "productVideos",
                label: "Upload Product Videos",
                accept: "video/*",
                multiple: true,
                maxFiles: 3,
                maxSize: 50 * 1024 * 1024, // 50MB
              },
            ],
          },
        ],
      },
      {
        id: "contact",
        label: "Contact",
        sections: [
          {
            title: "Contact Information",
            columns: 2,
            fields: [
              {
                type: "phone",
                name: "supportPhone",
                label: "Support Phone",
                required: true,
              },
              {
                type: "input",
                name: "supportEmail",
                label: "Support Email",
              },
              {
                type: "date",
                name: "releaseDate",
                label: "Product Release Date",
                description: "When will this product be available?",
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Product Management"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};
